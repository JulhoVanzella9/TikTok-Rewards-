import { NextResponse } from 'next/server';
import { createClient } from "@/lib/supabase/server";
import { ADMIN_SECRET } from "@/lib/admin-secret";

// Configuration
const SUPPORT_EMAIL = "accesssupport.ai@gmail.com";
const SUPPORT_PHONE = "+55 46 99919-2885";
const SUPPORT_WHATSAPP = "5546999192885"; // WhatsApp number without + or spaces

// Escape user-controlled values before interpolating them into email HTML
function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// GET - Check existing refund requests for current user
export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ requests: [] });
    }

    const { data: requests, error } = await supabase
      .from('refund_requests')
      .select('id, purchase_code, status, created_at, updated_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch refund requests:', error);
      return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
    }

    return NextResponse.json({ requests: requests || [] });
  } catch (error) {
    console.error('Refund GET API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const { email, fullName, purchaseCode, reason, amount, paymentMethod, userId, surveyReasons, adminKey } = await request.json();

    // Test/admin bypass: when the secret panel key is provided, skip the
    // 14-day duplicate limit so test refund emails can be re-sent freely.
    const isAdminBypass = adminKey === ADMIN_SECRET;

    const surveyList: string[] = Array.isArray(surveyReasons)
      ? surveyReasons.map((r: unknown) => String(r)).filter((r) => r.trim() !== '')
      : [];

    if (!email || !purchaseCode || !amount || !reason) {
      return NextResponse.json({ error: 'Email, purchase code, purchase amount and reason are required' }, { status: 400 });
    }

    const normalizedAmount = String(amount).trim().replace(",", ".");
    if (!/^\d+(\.\d{1,2})?$/.test(normalizedAmount) || Number(normalizedAmount) <= 0) {
      return NextResponse.json({ error: 'Purchase amount must be a valid number' }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({
        error: 'authentication_required',
        message: 'You must be logged in to submit a refund request.'
      }, { status: 401 });
    }

    // Verify user exists in profiles
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (!profile) {
      return NextResponse.json({
        error: 'authentication_required',
        message: 'Invalid user account.'
      }, { status: 401 });
    }

    const user = { id: userId };

    // STRICT: 1 refund per account every 14 days (by user_id AND email)
    if (!isAdminBypass) {
      const fourteenDaysAgo = new Date();
      fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

      // Check by user_id
      const { data: existingByUser } = await supabase
        .from('refund_requests')
        .select('id, status, created_at')
        .eq('user_id', user.id)
        .gte('created_at', fourteenDaysAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      // Also check by email (prevents using same email from different accounts)
      const { data: existingByEmail } = await supabase
        .from('refund_requests')
        .select('id, status, created_at')
        .eq('email', email.toLowerCase().trim())
        .gte('created_at', fourteenDaysAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      const existingRequest = existingByUser || existingByEmail;

      if (existingRequest) {
        const requestDate = new Date(existingRequest.created_at);
        const nextAllowedDate = new Date(requestDate);
        nextAllowedDate.setDate(nextAllowedDate.getDate() + 14);

        const daysRemaining = Math.ceil((nextAllowedDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

        return NextResponse.json({
          error: 'duplicate_request',
          message: `You already have a refund request. You can submit a new one in ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}.`,
          existingRequest: {
            status: existingRequest.status,
            createdAt: existingRequest.created_at,
            nextAllowedDate: nextAllowedDate.toISOString(),
            daysRemaining
          }
        }, { status: 409 });
      }
    }

    // Persist survey answers together with the reason so the record is complete
    const reasonForDb = surveyList.length
      ? `${reason}\n\n[Survey answers] ${surveyList.join('; ')}`
      : reason;

    // Insert new refund request into database
    const { data: newRequest, error: insertError } = await supabase
      .from('refund_requests')
      .insert({
        user_id: user.id,
        email: email.toLowerCase().trim(),
        purchase_code: purchaseCode,
        reason: reasonForDb,
        status: 'pending'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Failed to insert refund request:', insertError);
      return NextResponse.json({ error: 'Failed to submit refund request' }, { status: 500 });
    }
    
    // Note: refund requests are no longer emailed/texted to support — they are
    // only visible on the dedicated /refunds/<secret> admin page, which reads
    // directly from the refund_requests table inserted above.

    // Send confirmation email to the customer who requested the refund
    let customerEmailSent = false;
    let customerEmailError: string | null = null;
    if (process.env.RESEND_API_KEY) {
      try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
          const requestDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
          });
          const firstName = (fullName && String(fullName).trim().split(/\s+/)[0]) || 'there';
          const refundAmount = `$${normalizedAmount}`;
          const payMethod = paymentMethod || 'Credit Card';

          const customerText = `
Hi ${firstName},

Your refund request has been received and is now under review by the TikCash support team.

Summary
--------------------------------
Request ID: ${newRequest.id}
Refund Amount: ${refundAmount}
Payment Method: ${payMethod}
Request Submitted On: ${requestDate}
Status: Under Review
Email on File: ${email}
--------------------------------

What happens next?
Our support team will review your request within 14 days. If your request is approved, the refund will be submitted to the payment processor using the original payment method.

Please do not initiate a chargeback while this review is active. If you need help, contact us at ${SUPPORT_EMAIL} with your Request ID.

Warm regards,
The TikCash Support Team
          `.trim();

          const customerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Your Refund Request Was Received - TikCash</title>
  <style>
    body { margin: 0; padding: 0; background: #f0f0f0; font-family: Arial, sans-serif; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.09); }
    .header { background: #FF0050; padding: 36px 40px; text-align: center; }
    .header h1 { color: #ffffff; font-size: 22px; margin: 12px 0 0; letter-spacing: 0.3px; }
    .header p { color: #ffd6e3; font-size: 14px; margin: 6px 0 0; }
    .body { padding: 36px 40px; color: #333333; }
    .body p { font-size: 15px; line-height: 1.75; margin: 0 0 16px; }
    table { width: 100%; border-collapse: collapse; margin: 24px 0; border-radius: 6px; overflow: hidden; border: 1px solid #E8E8E8; }
    table td { padding: 13px 16px; font-size: 14px; border-bottom: 1px solid #F0F0F0; }
    table td:first-child { color: #888888; width: 42%; }
    table td:last-child { font-weight: 600; color: #222222; }
    table tr:last-child td { border-bottom: none; }
    .badge { display: inline-block; background: #FFE6EF; color: #FF0050; font-weight: 700; font-size: 12px; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; }
    .info-box { background: #F8F8F8; border: 1px solid #EBEBEB; border-radius: 6px; padding: 22px 26px; margin: 28px 0; }
    .info-box p { margin: 0 0 12px; font-size: 14px; color: #555555; line-height: 1.7; }
    .info-box p:last-child { margin: 0; }
    .info-box strong { color: #222222; }
    .highlight { background: #FFF0F5; border-left: 4px solid #FF0050; border-radius: 4px; padding: 16px 20px; margin: 24px 0; font-size: 14px; color: #444; line-height: 1.7; }
    .highlight a { color: #FF0050; text-decoration: none; font-weight: 600; }
    .footer { background: #F9F9F9; padding: 24px 40px; text-align: center; border-top: 1px solid #EEEEEE; }
    .footer p { font-size: 12px; color: #AAAAAA; margin: 4px 0; }
    .footer a { color: #FF0050; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Your Refund Request Was Received</h1>
      <p>Request #${newRequest.id} &middot; TikCash Support Team</p>
    </div>
    <div class="body">
      <p>Hi <strong>${escapeHtml(firstName)}</strong>,</p>
      <p>Your refund request has been <strong>received and is under review</strong>. Here's a summary of your request:</p>
      <table>
        <tr><td>Request ID</td><td>${newRequest.id}</td></tr>
        <tr><td>Refund Amount</td><td>${escapeHtml(refundAmount)}</td></tr>
        <tr><td>Payment Method</td><td>${escapeHtml(payMethod)}</td></tr>
        <tr><td>Request Submitted On</td><td>${requestDate}</td></tr>
        <tr><td>Status</td><td><span class="badge">Under Review</span></td></tr>
        <tr><td>Email on File</td><td>${escapeHtml(email)}</td></tr>
      </table>
      <div class="info-box">
        <p><strong>What happens next?</strong></p>
        <p>Our support team will review your request within <strong>14 days</strong>. If your request is approved, the refund will be submitted to the payment processor using the original payment method.</p>
        <p>Please do not initiate a chargeback while this review is active. If you need help, reach us at <a href="mailto:${SUPPORT_EMAIL}" style="color:#FF0050;font-weight:600;">${SUPPORT_EMAIL}</a> with your Request ID.</p>
      </div>
      <div class="highlight">
        Still have questions? Our support team is available 7 days a week. Reach us at <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a> and we'll get back to you within 24 hours.
      </div>
      <p>We truly appreciate your patience and your trust in TikCash. We're sorry for any inconvenience this may have caused and hope to serve you again soon.</p>
      <p>Warm regards,<br/><strong>The TikCash Support Team</strong></p>
    </div>
    <div class="footer">
      <p>TikCash Inc. &middot; ${SUPPORT_EMAIL}</p>
      <p>This is an automated message. Please do not reply directly to this email.</p>
      <p style="margin-top:10px;"><a href="#">Unsubscribe</a> &nbsp;|&nbsp; <a href="#">Privacy Policy</a> &nbsp;|&nbsp; <a href="#">Terms of Service</a></p>
    </div>
  </div>
</body>
</html>
          `.trim();

          const customerResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'TikCash Support <support@tikcash.money>',
              to: email,
              subject: 'Your Refund Request Was Received - TikCash',
              text: customerText,
              html: customerHtml,
            }),
          });

          const customerData = await customerResponse.json().catch(() => ({})) as Record<string, unknown>;
          if (!customerResponse.ok) {
            customerEmailError = (customerData.message as string) || 'Email service error';
            console.error('[v0] Customer confirmation email failed:', customerData);
          } else {
            customerEmailSent = true;
            console.log('[v0] Customer confirmation email sent to:', email, 'ID:', customerData.id);
          }
        } else {
          customerEmailError = 'Invalid recipient email format';
        }
      } catch (err) {
        customerEmailError = err instanceof Error ? err.message : 'Unknown error';
        console.error('[v0] Customer confirmation email error:', err);
      }
    } else {
      customerEmailError = 'RESEND_API_KEY not configured';
    }

    return NextResponse.json({
      success: true,
      message: 'Refund request submitted',
      requestId: newRequest.id,
      supportEmail: SUPPORT_EMAIL,
      supportPhone: SUPPORT_PHONE,
      supportWhatsApp: SUPPORT_WHATSAPP,
      customerEmailSent,
      customerEmailError,
    });
  } catch (error) {
    console.error('Refund API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
