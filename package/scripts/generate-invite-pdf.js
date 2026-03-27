import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

// TikTok Rewards brand colors
const colors = {
  tiktokRed: rgb(254/255, 44/255, 85/255),      // #fe2c55
  tiktokCyan: rgb(37/255, 244/255, 238/255),    // #25f4ee
  darkBg: rgb(10/255, 10/255, 10/255),          // #0a0a0a
  cardBg: rgb(26/255, 26/255, 46/255),          // #1a1a2e
  white: rgb(1, 1, 1),
  textSecondary: rgb(0.7, 0.7, 0.7),
  textMuted: rgb(0.5, 0.5, 0.5),
};

async function generateInvitePDF() {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  
  // Add a page with custom dimensions (mobile-friendly aspect ratio)
  const page = pdfDoc.addPage([595, 842]); // A4 size
  const { width, height } = page.getSize();
  
  // Embed fonts
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
  // === BACKGROUND ===
  // Dark background
  page.drawRectangle({
    x: 0,
    y: 0,
    width: width,
    height: height,
    color: colors.darkBg,
  });
  
  // Decorative gradient-like stripes at top
  page.drawRectangle({
    x: 0,
    y: height - 200,
    width: width,
    height: 200,
    color: colors.cardBg,
  });
  
  // Accent line - Red
  page.drawRectangle({
    x: 0,
    y: height - 8,
    width: width * 0.5,
    height: 8,
    color: colors.tiktokRed,
  });
  
  // Accent line - Cyan
  page.drawRectangle({
    x: width * 0.5,
    y: height - 8,
    width: width * 0.5,
    height: 8,
    color: colors.tiktokCyan,
  });
  
  // === LOGO AREA ===
  // TikTok music note icon (simplified)
  const logoX = width / 2 - 30;
  const logoY = height - 120;
  
  // Draw simplified TikTok-style icon
  page.drawCircle({
    x: logoX + 15,
    y: logoY - 15,
    size: 25,
    color: colors.tiktokCyan,
  });
  
  page.drawCircle({
    x: logoX + 35,
    y: logoY + 5,
    size: 20,
    color: colors.tiktokRed,
  });
  
  // === HEADER TEXT ===
  // "TikTok" text
  page.drawText('TikTok', {
    x: width / 2 - 55,
    y: height - 170,
    size: 36,
    font: helveticaBold,
    color: colors.white,
  });
  
  // "Rewards" text in red
  page.drawText('Rewards', {
    x: width / 2 - 55,
    y: height - 210,
    size: 32,
    font: helveticaBold,
    color: colors.tiktokRed,
  });
  
  // === DECORATIVE ELEMENTS ===
  // Left decorative circle
  page.drawCircle({
    x: 50,
    y: height - 350,
    size: 80,
    borderColor: colors.tiktokCyan,
    borderWidth: 2,
    opacity: 0.3,
  });
  
  // Right decorative circle
  page.drawCircle({
    x: width - 50,
    y: height - 400,
    size: 60,
    borderColor: colors.tiktokRed,
    borderWidth: 2,
    opacity: 0.3,
  });
  
  // === MAIN CONTENT CARD ===
  const cardX = 40;
  const cardY = height - 550;
  const cardWidth = width - 80;
  const cardHeight = 280;
  
  // Card background
  page.drawRectangle({
    x: cardX,
    y: cardY,
    width: cardWidth,
    height: cardHeight,
    color: colors.cardBg,
    borderColor: colors.tiktokCyan,
    borderWidth: 1,
    opacity: 0.9,
  });
  
  // Card accent line
  page.drawRectangle({
    x: cardX,
    y: cardY + cardHeight - 4,
    width: cardWidth,
    height: 4,
    color: colors.tiktokRed,
  });
  
  // === CARD CONTENT ===
  // Main headline
  const headline = 'Ganhe Dinheiro Assistindo Videos!';
  page.drawText(headline, {
    x: cardX + 30,
    y: cardY + cardHeight - 50,
    size: 20,
    font: helveticaBold,
    color: colors.white,
  });
  
  // Subheadline
  page.drawText('Transforme seu tempo em recompensas reais', {
    x: cardX + 30,
    y: cardY + cardHeight - 80,
    size: 14,
    font: helvetica,
    color: colors.textSecondary,
  });
  
  // Benefits list
  const benefits = [
    '25 novos videos disponiveis diariamente',
    'Ganhe de $1.00 a $2.00 por video',
    'Saque minimo de apenas $50.00',
    'Pagamentos via PIX em 24 horas',
    'Suporte 24/7 disponivel',
  ];
  
  let benefitY = cardY + cardHeight - 120;
  for (const benefit of benefits) {
    // Bullet point (cyan circle)
    page.drawCircle({
      x: cardX + 45,
      y: benefitY + 4,
      size: 4,
      color: colors.tiktokCyan,
    });
    
    page.drawText(benefit, {
      x: cardX + 60,
      y: benefitY,
      size: 12,
      font: helvetica,
      color: colors.white,
    });
    benefitY -= 28;
  }
  
  // === CTA SECTION ===
  const ctaY = 180;
  
  // CTA background
  page.drawRectangle({
    x: cardX,
    y: ctaY,
    width: cardWidth,
    height: 80,
    color: colors.tiktokRed,
  });
  
  // CTA text
  page.drawText('COMECE AGORA!', {
    x: width / 2 - 80,
    y: ctaY + 45,
    size: 22,
    font: helveticaBold,
    color: colors.white,
  });
  
  // URL text (this will be the clickable link)
  const appUrl = 'https://tik-tok-rewards.vercel.app';
  page.drawText(appUrl, {
    x: width / 2 - 95,
    y: ctaY + 18,
    size: 12,
    font: helvetica,
    color: colors.white,
  });
  
  // === ADD CLICKABLE LINK ===
  // Create link annotation
  page.node.set(
    pdfDoc.context.obj({
      Type: 'Page',
      Annots: [
        pdfDoc.context.obj({
          Type: 'Annot',
          Subtype: 'Link',
          Rect: [cardX, ctaY, cardX + cardWidth, ctaY + 80],
          Border: [0, 0, 0],
          A: {
            Type: 'Action',
            S: 'URI',
            URI: appUrl,
          },
        }),
      ],
    })
  );
  
  // === FOOTER ===
  // Footer text
  page.drawText('Junte-se a milhares de usuarios', {
    x: width / 2 - 90,
    y: 120,
    size: 14,
    font: helvetica,
    color: colors.textSecondary,
  });
  
  page.drawText('que ja estao ganhando!', {
    x: width / 2 - 70,
    y: 100,
    size: 14,
    font: helvetica,
    color: colors.textSecondary,
  });
  
  // Decorative bottom line
  page.drawRectangle({
    x: width / 2 - 100,
    y: 60,
    width: 200,
    height: 3,
    color: colors.tiktokCyan,
  });
  
  // Small footer text
  page.drawText('TikTok Rewards - 2024', {
    x: width / 2 - 55,
    y: 35,
    size: 10,
    font: helvetica,
    color: colors.textMuted,
  });
  
  // === SAVE PDF ===
  const pdfBytes = await pdfDoc.save();
  
  // Ensure output directory exists
  const outputDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write PDF to file
  const outputPath = path.join(outputDir, 'tiktok-rewards-invite.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  
  console.log(`PDF generated successfully: ${outputPath}`);
  console.log(`File size: ${(pdfBytes.length / 1024).toFixed(2)} KB`);
}

generateInvitePDF().catch(console.error);
