"use client";
import { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default function PDFDownloadPage() {
  const [loading, setLoading] = useState(false);

  const generateAndDownloadPDF = async () => {
    setLoading(true);
    
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 792]);
    const { width, height } = page.getSize();
    
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    // Cores
    const red = rgb(254/255, 44/255, 85/255);
    const cyan = rgb(37/255, 244/255, 238/255);
    const white = rgb(1, 1, 1);
    const darkBg = rgb(15/255, 15/255, 15/255);
    const gray = rgb(0.6, 0.6, 0.6);
    
    // Fundo escuro
    page.drawRectangle({
      x: 0, y: 0, width, height,
      color: darkBg,
    });
    
    // Header decorativo
    page.drawRectangle({
      x: 0, y: height - 120, width, height: 120,
      color: rgb(20/255, 20/255, 25/255),
    });
    
    // Linha cyan no topo
    page.drawRectangle({
      x: 0, y: height - 4, width, height: 4,
      color: cyan,
    });
    
    // Logo TikTok (círculos estilizados)
    page.drawCircle({ x: width/2 - 25, y: height - 60, size: 18, color: cyan });
    page.drawCircle({ x: width/2 + 5, y: height - 55, size: 18, color: red });
    page.drawCircle({ x: width/2 - 10, y: height - 58, size: 18, color: white });
    
    // Título
    page.drawText("TikTok", {
      x: width/2 - 55, y: height - 100,
      size: 28, font: fontBold, color: white,
    });
    page.drawText("Rewards", {
      x: width/2 + 30, y: height - 100,
      size: 28, font: fontBold, color: red,
    });
    
    // Subtítulo
    page.drawText("Ganhe dinheiro assistindo videos!", {
      x: width/2 - 130, y: height - 160,
      size: 18, font: fontRegular, color: cyan,
    });
    
    // Card principal
    page.drawRectangle({
      x: 50, y: height - 480, width: width - 100, height: 280,
      color: rgb(25/255, 25/255, 30/255),
      borderColor: rgb(40/255, 40/255, 45/255),
      borderWidth: 1,
    });
    
    // Benefícios
    const benefits = [
      "25 novos videos disponiveis diariamente",
      "Ganhe entre $1.00 e $2.00 por video",
      "Potencial de ganho: ate $50 por dia",
      "Saques rapidos via PIX",
      "Sem taxas escondidas",
      "Suporte 24/7",
    ];
    
    let yPos = height - 230;
    benefits.forEach((benefit) => {
      // Bullet point cyan
      page.drawCircle({ x: 80, y: yPos + 4, size: 4, color: cyan });
      page.drawText(benefit, {
        x: 95, y: yPos,
        size: 14, font: fontRegular, color: white,
      });
      yPos -= 35;
    });
    
    // Destaque de ganho
    page.drawRectangle({
      x: 50, y: height - 560, width: width - 100, height: 60,
      color: rgb(254/255, 44/255, 85/255, 0.15),
      borderColor: red,
      borderWidth: 2,
    });
    
    page.drawText("Ganho potencial mensal: ate $1.500!", {
      x: width/2 - 140, y: height - 540,
      size: 18, font: fontBold, color: red,
    });
    
    // Botão CTA
    page.drawRectangle({
      x: width/2 - 120, y: height - 640, width: 240, height: 50,
      color: red,
    });
    
    page.drawText("ACESSE AGORA", {
      x: width/2 - 70, y: height - 622,
      size: 18, font: fontBold, color: white,
    });
    
    // Link
    page.drawText("tik-tok-rewards.vercel.app", {
      x: width/2 - 95, y: height - 680,
      size: 14, font: fontRegular, color: cyan,
    });
    
    // Footer
    page.drawRectangle({
      x: 0, y: 0, width, height: 50,
      color: rgb(10/255, 10/255, 12/255),
    });
    
    page.drawText("TikTok Rewards 2024 - Todos os direitos reservados", {
      x: width/2 - 160, y: 20,
      size: 10, font: fontRegular, color: gray,
    });
    
    // Gerar e baixar
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "TikTok-Rewards-Convite.pdf";
    link.click();
    URL.revokeObjectURL(url);
    
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      background: "#0a0a0a",
    }}>
      <h1 style={{
        fontSize: "24px",
        fontWeight: 700,
        color: "#fff",
        marginBottom: "12px",
        textAlign: "center",
      }}>
        Baixar PDF de Convite
      </h1>
      
      <p style={{
        fontSize: "14px",
        color: "rgba(255,255,255,0.6)",
        marginBottom: "30px",
        textAlign: "center",
      }}>
        Clique no botao abaixo para baixar o PDF
      </p>
      
      <button
        onClick={generateAndDownloadPDF}
        disabled={loading}
        style={{
          padding: "16px 40px",
          fontSize: "18px",
          fontWeight: 700,
          color: "#000",
          background: "linear-gradient(135deg, #25f4ee, #00d4aa)",
          border: "none",
          borderRadius: "14px",
          cursor: loading ? "wait" : "pointer",
          boxShadow: "0 4px 0 0 #15a8a3, 0 8px 20px rgba(37,244,238,0.3)",
        }}
      >
        {loading ? "Gerando..." : "Baixar PDF"}
      </button>
    </div>
  );
}
