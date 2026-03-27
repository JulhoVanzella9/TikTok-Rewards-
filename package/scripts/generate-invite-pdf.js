import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

// TikTok Rewards brand colors
const colors = {
  tiktokRed: rgb(254/255, 44/255, 85/255),
  tiktokCyan: rgb(37/255, 244/255, 238/255),
  darkBg: rgb(10/255, 10/255, 10/255),
  cardBg: rgb(26/255, 26/255, 46/255),
  white: rgb(1, 1, 1),
  textSecondary: rgb(0.7, 0.7, 0.7),
  textMuted: rgb(0.5, 0.5, 0.5),
};

async function generateInvitePDF() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const { width, height } = page.getSize();
  
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
  // Dark background
  page.drawRectangle({
    x: 0, y: 0,
    width: width, height: height,
    color: colors.darkBg,
  });
  
  // Header gradient area
  page.drawRectangle({
    x: 0, y: height - 200,
    width: width, height: 200,
    color: colors.cardBg,
  });
  
  // Accent lines top
  page.drawRectangle({
    x: 0, y: height - 8,
    width: width * 0.5, height: 8,
    color: colors.tiktokRed,
  });
  page.drawRectangle({
    x: width * 0.5, y: height - 8,
    width: width * 0.5, height: 8,
    color: colors.tiktokCyan,
  });
  
  // Logo circles
  page.drawCircle({
    x: width / 2 - 15, y: height - 105,
    size: 25, color: colors.tiktokCyan,
  });
  page.drawCircle({
    x: width / 2 + 5, y: height - 85,
    size: 20, color: colors.tiktokRed,
  });
  
  // Header text
  page.drawText('TikTok', {
    x: width / 2 - 55, y: height - 170,
    size: 36, font: helveticaBold, color: colors.white,
  });
  page.drawText('Rewards', {
    x: width / 2 - 55, y: height - 210,
    size: 32, font: helveticaBold, color: colors.tiktokRed,
  });
  
  // Decorative circles
  page.drawCircle({
    x: 60, y: height - 350,
    size: 80, borderColor: colors.tiktokCyan, borderWidth: 2,
  });
  page.drawCircle({
    x: width - 60, y: height - 400,
    size: 60, borderColor: colors.tiktokRed, borderWidth: 2,
  });
  
  // Main content card
  const cardX = 40;
  const cardY = height - 580;
  const cardWidth = width - 80;
  const cardHeight = 300;
  
  page.drawRectangle({
    x: cardX, y: cardY,
    width: cardWidth, height: cardHeight,
    color: colors.cardBg,
    borderColor: colors.tiktokCyan, borderWidth: 1,
  });
  page.drawRectangle({
    x: cardX, y: cardY + cardHeight - 4,
    width: cardWidth, height: 4,
    color: colors.tiktokRed,
  });
  
  // Card content
  page.drawText('Ganhe Dinheiro Assistindo Videos!', {
    x: cardX + 25, y: cardY + cardHeight - 50,
    size: 20, font: helveticaBold, color: colors.white,
  });
  page.drawText('Transforme seu tempo em recompensas reais', {
    x: cardX + 25, y: cardY + cardHeight - 80,
    size: 13, font: helvetica, color: colors.textSecondary,
  });
  
  // Benefits
  const benefits = [
    '25 novos videos disponiveis diariamente',
    'Ganhe de $1.00 a $2.00 por video',
    'Saque minimo de apenas $50.00',
    'Pagamentos via PIX em 24 horas',
    'Suporte 24/7 disponivel',
  ];
  
  let benefitY = cardY + cardHeight - 125;
  for (const benefit of benefits) {
    page.drawCircle({
      x: cardX + 40, y: benefitY + 4,
      size: 4, color: colors.tiktokCyan,
    });
    page.drawText(benefit, {
      x: cardX + 55, y: benefitY,
      size: 12, font: helvetica, color: colors.white,
    });
    benefitY -= 30;
  }
  
  // CTA button
  const ctaY = 150;
  page.drawRectangle({
    x: cardX, y: ctaY,
    width: cardWidth, height: 80,
    color: colors.tiktokRed,
  });
  page.drawText('COMECE AGORA!', {
    x: width / 2 - 85, y: ctaY + 48,
    size: 24, font: helveticaBold, color: colors.white,
  });
  
  const appUrl = 'https://tik-tok-rewards.vercel.app';
  page.drawText(appUrl, {
    x: width / 2 - 100, y: ctaY + 18,
    size: 12, font: helvetica, color: colors.white,
  });
  
  // Footer
  page.drawText('Junte-se a milhares de usuarios que ja estao ganhando!', {
    x: width / 2 - 160, y: 100,
    size: 13, font: helvetica, color: colors.textSecondary,
  });
  page.drawRectangle({
    x: width / 2 - 100, y: 65,
    width: 200, height: 3,
    color: colors.tiktokCyan,
  });
  page.drawText('TikTok Rewards - 2024', {
    x: width / 2 - 60, y: 40,
    size: 10, font: helvetica, color: colors.textMuted,
  });
  
  // Save PDF
  const pdfBytes = await pdfDoc.save();
  
  // Output as base64 for easy copying
  const base64 = Buffer.from(pdfBytes).toString('base64');
  console.log('PDF_BASE64_START');
  console.log(base64);
  console.log('PDF_BASE64_END');
  console.log('File size:', (pdfBytes.length / 1024).toFixed(2), 'KB');
}

generateInvitePDF().catch(console.error);
