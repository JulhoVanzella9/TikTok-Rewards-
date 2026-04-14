import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// MundPay postback secret - set this in your environment variables
const MUNDPAY_SECRET = process.env.MUNDPAY_WEBHOOK_SECRET || "";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the postback authenticity
    const token = body.token || body.secret || request.headers.get("x-mundpay-token");

    if (MUNDPAY_SECRET && token !== MUNDPAY_SECRET) {
      console.error("[MundPay Postback] Invalid token");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract payment info from postback
    const email = (body.customer_email || body.email || body.buyer_email || "").toLowerCase().trim();
    const status = body.status || body.payment_status || body.transaction_status || "";
    const transactionId = body.transaction_id || body.id || body.order_id || "";
    const amount = body.amount || body.value || body.price || 0;

    console.log("[MundPay Postback] Received:", { email, status, transactionId, amount });

    if (!email) {
      console.error("[MundPay Postback] No email in payload");
      return NextResponse.json({ error: "Missing customer email" }, { status: 400 });
    }

    // Check if payment was approved
    const approvedStatuses = ["approved", "paid", "completed", "confirmed", "aprovado"];
    const isApproved = approvedStatuses.includes(status.toLowerCase());

    if (!isApproved) {
      console.log("[MundPay Postback] Payment not approved, status:", status);
      const supabase = createClient();
      await supabase.from("payments").insert({
        email,
        transaction_id: transactionId,
        status: status.toLowerCase(),
        amount,
        provider: "mundpay",
        raw_payload: body,
      });
      return NextResponse.json({ received: true, activated: false });
    }

    // Payment approved - activate user
    const supabase = createClient();

    // Log the payment
    await supabase.from("payments").insert({
      email,
      transaction_id: transactionId,
      status: "approved",
      amount,
      provider: "mundpay",
      raw_payload: body,
    });

    // Find user by email in profiles and activate
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (profile) {
      await supabase
        .from("profiles")
        .update({ has_paid: true, paid_at: new Date().toISOString() })
        .eq("id", profile.id);

      console.log("[MundPay Postback] User activated:", email);
    } else {
      console.log("[MundPay Postback] No profile found for email, payment stored for future activation:", email);
    }

    return NextResponse.json({ received: true, activated: !!profile });
  } catch (error) {
    console.error("[MundPay Postback] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", provider: "mundpay" });
}
