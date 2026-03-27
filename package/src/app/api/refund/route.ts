import { NextResponse } from 'next/server';

// Configuration - Replace with actual email and phone when ready
const SUPPORT_EMAIL = "email@placeholder.com"; // Replace with actual email
const SUPPORT_PHONE = "+1 (000) 000-0000"; // Replace with actual phone

export async function POST(request: Request) {
  try {
    const { email, purchaseCode, reason } = await request.json();
    
    if (!email || !purchaseCode || !reason) {
      return NextResponse.json({ error: 'Email, purchase code and reason are required' }, { status: 400 });
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
      supportEmail: SUPPORT_EMAIL,
      supportPhone: SUPPORT_PHONE,
    });
  } catch (error) {
    console.error('Refund API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
