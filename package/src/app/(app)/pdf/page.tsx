"use client";
import { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";

export default function PDFDownloadPage() {
  const [loading, setLoading] = useState(false);

  const generateAndDownloadPDF = async () => {
    setLoading(true);
    
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 792]);
    const { width, height } = page.getSize();
    
    // Cores TikTok
    const tiktokRed = rgb(254/255, 44/255, 85/255);
    const tiktokCyan = rgb(37/255, 244/255, 238/255);
    const white = rgb(1, 1, 1);
    const black = rgb(0, 0, 0);
    const darkBg = rgb(0, 0, 0);
    const cardBg = rgb(18/255, 18/255, 18/255);
    const cardBorder = rgb(38/255, 38/255, 38/255);
    
    // Fundo preto total
    page.drawRectangle({
      x: 0, y: 0, width, height,
      color: darkBg,
    });
    
    // ========== LOGO TIKTOK OFICIAL (nota musical estilizada) ==========
    const logoX = width / 2;
    const logoY = height - 100;
    
    // Nota musical TikTok - camada cyan (offset esquerda)
    page.drawRectangle({ x: logoX - 32, y: logoY - 10, width: 14, height: 50, color: tiktokCyan });
    page.drawCircle({ x: logoX - 25, y: logoY - 15, size: 12, color: tiktokCyan });
    page.drawEllipse({ x: logoX - 18, y: logoY + 45, xScale: 12, yScale: 8, color: tiktokCyan });
    
    // Nota musical TikTok - camada vermelha (offset direita)
    page.drawRectangle({ x: logoX - 28, y: logoY - 5, width: 14, height: 50, color: tiktokRed });
    page.drawCircle({ x: logoX - 21, y: logoY - 10, size: 12, color: tiktokRed });
    page.drawEllipse({ x: logoX - 14, y: logoY + 50, xScale: 12, yScale: 8, color: tiktokRed });
    
    // Nota musical TikTok - camada branca (centro)
    page.drawRectangle({ x: logoX - 30, y: logoY - 8, width: 14, height: 50, color: white });
    page.drawCircle({ x: logoX - 23, y: logoY - 13, size: 12, color: white });
    page.drawEllipse({ x: logoX - 16, y: logoY + 47, xScale: 12, yScale: 8, color: white });
    
    // ========== TEXTO TIKTOK ==========
    // "TikTok" em branco
    const fontBytes = await fetch('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_0.woff2').then(r => r.arrayBuffer()).catch(() => null);
    
    // TikTok texto estilizado
    page.drawText("TikTok", {
      x: logoX + 15,
      y: logoY + 10,
      size: 42,
      color: white,
    });
    
    // "Rewards" em vermelho abaixo
    page.drawText("Rewards", {
      x: logoX - 5,
      y: logoY - 40,
      size: 28,
      color: tiktokRed,
    });
    
    // ========== LINHA DECORATIVA ==========
    page.drawRectangle({
      x: 80, y: height - 180,
      width: width - 160, height: 3,
      color: tiktokCyan,
    });
    
    // ========== SUBTITULO ==========
    page.drawText("Assista. Ganhe. Repita.", {
      x: width/2 - 95,
      y: height - 220,
      size: 22,
      color: white,
    });
    
    // ========== CARD PRINCIPAL COM BORDAS ARREDONDADAS ==========
    const cardX = 40;
    const cardY = height - 520;
    const cardW = width - 80;
    const cardH = 270;
    const radius = 20;
    
    // Simular cantos arredondados com retangulos e circulos
    // Corpo principal
    page.drawRectangle({ x: cardX + radius, y: cardY, width: cardW - radius*2, height: cardH, color: cardBg });
    page.drawRectangle({ x: cardX, y: cardY + radius, width: cardW, height: cardH - radius*2, color: cardBg });
    // Cantos arredondados
    page.drawCircle({ x: cardX + radius, y: cardY + radius, size: radius, color: cardBg });
    page.drawCircle({ x: cardX + cardW - radius, y: cardY + radius, size: radius, color: cardBg });
    page.drawCircle({ x: cardX + radius, y: cardY + cardH - radius, size: radius, color: cardBg });
    page.drawCircle({ x: cardX + cardW - radius, y: cardY + cardH - radius, size: radius, color: cardBg });
    
    // Borda do card (linha superior cyan)
    page.drawRectangle({ x: cardX + radius, y: cardY + cardH - 4, width: cardW - radius*2, height: 4, color: tiktokCyan });
    
    // ========== BENEFICIOS ==========
    const benefits = [
      { icon: "play", text: "25 novos videos todos os dias" },
      { icon: "money", text: "Ganhe $1.00 a $2.00 por video" },
      { icon: "chart", text: "Potencial: ate $50/dia" },
      { icon: "bolt", text: "Saques rapidos via PIX" },
      { icon: "shield", text: "100% seguro e confiavel" },
      { icon: "star", text: "Bonus de indicacao" },
    ];
    
    let yPos = cardY + cardH - 50;
    benefits.forEach((benefit, index) => {
      // Icone circular
      const iconColor = index % 2 === 0 ? tiktokRed : tiktokCyan;
      page.drawCircle({ x: cardX + 40, y: yPos + 5, size: 14, color: iconColor });
      
      // Icone interno (simbolo)
      page.drawText(String(index + 1), {
        x: cardX + 35,
        y: yPos,
        size: 12,
        color: black,
      });
      
      // Texto do beneficio
      page.drawText(benefit.text, {
        x: cardX + 65,
        y: yPos,
        size: 15,
        color: white,
      });
      
      yPos -= 40;
    });
    
    // ========== DESTAQUE DE GANHO ==========
    const highlightY = height - 580;
    const highlightH = 55;
    
    // Background do destaque com bordas arredondadas
    page.drawRectangle({ x: 60, y: highlightY, width: width - 120, height: highlightH, color: rgb(254/255, 44/255, 85/255, 0.15) });
    page.drawRectangle({ x: 60, y: highlightY + highlightH - 3, width: width - 120, height: 3, color: tiktokRed });
    page.drawRectangle({ x: 60, y: highlightY, width: width - 120, height: 3, color: tiktokRed });
    
    page.drawText("GANHO POTENCIAL: ATE $1.500/MES", {
      x: width/2 - 155,
      y: highlightY + 18,
      size: 20,
      color: tiktokRed,
    });
    
    // ========== BOTAO CTA COM BORDAS ARREDONDADAS ==========
    const btnX = width/2 - 130;
    const btnY = height - 670;
    const btnW = 260;
    const btnH = 55;
    const btnRadius = 14;
    
    // Botao vermelho arredondado
    page.drawRectangle({ x: btnX + btnRadius, y: btnY, width: btnW - btnRadius*2, height: btnH, color: tiktokRed });
    page.drawRectangle({ x: btnX, y: btnY + btnRadius, width: btnW, height: btnH - btnRadius*2, color: tiktokRed });
    page.drawCircle({ x: btnX + btnRadius, y: btnY + btnRadius, size: btnRadius, color: tiktokRed });
    page.drawCircle({ x: btnX + btnW - btnRadius, y: btnY + btnRadius, size: btnRadius, color: tiktokRed });
    page.drawCircle({ x: btnX + btnRadius, y: btnY + btnH - btnRadius, size: btnRadius, color: tiktokRed });
    page.drawCircle({ x: btnX + btnW - btnRadius, y: btnY + btnH - btnRadius, size: btnRadius, color: tiktokRed });
    
    page.drawText("COMECE AGORA", {
      x: btnX + 55,
      y: btnY + 18,
      size: 22,
      color: white,
    });
    
    // ========== LINK ==========
    page.drawText("tik-tok-rewards.vercel.app", {
      x: width/2 - 100,
      y: height - 710,
      size: 16,
      color: tiktokCyan,
    });
    
    // ========== QR CODE PLACEHOLDER (quadrado estilizado) ==========
    const qrSize = 60;
    const qrX = width/2 - qrSize/2;
    const qrY = 80;
    
    // Borda do QR
    page.drawRectangle({ x: qrX - 5, y: qrY - 5, width: qrSize + 10, height: qrSize + 10, color: white });
    page.drawRectangle({ x: qrX, y: qrY, width: qrSize, height: qrSize, color: black });
    
    // Padrao interno do QR (simplificado)
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if ((i + j) % 2 === 0) {
          page.drawRectangle({ 
            x: qrX + 5 + i * 10, 
            y: qrY + 5 + j * 10, 
            width: 8, 
            height: 8, 
            color: white 
          });
        }
      }
    }
    
    // ========== FOOTER ==========
    page.drawText("Escaneie o QR Code ou acesse o link", {
      x: width/2 - 115,
      y: qrY - 25,
      size: 11,
      color: rgb(0.5, 0.5, 0.5),
    });
    
    page.drawText("2024 TikTok Rewards - Todos os direitos reservados", {
      x: width/2 - 145,
      y: 30,
      size: 10,
      color: rgb(0.4, 0.4, 0.4),
    });
    
    // ========== ELEMENTOS DECORATIVOS ==========
    // Circulos decorativos nos cantos
    page.drawCircle({ x: 30, y: height - 30, size: 8, color: tiktokCyan });
    page.drawCircle({ x: width - 30, y: height - 30, size: 8, color: tiktokRed });
    page.drawCircle({ x: 30, y: 30, size: 8, color: tiktokRed });
    page.drawCircle({ x: width - 30, y: 30, size: 8, color: tiktokCyan });
    
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
      background: "#000",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "20px",
      }}>
        {/* Logo TikTok mini */}
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
          <path d="M33.3 8.2C31.8 6.5 30.9 4.3 30.8 2H24.5V32.3C24.4 35.7 21.6 38.4 18.2 38.4C14.7 38.4 11.9 35.6 11.9 32.1C11.9 28.6 14.7 25.8 18.2 25.8C18.9 25.8 19.5 25.9 20.1 26.1V19.7C19.5 19.6 18.8 19.6 18.2 19.6C11.3 19.6 5.7 25.2 5.7 32.1C5.7 39 11.3 44.6 18.2 44.6C25.1 44.6 30.7 39 30.7 32.1V16.5C33.3 18.4 36.5 19.5 40 19.5V13.2C40 13.2 36 13 33.3 8.2Z" fill="#25F4EE"/>
          <path d="M35.3 10.2C33.8 8.5 32.9 6.3 32.8 4H26.5V34.3C26.4 37.7 23.6 40.4 20.2 40.4C16.7 40.4 13.9 37.6 13.9 34.1C13.9 30.6 16.7 27.8 20.2 27.8C20.9 27.8 21.5 27.9 22.1 28.1V21.7C21.5 21.6 20.8 21.6 20.2 21.6C13.3 21.6 7.7 27.2 7.7 34.1C7.7 41 13.3 46.6 20.2 46.6C27.1 46.6 32.7 41 32.7 34.1V18.5C35.3 20.4 38.5 21.5 42 21.5V15.2C42 15.2 38 15 35.3 10.2Z" fill="#FE2C55"/>
          <path d="M34.3 9.2C32.8 7.5 31.9 5.3 31.8 3H25.5V33.3C25.4 36.7 22.6 39.4 19.2 39.4C15.7 39.4 12.9 36.6 12.9 33.1C12.9 29.6 15.7 26.8 19.2 26.8C19.9 26.8 20.5 26.9 21.1 27.1V20.7C20.5 20.6 19.8 20.6 19.2 20.6C12.3 20.6 6.7 26.2 6.7 33.1C6.7 40 12.3 45.6 19.2 45.6C26.1 45.6 31.7 40 31.7 33.1V17.5C34.3 19.4 37.5 20.5 41 20.5V14.2C41 14.2 37 14 34.3 9.2Z" fill="white"/>
        </svg>
        <div>
          <span style={{ fontSize: "28px", fontWeight: 800, color: "#fff" }}>TikTok</span>
          <span style={{ fontSize: "28px", fontWeight: 800, color: "#fe2c55", marginLeft: "8px" }}>Rewards</span>
        </div>
      </div>
      
      <p style={{
        fontSize: "14px",
        color: "rgba(255,255,255,0.5)",
        marginBottom: "30px",
        textAlign: "center",
      }}>
        Baixe o PDF de convite para compartilhar
      </p>
      
      <button
        onClick={generateAndDownloadPDF}
        disabled={loading}
        style={{
          padding: "18px 50px",
          fontSize: "18px",
          fontWeight: 700,
          color: "#fff",
          background: "#fe2c55",
          border: "none",
          borderRadius: "16px",
          cursor: loading ? "wait" : "pointer",
          boxShadow: "0 4px 0 0 #b8183a, 0 8px 25px rgba(254,44,85,0.4)",
          transition: "transform 0.1s",
        }}
      >
        {loading ? "Gerando PDF..." : "Baixar PDF"}
      </button>
    </div>
  );
}
