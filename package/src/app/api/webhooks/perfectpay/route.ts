import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

// Perfect Pay webhook secret - set this in your environment variables
const PERFECTPAY_SECRET = process.env.PERFECTPAY_WEBHOOK_SECRET || "";

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
<body style="margin:0;padding:0;background:#f0f0f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#fe2c55 0%,#25f4ee 100%);padding:40px 32px;text-align:center;border-radius:24px 24px 0 0;">
              <div style="font-size:32px;font-weight:900;color:#fff;letter-spacing:-1px;">TikCash</div>
              <div style="font-size:14px;color:rgba(255,255,255,0.9);margin-top:6px;">Your access is ready! 🎉</div>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background:#ffffff;padding:36px 32px;">
              <p style="color:#333333;font-size:15px;line-height:1.7;margin:0 0 12px;">
                Hi! Your payment has been confirmed successfully.
              </p>
              <p style="color:#333333;font-size:15px;line-height:1.7;margin:0 0 32px;">
                Use the email <strong style="color:#fe2c55;">${email}</strong> to log in.
              </p>

              <!-- BUTTON -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:8px 0 32px;">
                    <a href="${loginUrl}" style="display:inline-block;background:linear-gradient(135deg,#fe2c55 0%,#ff6b9d 50%,#25f4ee 100%);color:#ffffff;text-decoration:none;padding:18px 52px;border-radius:50px;font-size:16px;font-weight:800;letter-spacing:0.5px;">
                      Click here to access
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color:#aaaaaa;font-size:12px;text-align:center;margin:0;line-height:1.6;">
                If the button doesn't work:<br>
                <a href="${loginUrl}" style="color:#fe2c55;word-break:break-all;">${loginUrl}</a>
              </p>

              <!-- REFUND -->
              <p style="color:#aaaaaa;font-size:12px;text-align:center;margin:28px 0 0;line-height:1.7;border-top:1px solid #eeeeee;padding-top:24px;">
                *If you are not satisfied with the product you purchased, you can at any time request a refund for your purchase using the link below.
                <a href="https://tikcash.money/refund" style="color:#fe2c55;font-weight:700;"> If you need a refund, click here! »</a>
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f9f9f9;padding:20px 32px;text-align:center;border-top:1px solid #eeeeee;border-radius:0 0 24px 24px;">
              <p style="color:#aaaaaa;font-size:11px;margin:0;">TikCash &copy; 2026 — All rights reserved</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const text = await request.text();
    let body: Record<string, unknown> = {};
    try {
      body = JSON.parse(text);
    } catch {
      const params = new URLSearchParams(text);
      params.forEach((value, key) => { body[key] = value; });
    }

    // Validate the webhook authenticity - Perfect Pay sends token in body
    const token = body.token || body.secret || "";

    if (PERFECTPAY_SECRET && token !== PERFECTPAY_SECRET) {
      console.error("[PerfectPay Webhook] Invalid token");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract customer info - Perfect Pay nests email inside customer object
    const customer = (body.customer || {}) as Record<string, string>;
    const email = (customer.email || (body.client_email as string) || (body.email as string) || "").toLowerCase().trim();
    
    // Perfect Pay uses sale_status_enum (number) and sale_status_detail (string)
    // 2 = approved, 10 = completed
    const saleStatusEnum = body.sale_status_enum as number;
    const saleStatusDetail = (body.sale_status_detail || "") as string;
    const transactionId = (body.code || body.transaction_id || body.order_id || "") as string;
    const amount = body.sale_amount || body.amount || body.value || 0;

    console.log("[PerfectPay Webhook] Full body:", JSON.stringify(body));
    console.log("[PerfectPay Webhook] Received:", { email, saleStatusEnum, saleStatusDetail, transactionId, amount });

    if (!email) {
      console.error("[PerfectPay Webhook] No email in payload");
      return NextResponse.json({ error: "Missing customer email" }, { status: 400 });
    }

    // Check if payment was approved
    // Perfect Pay: 2 = approved, 10 = completed
    const approvedStatusEnums = [2, 10]; // approved, completed
    const approvedStatusDetails = ["approved", "completed", "confirmed", "aprovado"];
    
    const isApproved = approvedStatusEnums.includes(saleStatusEnum) || 
                       approvedStatusDetails.includes(saleStatusDetail.toLowerCase());

    if (!isApproved) {
      console.log("[PerfectPay Webhook] Payment not approved, status:", saleStatusEnum, saleStatusDetail);
      const supabase = createClient();
      await supabase.from("payments").insert({
        email,
        transaction_id: transactionId,
        status: saleStatusDetail.toLowerCase() || String(saleStatusEnum),
        amount,
        provider: "perfectpay",
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
      provider: "perfectpay",
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

      console.log("[PerfectPay Webhook] User activated:", email);
    } else {
      console.log("[PerfectPay Webhook] No profile found for email, payment stored for future activation:", email);
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
        console.error("[PerfectPay Webhook] Resend error:", JSON.stringify(emailError));
      } else {
        console.log("[PerfectPay Webhook] Access email sent to:", email, "id:", emailData?.id);
      }
    } catch (emailErr) {
      console.error("[PerfectPay Webhook] Failed to send email:", emailErr);
    }

    return NextResponse.json({ received: true, activated: !!profile });
  } catch (error) {
    console.error("[PerfectPay Webhook] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Perfect Pay may also send GET requests to verify the endpoint
export async function GET() {
  return NextResponse.json({ status: "ok", provider: "perfectpay" });
}
