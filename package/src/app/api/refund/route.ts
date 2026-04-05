import { NextResponse } from 'next/server';
import { createClient } from "@/lib/supabase/server";

// Configuration
const SUPPORT_EMAIL = "accesssupport.ai@gmail.com";
const SUPPORT_PHONE = "+55 46 9919-2885";

// GET - Check existing refund requests for current user
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ requests: [] });
    }

    const { data: requests, error } = await supabase
      .from('refund_requests')
      .select('id, purchase_code, status, created_at, updated_at')
      .eq('user_id', user.id)
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
    const { data: { user } } = await supabase.auth.getUser();
    
    const { email, purchaseCode, reason } = await request.json();
    
    if (!email || !purchaseCode || !reason) {
      return NextResponse.json({ error: 'Email, purchase code and reason are required' }, { status: 400 });
    }

    // Check for existing pending/processing refund request for this purchase code
    const { data: existingRequest } = await supabase
      .from('refund_requests')
      .select('id, status, created_at')
      .eq('purchase_code', purchaseCode)
      .in('status', ['pending', 'processing'])
      .maybeSingle();

    if (existingRequest) {
      return NextResponse.json({ 
        error: 'duplicate_request',
        message: 'Refund already in progress for this purchase code',
        existingRequest: {
          status: existingRequest.status,
          createdAt: existingRequest.created_at
        }
      }, { status: 409 });
    }

    // Insert new refund request into database
    const { data: newRequest, error: insertError } = await supabase
      .from('refund_requests')
      .insert({
        user_id: user?.id || null,
        email,
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
    
    // Send email using Resend API
    const emailContent = `
New Refund Request

From: ${email}
Purchase/Transfer Code: ${purchaseCode}

Reason:
${reason}

Request ID: ${newRequest.id}
Submitted: ${new Date().toISOString()}

---
TikCash Support System
Support Email: ${SUPPORT_EMAIL}
Support Phone: ${SUPPORT_PHONE}
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
                <p>Support Phone: ${SUPPORT_PHONE}</p>
            </div>
        </div>
    </div>
</body>
</html>
    `.trim();
    
    // Send email using Resend API
    if (process.env.RESEND_API_KEY) {
      try {
        // Validate email format for reply_to
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);
        
        // Build email payload - only include reply_to if email is valid
        const emailPayload: Record<string, unknown> = {
          from: 'TikCash Support <onboarding@resend.dev>',
          to: SUPPORT_EMAIL,
          subject: `Refund Request from ${email} - Code: ${purchaseCode}`,
          text: emailContent,
          html: htmlContent,
        };
        
        if (isValidEmail) {
          emailPayload.reply_to = email;
        }
        
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailPayload),
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Email send failed:', errorText);
        }
      } catch (emailError) {
        console.error('Email service error:', emailError);
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Refund request submitted',
      requestId: newRequest.id,
      supportEmail: SUPPORT_EMAIL,
      supportPhone: SUPPORT_PHONE,
    });
  } catch (error) {
    console.error('Refund API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
