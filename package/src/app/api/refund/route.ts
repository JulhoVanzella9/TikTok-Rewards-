import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, reason } = await request.json();
    
    if (!email || !reason) {
      return NextResponse.json({ error: 'Email and reason are required' }, { status: 400 });
    }
    
    // Send email using a simple fetch to an email service
    // For now, we'll use a webhook or log it
    // You can integrate with Resend, SendGrid, or any email service later
    
    const emailContent = `
New Refund Request

From: ${email}

Reason:
${reason}

---
TikTok Rewards Support System
    `.trim();
    
    // Log the request (in production, send actual email)
    console.log('=== REFUND REQUEST ===');
    console.log('To: julhoeduardo7@gmail.com');
    console.log('From:', email);
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
            from: 'TikTok Rewards <noreply@tiktokrewards.com>',
            to: ['julhoeduardo7@gmail.com'],
            subject: `Refund Request from ${email}`,
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
    
    return NextResponse.json({ success: true, message: 'Refund request submitted' });
  } catch (error) {
    console.error('Refund API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
