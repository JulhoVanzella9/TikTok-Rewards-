import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

// MundPay postback secret - set this in your environment variables
const MUNDPAY_SECRET = process.env.MUNDPAY_WEBHOOK_SECRET || "";

function getLoginUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/login`
    : "https://tikcash.money/login";
}

function buildAccessEmail(email: string) {
  const loginUrl = getLoginUrl();
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#0a0a1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:480px;margin:40px auto;background:#1a1a2e;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.08);">
    <div style="background:linear-gradient(135deg,#fe2c55 0%,#25f4ee 100%);padding:40px 32px;text-align:center;">
      <h1 style="color:#fff;font-size:28px;margin:0 0 8px;">TikCash</h1>
      <p style="color:rgba(255,255,255,0.9);font-size:14px;margin:0;">Your access is ready!</p>
    </div>
    <div style="padding:32px;">
      <p style="color:rgba(255,255,255,0.85);font-size:15px;line-height:1.6;margin:0 0 16px;">
        Hi! Your payment has been confirmed successfully.
      </p>
      <p style="color:rgba(255,255,255,0.85);font-size:15px;line-height:1.6;margin:0 0 24px;">
        Click the button below to access your account. Use the email <strong style="color:#25f4ee;">${email}</strong> to log in.
      </p>
      <div style="text-align:center;margin:32px 0;">
        <a href="${loginUrl}" style="display:inline-block;background:linear-gradient(135deg,#fe2c55 0%,#d4234a 100%);color:#fff;text-decoration:none;padding:16px 48px;border-radius:12px;font-size:16px;font-weight:700;box-shadow:0 4px 16px rgba(254,44,85,0.3);">
          Click here to access
        </a>
      </div>
      <p style="color:rgba(255,255,255,0.4);font-size:12px;text-align:center;margin:24px 0 0;line-height:1.5;">
        If the button doesn't work, copy and paste this link in your browser:<br>
        <a href="${loginUrl}" style="color:#25f4ee;">${loginUrl}</a>
      </p>
    </div>
    <div style="background:rgba(0,0,0,0.3);padding:20px 32px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
      <p style="color:rgba(255,255,255,0.3);font-size:11px;margin:0;">TikCash &copy; 2026 — All rights reserved</p>
    </div>
  </div>
</body>
</html>`;
}

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

    // Send access email to customer
    try {
      const r = new Resend(process.env.RESEND_API_KEY);
      const { data: emailData, error: emailError } = await r.emails.send({
        from: "TikCash <noreply@tikcash.money>",
        to: email,
        subject: "Your access is ready! — TikCash",
        html: buildAccessEmail(email),
      });
      if (emailError) {
        console.error("[MundPay Postback] Resend error:", JSON.stringify(emailError));
      } else {
        console.log("[MundPay Postback] Access email sent to:", email, "id:", emailData?.id);
      }
    } catch (emailErr) {
      console.error("[MundPay Postback] Failed to send email:", emailErr);
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
