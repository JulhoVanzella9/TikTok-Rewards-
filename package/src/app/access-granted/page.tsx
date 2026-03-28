"use client";
import { useRef } from "react";
import { jsPDF } from "jspdf";

export default function AccessGrantedPage() {
  const a4Ref = useRef<HTMLDivElement>(null);
  const password = "myacess2026";
  const supportEmail = "accesssupport.ai@gmail.com";
  const accessUrl = "https://tik-cash.vercel.app";

  const downloadPDF = async () => {
    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin;

      // Background
      pdf.setFillColor(13, 17, 23);
      pdf.rect(0, 0, pageWidth, pageHeight, "F");

      // Congratulations Banner
      const bannerY = 25;
      const bannerHeight = 22;
      pdf.setFillColor(254, 44, 85);
      pdf.roundedRect(margin, bannerY, contentWidth, bannerHeight, 6, 6, "F");

      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(255, 255, 255);
      pdf.text("CONGRATULATIONS!", pageWidth / 2, bannerY + 14, { align: "center" });

      // Main Card
      const cardY = bannerY + bannerHeight + 12;
      const cardHeight = 170;
      pdf.setFillColor(20, 30, 35);
      pdf.roundedRect(margin, cardY, contentWidth, cardHeight, 8, 8, "F");
      pdf.setDrawColor(37, 244, 238);
      pdf.setLineWidth(0.5);
      pdf.roundedRect(margin, cardY, contentWidth, cardHeight, 8, 8, "S");

      // Access Granted Title
      pdf.setFontSize(28);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(255, 255, 255);
      pdf.text("Access Granted", pageWidth / 2, cardY + 25, { align: "center" });

      // Subtitle
      pdf.setFontSize(10);
      pdf.setTextColor(37, 244, 238);
      pdf.text("YOUR PREMIUM ACCOUNT IS READY", pageWidth / 2, cardY + 35, { align: "center" });

      // Instructions
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(200, 200, 200);
      pdf.text("To access, log in with the same email used", pageWidth / 2, cardY + 52, { align: "center" });
      pdf.text("during purchase and use the password below:", pageWidth / 2, cardY + 60, { align: "center" });

      // Password Box
      const passBoxY = cardY + 70;
      pdf.setFillColor(30, 40, 45);
      pdf.roundedRect(margin + 30, passBoxY, contentWidth - 60, 22, 5, 5, "F");
      pdf.setDrawColor(37, 244, 238);
      pdf.setLineWidth(1);
      pdf.roundedRect(margin + 30, passBoxY, contentWidth - 60, 22, 5, 5, "S");

      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(255, 255, 255);
      pdf.text(password, pageWidth / 2, passBoxY + 14, { align: "center" });

      // Check Email Notice
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(254, 44, 85);
      pdf.text("Check Your Email", pageWidth / 2, cardY + 108, { align: "center" });
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(180, 180, 180);
      pdf.setFontSize(10);
      pdf.text("All access details were sent to your registered email!", pageWidth / 2, cardY + 116, { align: "center" });

      // Green Access Button
      const btnY = cardY + 128;
      const btnWidth = contentWidth - 30;
      const btnHeight = 16;
      const btnX = margin + 15;

      pdf.setFillColor(34, 197, 94);
      pdf.roundedRect(btnX, btnY, btnWidth, btnHeight, 5, 5, "F");

      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(255, 255, 255);
      pdf.text("CLICK HERE TO ACCESS", pageWidth / 2, btnY + 10.5, { align: "center" });

      // Clickable link on button
      pdf.link(btnX, btnY, btnWidth, btnHeight, { url: accessUrl });

      // Text below button
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(140, 140, 140);
      pdf.text("A new page will open when you click the button above.", pageWidth / 2, cardY + 158, { align: "center" });

      // Support Section Card
      const supportY = cardY + cardHeight + 15;
      const supportHeight = 35;
      pdf.setFillColor(25, 30, 35);
      pdf.roundedRect(margin, supportY, contentWidth, supportHeight, 6, 6, "F");
      pdf.setDrawColor(60, 70, 80);
      pdf.setLineWidth(0.3);
      pdf.roundedRect(margin, supportY, contentWidth, supportHeight, 6, 6, "S");

      pdf.setFontSize(10);
      pdf.setTextColor(160, 160, 160);
      pdf.text("For any questions, contact support at:", pageWidth / 2, supportY + 12, { align: "center" });

      // Email - highlighted
      pdf.setFillColor(40, 50, 55);
      const emailBoxWidth = 100;
      const emailBoxX = (pageWidth - emailBoxWidth) / 2;
      pdf.roundedRect(emailBoxX, supportY + 17, emailBoxWidth, 12, 3, 3, "F");

      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(37, 244, 238);
      pdf.text(supportEmail, pageWidth / 2, supportY + 25, { align: "center" });

      // Clickable email
      pdf.link(emailBoxX, supportY + 17, emailBoxWidth, 12, { url: `mailto:${supportEmail}` });

      // TikCash Footer
      const footerY = pageHeight - 30;
      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(255, 255, 255);
      pdf.text("TikCash", pageWidth / 2, footerY, { align: "center" });

      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(120, 120, 120);
      pdf.text("Start earning with every video you watch", pageWidth / 2, footerY + 8, { align: "center" });

      // Save PDF
      pdf.save("TikCash-Access-Granted.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#1a1a1a",
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
        Download A4 Image
      </button>

      {/* A4 Container - 210mm x 297mm (794px x 1123px at 96 DPI) */}
      <div
        ref={a4Ref}
        style={{
          width: "794px",
          height: "1123px",
          background: "linear-gradient(180deg, #0d1117 0%, #0a0a0a 100%)",
          boxShadow: "0 8px 60px rgba(0,0,0,0.8)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "60px 50px",
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Background Elements */}
        <div style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(254,44,85,0.15) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute",
          bottom: "-100px",
          left: "-100px",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(37,244,238,0.15) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />

        {/* Congratulations Banner */}
        <div style={{
          width: "100%",
          maxWidth: "600px",
          background: "linear-gradient(135deg, #fe2c55 0%, #ff1744 50%, #d41442 100%)",
          borderRadius: "20px",
          padding: "28px 40px",
          textAlign: "center",
          marginBottom: "40px",
          boxShadow: "0 8px 40px rgba(254,44,85,0.4)",
          border: "2px solid rgba(255,255,255,0.15)",
          position: "relative",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>
            <span style={{ fontSize: "42px" }}>🎁</span>
            <h1 style={{
              fontSize: "36px",
              fontWeight: 900,
              color: "#fff",
              margin: 0,
              textShadow: "0 3px 12px rgba(0,0,0,0.4)",
              letterSpacing: "3px",
            }}>
              CONGRATULATIONS!
            </h1>
            <span style={{ fontSize: "42px" }}>🎁</span>
          </div>
        </div>

        {/* Main Card */}
        <div style={{
          width: "100%",
          maxWidth: "600px",
          background: "linear-gradient(180deg, rgba(37,244,238,0.08) 0%, rgba(37,244,238,0.02) 100%)",
          border: "1px solid rgba(37,244,238,0.2)",
          borderRadius: "24px",
          padding: "48px 40px",
          textAlign: "center",
          position: "relative",
        }}>
          {/* Success Icon */}
          <div style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #25f4ee 0%, #17b8b3 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 32px",
            boxShadow: "0 10px 40px rgba(37,244,238,0.4)",
          }}>
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>

          <h2 style={{
            fontSize: "40px",
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 12px 0",
          }}>
            Access Granted
          </h2>

          <p style={{
            fontSize: "16px",
            color: "#25f4ee",
            fontWeight: 600,
            margin: "0 0 36px 0",
            textTransform: "uppercase",
            letterSpacing: "3px",
          }}>
            Your Premium Account is Ready
          </p>

          {/* Instructions */}
          <div style={{
            background: "rgba(0,0,0,0.4)",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "32px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <p style={{
              fontSize: "17px",
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.8,
              margin: 0,
            }}>
              To access, log in with the <strong style={{ color: "#fff" }}>same email</strong> used during purchase and use the password below:
            </p>
          </div>

          {/* Password Box */}
          <div style={{ marginBottom: "36px" }}>
            <p style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 12px 0",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}>
              Your Password
            </p>
            <div style={{
              background: "linear-gradient(135deg, rgba(37,244,238,0.12) 0%, rgba(37,244,238,0.04) 100%)",
              border: "3px solid #25f4ee",
              borderRadius: "16px",
              padding: "20px 36px",
              display: "inline-block",
            }}>
              <span style={{
                fontSize: "32px",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "4px",
                fontFamily: "monospace",
              }}>
                {password}
              </span>
            </div>
          </div>

          {/* Email Notice */}
          <div style={{
            background: "linear-gradient(135deg, rgba(254,44,85,0.1) 0%, rgba(254,44,85,0.05) 100%)",
            border: "1px solid rgba(254,44,85,0.25)",
            borderRadius: "14px",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}>
            <div style={{
              width: "50px",
              height: "50px",
              borderRadius: "12px",
              background: "rgba(254,44,85,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fe2c55" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 6l-10 7L2 6"/>
              </svg>
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{ fontSize: "16px", fontWeight: 700, color: "#fff", margin: 0 }}>
                Check Your Email
              </p>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", margin: "4px 0 0 0" }}>
                All access details were sent to your registered email!
              </p>
            </div>
          </div>
        </div>

        {/* Access Button */}
        <div style={{
          width: "100%",
          maxWidth: "600px",
          marginTop: "32px",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            width: "100%",
            background: "linear-gradient(135deg, #25f4ee 0%, #1ed4cf 50%, #17b8b3 100%)",
            color: "#000",
            fontSize: "20px",
            fontWeight: 800,
            padding: "24px 36px",
            borderRadius: "16px",
            textDecoration: "none",
            textTransform: "uppercase",
            letterSpacing: "2px",
            boxShadow: "0 6px 0 0 #0f8a87, 0 14px 40px rgba(37,244,238,0.35)",
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 3h6v6M14 10l6.1-6.1M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>
            </svg>
            CLICK HERE TO ACCESS
          </div>

          <p style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.6,
            margin: "20px 0 0 0",
            textAlign: "center",
          }}>
            A new page will open when you click the button above.
          </p>
        </div>

        {/* Support Section */}
        <div style={{
          width: "100%",
          maxWidth: "600px",
          marginTop: "32px",
          padding: "24px",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.06)",
          textAlign: "center",
        }}>
          <p style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.6)",
            margin: "0 0 12px 0",
          }}>
            For any questions, send a message to support at:
          </p>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            color: "#fff",
            fontSize: "17px",
            fontWeight: 700,
            padding: "12px 20px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "10px",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#25f4ee" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M22 6l-10 7L2 6"/>
            </svg>
            accesssupport.ai@gmail.com
          </div>
        </div>

        {/* TikCash Logo Footer */}
        <div style={{
          marginTop: "auto",
          paddingTop: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
              <path d="M30 8V28C30 33.5 25.5 38 20 38C14.5 38 10 33.5 10 28C10 22.5 14.5 18 20 18C21.5 18 23 18.3 24 18.8V8H30Z" fill="#25F4EE" transform="translate(-2, -1)"/>
              <path d="M30 8V28C30 33.5 25.5 38 20 38C14.5 38 10 33.5 10 28C10 22.5 14.5 18 20 18C21.5 18 23 18.3 24 18.8V8H30Z" fill="#FE2C55" transform="translate(2, 1)"/>
              <path d="M30 8V28C30 33.5 25.5 38 20 38C14.5 38 10 33.5 10 28C10 22.5 14.5 18 20 18C21.5 18 23 18.3 24 18.8V8H30Z" fill="#fff"/>
              <text x="20" y="32" textAnchor="middle" fill="#000" fontSize="14" fontWeight="800">$</text>
              <circle cx="36" cy="12" r="7" fill="#25F4EE" stroke="#000" strokeWidth="2"/>
              <text x="36" y="15.5" textAnchor="middle" fill="#000" fontSize="9" fontWeight="800">$</text>
            </svg>
            <span style={{
              fontSize: "26px",
              fontWeight: 800,
              color: "#fff",
            }}>
              TikCash
            </span>
          </div>
          <p style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.4)",
            margin: 0,
          }}>
            Start earning with every video you watch
          </p>
        </div>
      </div>
    </div>
  );
}
