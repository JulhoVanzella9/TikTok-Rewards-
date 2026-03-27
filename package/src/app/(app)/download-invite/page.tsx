"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme/context";

export default function DownloadInvitePage() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    // Dynamically import pdf-lib
    const { PDFDocument, rgb, StandardFonts } = await import("pdf-lib");
    
    // Create PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size
    const { width, height } = page.getSize();
    
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    // Colors
    const bgColor = rgb(0.02, 0.02, 0.02);
    const redColor = rgb(254/255, 44/255, 85/255);
    const cyanColor = rgb(37/255, 244/255, 238/255);
    const whiteColor = rgb(1, 1, 1);
    const grayColor = rgb(0.6, 0.6, 0.6);
    
    // Background
    page.drawRectangle({
      x: 0, y: 0, width, height,
      color: bgColor,
    });
    
    // Header decoration - gradient-like bars
    page.drawRectangle({
      x: 0, y: height - 120, width, height: 120,
      color: rgb(0.05, 0.05, 0.08),
    });
    
    // Decorative circles (TikTok style)
    page.drawCircle({
      x: 80, y: height - 60,
      size: 25,
      color: cyanColor,
    });
    page.drawCircle({
      x: 90, y: height - 65,
      size: 25,
      color: redColor,
    });
    
    // Title
    page.drawText("TikTok", {
      x: 130, y: height - 55,
      size: 32,
      font: helveticaBold,
      color: whiteColor,
    });
    page.drawText("Rewards", {
      x: 130, y: height - 90,
      size: 28,
      font: helveticaBold,
      color: redColor,
    });
    
    // Main card background
    page.drawRectangle({
      x: 40, y: height - 480,
      width: width - 80, height: 320,
      color: rgb(0.08, 0.08, 0.1),
      borderColor: rgb(0.15, 0.15, 0.18),
      borderWidth: 1,
    });
    
    // Card title
    page.drawText("Ganhe Dinheiro Assistindo Videos!", {
      x: 60, y: height - 200,
      size: 20,
      font: helveticaBold,
      color: whiteColor,
    });
    
    // Benefits list
    const benefits = [
      "25 novos videos disponiveis diariamente",
      "Ganhe entre $1.00 - $2.00 por video",
      "Saques a partir de $150.00 via PIX",
      "Suporte 24/7 disponivel",
      "Sem taxas escondidas",
    ];
    
    let yPos = height - 250;
    benefits.forEach((benefit) => {
      // Cyan bullet
      page.drawCircle({
        x: 75, y: yPos + 4,
        size: 4,
        color: cyanColor,
      });
      
      page.drawText(benefit, {
        x: 90, y: yPos,
        size: 13,
        font: helvetica,
        color: grayColor,
      });
      yPos -= 30;
    });
    
    // Highlight box
    page.drawRectangle({
      x: 60, y: height - 450,
      width: width - 120, height: 50,
      color: rgb(37/255, 244/255, 238/255, 0.1),
      borderColor: cyanColor,
      borderWidth: 1,
    });
    
    page.drawText("Potencial de Ganho: Ate $50/dia!", {
      x: 150, y: height - 432,
      size: 14,
      font: helveticaBold,
      color: cyanColor,
    });
    
    // CTA Button
    page.drawRectangle({
      x: 120, y: height - 560,
      width: width - 240, height: 50,
      color: redColor,
    });
    
    page.drawText("ACESSAR AGORA", {
      x: 215, y: height - 542,
      size: 16,
      font: helveticaBold,
      color: whiteColor,
    });
    
    // Link text
    page.drawText("tik-tok-rewards.vercel.app", {
      x: 195, y: height - 600,
      size: 12,
      font: helvetica,
      color: cyanColor,
    });
    
    // Footer
    page.drawText("Comece hoje e transforme seu tempo em dinheiro!", {
      x: 130, y: 80,
      size: 12,
      font: helvetica,
      color: grayColor,
    });
    
    page.drawText("2024 TikTok Rewards - Todos os direitos reservados", {
      x: 150, y: 50,
      size: 10,
      font: helvetica,
      color: rgb(0.4, 0.4, 0.4),
    });
    
    // Save and download
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = "TikTok-Rewards-Convite.pdf";
    link.click();
    
    URL.revokeObjectURL(url);
    setIsGenerating(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      background: isDarkMode ? "#000" : "#f5f5f5",
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: isDarkMode ? "rgba(255,255,255,0.05)" : "#fff",
          borderRadius: "24px",
          padding: "40px",
          textAlign: "center",
          maxWidth: "400px",
          border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
        }}
      >
        <div style={{
          width: "80px",
          height: "80px",
          borderRadius: "20px",
          background: "linear-gradient(135deg, #fe2c55, #25f4ee)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#fff">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8" stroke="#fff" strokeWidth="2" fill="none"/>
            <line x1="12" y1="18" x2="12" y2="12" stroke="#000" strokeWidth="2"/>
            <line x1="9" y1="15" x2="15" y2="15" stroke="#000" strokeWidth="2"/>
          </svg>
        </div>
        
        <h1 style={{
          fontSize: "24px",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "12px",
        }}>
          Baixar Convite PDF
        </h1>
        
        <p style={{
          fontSize: "14px",
          color: "var(--text-muted)",
          marginBottom: "32px",
          lineHeight: 1.6,
        }}>
          Baixe o PDF de apresentacao do TikTok Rewards para compartilhar com seus amigos e familiares.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={generatePDF}
          disabled={isGenerating}
          style={{
            width: "100%",
            padding: "16px 32px",
            fontSize: "16px",
            fontWeight: 700,
            color: "#fff",
            background: "linear-gradient(135deg, #fe2c55, #d91a47)",
            border: "none",
            borderRadius: "14px",
            cursor: isGenerating ? "wait" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            boxShadow: "0 4px 0 0 #a01535, 0 8px 20px rgba(254,44,85,0.3)",
            opacity: isGenerating ? 0.7 : 1,
          }}
        >
          {isGenerating ? (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
                <circle cx="12" cy="12" r="10" strokeDasharray="60" strokeDashoffset="20"/>
              </svg>
              Gerando PDF...
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Baixar PDF
            </>
          )}
        </motion.button>
      </motion.div>
      
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
