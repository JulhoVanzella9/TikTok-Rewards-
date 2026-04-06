import { NextResponse } from 'next/server';
import { createClient } from "@/lib/supabase/server";
import { sendSMS } from "@/lib/sms-service";
import { logNotification, getNotificationStatus } from "@/lib/notification-logger";

// Configuration
const SUPPORT_EMAIL = "accesssupport.ai@gmail.com";
const SUPPORT_PHONE = "+55 46 9919-2885";
const SUPPORT_WHATSAPP = "5546991922885"; // WhatsApp number without + or spaces

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
    
    return NextResponse.json({ 
      success: true, 
      message: 'Refund request submitted',
      requestId: newRequest.id,
      supportEmail: SUPPORT_EMAIL,
      supportPhone: SUPPORT_PHONE,
      supportWhatsApp: SUPPORT_WHATSAPP,
    });
  } catch (error) {
    console.error('Refund API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
