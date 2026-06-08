import { NextResponse } from 'next/server';
import { createClient } from "@/lib/supabase/server";
import { sendSMS } from "@/lib/sms-service";
import { logNotification, getNotificationStatus } from "@/lib/notification-logger";

// Configuration
const SUPPORT_EMAIL = "accesssupport.ai@gmail.com";
const SUPPORT_PHONE = "+55 46 99919-2885";
const SUPPORT_WHATSAPP = "5546999192885"; // WhatsApp number without + or spaces

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

    const { email, purchaseCode, reason, amount, userId } = await request.json();

    if (!email || !purchaseCode || !reason) {
      return NextResponse.json({ error: 'Email, purchase code and reason are required' }, { status: 400 });
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

    // Insert new refund request into database
    const { data: newRequest, error: insertError } = await supabase
      .from('refund_requests')
      .insert({
        user_id: user.id,
        email: email.toLowerCase().trim(),
        purchase_code: purchaseCode,
        reason,
        status: 'pending'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Failed to insert refund request:', insertError);
      return NextResponse.json({ error: 'Failed to submit refund request' }, { status: 500 });
    }
    
    // Build email content
    const emailContent = `
New Refund Request

From: ${email}
Purchase/Transfer Code: ${purchaseCode}
Purchase Amount: ${amount ? `US$ ${amount}` : 'N/A'}

Reason:
${reason}

Request ID: ${newRequest.id}
Submitted: ${new Date().toISOString()}

---
TikCash Support System
Support Email: ${SUPPORT_EMAIL}
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #FE2C55; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Refund Request</h1>
        </div>
        <div class="content">
            <div class="field">
                <span class="label">From:</span><br/>
                ${email}
            </div>
            <div class="field">
                <span class="label">Purchase/Transfer Code:</span><br/>
                ${purchaseCode}
            </div>
            <div class="field">
                <span class="label">Purchase Amount:</span><br/>
                ${amount ? `US$ ${amount}` : 'N/A'}
            </div>
            <div class="field">
                <span class="label">Reason:</span><br/>
                <pre style="background: white; padding: 10px; border-radius: 5px; border-left: 3px solid #FE2C55;">${reason}</pre>
            </div>
            <div class="field">
                <span class="label">Request ID:</span><br/>
                ${newRequest.id}
            </div>
            <div class="field">
                <span class="label">Submitted:</span><br/>
                ${new Date().toISOString()}
            </div>
            <div class="footer">
                <p><strong>TikCash Support System</strong></p>
                <p>Support Email: ${SUPPORT_EMAIL}</p>
            </div>
        </div>
    </div>
</body>
</html>
    `.trim();
    
    // Send email using Resend API with notification logging
    let emailSent = false;
    if (process.env.RESEND_API_KEY) {
      try {
        // Validate email format for reply_to
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);
        
        // Log pending email notification
        await logNotification({
          refundRequestId: newRequest.id,
          userId: user?.id,
          type: 'email',
          recipient: SUPPORT_EMAIL,
          status: 'pending',
        });
        
        // Build email payload using verified domain tikcash.money
        const emailPayload: Record<string, unknown> = {
          from: 'TikCash Support <support@tikcash.money>',
          to: SUPPORT_EMAIL,
          subject: `Refund Request from ${email} - Code: ${purchaseCode}`,
          text: emailContent,
          html: htmlContent,
        };
        
        // Set reply_to to user's email if valid, so you can reply directly to them
        if (isValidEmail) {
          emailPayload.reply_to = email;
        }
        
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailPayload),
        });
        
        const emailData = await emailResponse.json() as Record<string, unknown>;
        
        if (!emailResponse.ok) {
          console.error('[v0] Email send failed:', emailData);
          await logNotification({
            refundRequestId: newRequest.id,
            userId: user?.id,
            type: 'email',
            recipient: SUPPORT_EMAIL,
            status: 'failed',
            errorMessage: emailData.message as string || 'Email service error',
          });
        } else {
          emailSent = true;
          console.log('[v0] Email sent successfully. ID:', emailData.id);
          await logNotification({
            refundRequestId: newRequest.id,
            userId: user?.id,
            type: 'email',
            recipient: SUPPORT_EMAIL,
            status: 'sent',
            externalId: emailData.id as string,
          });
        }
      } catch (emailError) {
        console.error('[v0] Email service error:', emailError);
        await logNotification({
          refundRequestId: newRequest.id,
          userId: user?.id,
          type: 'email',
          recipient: SUPPORT_EMAIL,
          status: 'failed',
          errorMessage: emailError instanceof Error ? emailError.message : 'Unknown error',
        });
      }
    }
    
    // Send SMS if email was sent successfully
    if (emailSent) {
      try {
        const smsMessage = `TikCash Refund Request\n\nYou received a refund request for code: ${purchaseCode}\n\nFrom: ${email}\n\nRequest ID: ${newRequest.id}\n\nVisit your dashboard for details.`;
        
        // Log pending SMS notification
        await logNotification({
          refundRequestId: newRequest.id,
          userId: user?.id,
          type: 'sms',
          recipient: SUPPORT_PHONE,
          status: 'pending',
        });
        
        const smsResult = await sendSMS(SUPPORT_PHONE, smsMessage);
        
        if (smsResult.success) {
          console.log('[v0] SMS sent successfully. ID:', smsResult.messageId);
          await logNotification({
            refundRequestId: newRequest.id,
            userId: user?.id,
            type: 'sms',
            recipient: SUPPORT_PHONE,
            status: 'sent',
            externalId: smsResult.messageId,
          });
        } else {
          console.error('[v0] SMS send failed:', smsResult.error);
          await logNotification({
            refundRequestId: newRequest.id,
            userId: user?.id,
            type: 'sms',
            recipient: SUPPORT_PHONE,
            status: 'failed',
            errorMessage: smsResult.error,
          });
        }
      } catch (smsError) {
        console.error('[v0] SMS service error:', smsError);
        await logNotification({
          refundRequestId: newRequest.id,
          userId: user?.id,
          type: 'sms',
          recipient: SUPPORT_PHONE,
          status: 'failed',
          errorMessage: smsError instanceof Error ? smsError.message : 'Unknown error',
        });
      }
    }
    
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
          const displayAmount = amount ? `US$ ${amount}` : 'the purchase amount';

          const customerText = `
Hi,

We've received your refund request. Here are your details:

Email: ${email}
Request Date: ${requestDate}
Purchase Amount: ${amount ? `US$ ${amount}` : 'N/A'}

${displayAmount} will be refunded within 14 days.

Please note: your access will be removed within 14 days.

TikCash Support
          `.trim();

          const customerHtml = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #FE2C55; color: white; padding: 24px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background-color: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 12px; }
        .label { font-weight: bold; color: #555; }
        .highlight { background-color: #fff; border-left: 4px solid #FE2C55; padding: 14px; border-radius: 6px; margin: 18px 0; }
        .footer { margin-top: 20px; padding-top: 16px; border-top: 1px solid #ddd; font-size: 12px; color: #999; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Refund Request Received</h1>
        </div>
        <div class="content">
            <p>Hi, we've received your refund request. Here are your details:</p>
            <div class="field"><span class="label">Email:</span> ${email}</div>
            <div class="field"><span class="label">Request Date:</span> ${requestDate}</div>
            <div class="field"><span class="label">Purchase Amount:</span> ${amount ? `US$ ${amount}` : 'N/A'}</div>
            <div class="highlight">
                <p style="margin:0 0 8px;"><strong>${displayAmount} will be refunded within 14 days.</strong></p>
                <p style="margin:0;">Please note: your access will be removed within 14 days.</p>
            </div>
            <div class="footer">
                <p><strong>TikCash Support</strong></p>
            </div>
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
              subject: 'Refund Request Received - TikCash',
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
