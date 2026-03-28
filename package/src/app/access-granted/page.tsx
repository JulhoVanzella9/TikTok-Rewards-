"use client";
import { useRef } from "react";
import { jsPDF } from "jspdf";

export default function AccessGrantedPage() {
  const a4Ref = useRef<HTMLDivElement>(null);
  const password = "myacess2026";
  const accessUrl = "https://tik-cash.vercel.app";
  const supportEmail = "accesssupport.ai@gmail.com";

  const downloadPDF = async () => {
    try {
      // Create PDF in A4 format (210 x 297 mm)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);

      // Background
      pdf.setFillColor(10, 10, 10);
      pdf.rect(0, 0, pageWidth, pageHeight, "F");

      // Decorative circles
      pdf.setFillColor(254, 44, 85);
      pdf.setGState(pdf.GState({ opacity: 0.1 }));
      pdf.circle(pageWidth + 20, -20, 80, "F");
      pdf.setFillColor(37, 244, 238);
      pdf.circle(-20, pageHeight + 20, 80, "F");
      pdf.setGState(pdf.GState({ opacity: 1 }));

      // CONGRATULATIONS Banner (Green like the reference)
      const bannerY = 25;
      const bannerHeight = 22;
      
      // Green gradient background
      pdf.setFillColor(34, 197, 94); // Green
      pdf.roundedRect(margin, bannerY, contentWidth, bannerHeight, 6, 6, "F");
      
      // Banner text
      pdf.setFontSize(24);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(255, 255, 255);
      pdf.text("CONGRATULATIONS!", pageWidth / 2, bannerY + 14, { align: "center" });

      // Main Card Background
      const cardY = bannerY + bannerHeight + 15;
      const cardHeight = 175;
      
      pdf.setFillColor(30, 35, 42);
      pdf.roundedRect(margin, cardY, contentWidth, cardHeight, 8, 8, "F");
      
      // Card border
      pdf.setDrawColor(55, 65, 81);
      pdf.setLineWidth(0.5);
      pdf.roundedRect(margin, cardY, contentWidth, cardHeight, 8, 8, "S");

      // "Access Granted" title
      pdf.setFontSize(28);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(255, 255, 255);
      pdf.text("Access Granted", pageWidth / 2, cardY + 25, { align: "center" });

      // Instructions text
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(180, 180, 180);
      const instructionText = "To access, log in with the same email used";
      const instructionText2 = "during purchase and use the password:";
      pdf.text(instructionText, pageWidth / 2, cardY + 42, { align: "center" });
      pdf.text(instructionText2, pageWidth / 2, cardY + 50, { align: "center" });

      // Password box
      const passBoxY = cardY + 58;
      const passBoxWidth = 90;
      const passBoxHeight = 16;
      const passBoxX = (pageWidth - passBoxWidth) / 2;
      
      pdf.setFillColor(40, 45, 55);
      pdf.roundedRect(passBoxX, passBoxY, passBoxWidth, passBoxHeight, 4, 4, "F");
      
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(255, 255, 255);
      pdf.text(password, pageWidth / 2, passBoxY + 11, { align: "center" });

      // "Check your email" section
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(255, 255, 255);
      pdf.text("Check your email:", pageWidth / 2, cardY + 95, { align: "center" });

      pdf.setFontSize(11);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(160, 160, 160);
      const emailText1 = "All Access Details Were Sent";
      const emailText2 = "To Your Registered E-Mail!";
      pdf.text(emailText1, pageWidth / 2, cardY + 108, { align: "center" });
      pdf.text(emailText2, pageWidth / 2, cardY + 116, { align: "center" });

      // Green Access Button (with clickable link)
      const btnY = cardY + 135;
      const btnWidth = contentWidth - 20;
      const btnHeight = 18;
      const btnX = margin + 10;
      
      pdf.setFillColor(34, 197, 94); // Green like reference
      pdf.roundedRect(btnX, btnY, btnWidth, btnHeight, 5, 5, "F");
      
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(255, 255, 255);
      pdf.text("CLICK HERE TO ACCESS", pageWidth / 2, btnY + 12, { align: "center" });
      
      // Add clickable link to the button
      pdf.link(btnX, btnY, btnWidth, btnHeight, { url: accessUrl });

      // Text below button
      const belowBtnY = cardY + cardHeight + 12;
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(140, 140, 140);
      pdf.text("Don't worry! When you click the button above,", pageWidth / 2, belowBtnY, { align: "center" });
      pdf.text("a new page will open.", pageWidth / 2, belowBtnY + 6, { align: "center" });

      // Support section
      const supportY = belowBtnY + 20;
      pdf.setFontSize(10);
      pdf.setTextColor(140, 140, 140);
      pdf.text("For any questions, send a message to", pageWidth / 2, supportY, { align: "center" });
      pdf.text("support at the email", pageWidth / 2, supportY + 6, { align: "center" });
      
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(255, 255, 255);
      pdf.text(supportEmail, pageWidth / 2, supportY + 16, { align: "center" });
      
      // Add clickable email link
      const emailWidth = pdf.getTextWidth(supportEmail);
      pdf.link((pageWidth - emailWidth) / 2, supportY + 10, emailWidth, 8, { url: `mailto:${supportEmail}` });

      // TikCash Logo at bottom
      const logoY = pageHeight - 35;
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(37, 244, 238);
      pdf.text("Tik", pageWidth / 2 - 12, logoY, { align: "center" });
      pdf.setTextColor(254, 44, 85);
      pdf.text("Cash", pageWidth / 2 + 15, logoY, { align: "center" });
      
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(100, 100, 100);
      pdf.text("Start earning with every video you watch", pageWidth / 2, logoY + 8, { align: "center" });

      // Download
      pdf.save("TikCash-Access-Granted.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      {/* Download Button */}
      <button
        onClick={downloadPDF}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "linear-gradient(135deg, #25f4ee 0%, #1ed4cf 100%)",
          color: "#000",
          fontSize: "16px",
          fontWeight: 700,
          padding: "14px 28px",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          marginBottom: "32px",
          boxShadow: "0 4px 20px rgba(37,244,238,0.3)",
          transition: "all 0.2s",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download PDF
      </button>

      {/* Preview - A4 Container */}
      <div
        ref={a4Ref}
        style={{
          width: "100%",
          maxWidth: "420px",
          aspectRatio: "210/297",
          background: "#0a0a0a",
          boxShadow: "0 8px 60px rgba(0,0,0,0.8)",
          display: "flex",
          flexDirection: "column",
          padding: "32px 24px",
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
          borderRadius: "8px",
        }}
      >
        {/* Decorative Background Elements */}
        <div style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(254,44,85,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(37,244,238,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />

        {/* Congratulations Banner - GREEN like reference */}
        <div style={{
          width: "100%",
          background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
          borderRadius: "14px",
          padding: "18px 24px",
          textAlign: "center",
          marginBottom: "20px",
          boxShadow: "0 4px 20px rgba(34,197,94,0.35)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
            <span style={{ fontSize: "26px" }}>🎁</span>
            <h1 style={{
              fontSize: "22px",
              fontWeight: 900,
              color: "#fff",
              margin: 0,
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
              letterSpacing: "2px",
            }}>
              CONGRATULATIONS!
            </h1>
            <span style={{ fontSize: "26px" }}>🎁</span>
          </div>
        </div>

        {/* Main Card */}
        <div style={{
          width: "100%",
          background: "linear-gradient(180deg, rgba(40,45,55,0.95) 0%, rgba(30,35,42,0.95) 100%)",
          border: "1px solid rgba(55,65,81,0.5)",
          borderRadius: "16px",
          padding: "28px 20px",
          textAlign: "center",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}>
          {/* Access Granted Title */}
          <h2 style={{
            fontSize: "26px",
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 16px 0",
          }}>
            Access Granted
          </h2>

          {/* Instructions */}
          <p style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.7,
            margin: "0 0 16px 0",
          }}>
            To access, log in with the <strong style={{ color: "#fff" }}>same email</strong> used during purchase and use the password:
          </p>

          {/* Password Box */}
          <div style={{
            background: "rgba(0,0,0,0.4)",
            borderRadius: "10px",
            padding: "12px 24px",
            display: "inline-block",
            margin: "0 auto 20px",
          }}>
            <span style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "1px",
              fontFamily: "monospace",
            }}>
              {password}
            </span>
          </div>

          {/* Check Email Section */}
          <p style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#fff",
            margin: "0 0 8px 0",
          }}>
            Check your email:
          </p>
          <p style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.6,
            margin: "0 0 24px 0",
          }}>
            All Access Details Were Sent<br />
            To Your Registered E-Mail!
          </p>

          {/* GREEN Access Button */}
          <a
            href={accessUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              width: "100%",
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 800,
              padding: "16px 20px",
              borderRadius: "12px",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "1px",
              boxShadow: "0 4px 20px rgba(34,197,94,0.35)",
              marginBottom: "16px",
            }}
          >
            CLICK HERE TO ACCESS
          </a>

          <p style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.5,
            margin: "0 0 20px 0",
          }}>
            {"Don't worry! When you click the button above,"}<br />
            a new page will open.
          </p>

          {/* Support Section */}
          <div style={{
            marginTop: "auto",
            paddingTop: "16px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}>
            <p style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 8px 0",
            }}>
              For any questions, send a message to<br />
              support at the email
            </p>
            <a 
              href={`mailto:${supportEmail}`}
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#fff",
                textDecoration: "underline",
                textDecorationStyle: "dotted",
                textUnderlineOffset: "4px",
              }}
            >
              {supportEmail}
            </a>
          </div>
        </div>

        {/* TikCash Logo Footer */}
        <div style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "18px", fontWeight: 800, color: "#25f4ee" }}>Tik</span>
            <span style={{ fontSize: "18px", fontWeight: 800, color: "#fe2c55" }}>Cash</span>
          </div>
          <p style={{
            fontSize: "10px",
            color: "rgba(255,255,255,0.35)",
            margin: 0,
          }}>
            Start earning with every video you watch
          </p>
        </div>
      </div>
    </div>
  );
}
