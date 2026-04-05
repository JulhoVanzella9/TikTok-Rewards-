import { NextResponse } from 'next/server';
import { createClient } from "@/lib/supabase/server";

// Configuration - Replace with actual email and phone when ready
const SUPPORT_EMAIL = "email@placeholder.com"; // Replace with actual email
const SUPPORT_PHONE = "+1 (000) 000-0000"; // Replace with actual phone

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
    
    // Send email using a simple fetch to an email service
    // For now, we'll use a webhook or log it
    // You can integrate with Resend, SendGrid, or any email service later
    
    const emailContent = `
New Refund Request

From: ${email}
Purchase/Transfer Code: ${purchaseCode}

Reason:
${reason}

---
TikCash Support System
Support Email: ${SUPPORT_EMAIL}
Support Phone: ${SUPPORT_PHONE}
    `.trim();
    
    // Log the request (in production, send actual email)
    console.log('=== REFUND REQUEST ===');
    console.log('To:', SUPPORT_EMAIL);
    console.log('From:', email);
    console.log('Purchase Code:', purchaseCode);
    console.log('Reason:', reason);
    console.log('======================');
    
    // Try to send via email service if configured
    if (process.env.RESEND_API_KEY) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'TikCash <noreply@tikcash.com>',
            to: [SUPPORT_EMAIL],
            subject: `Refund Request from ${email} - Code: ${purchaseCode}`,
            text: emailContent,
            reply_to: email,
          }),
        });
        
        if (!response.ok) {
          console.error('Email send failed:', await response.text());
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
