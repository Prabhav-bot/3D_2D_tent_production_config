import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ConfigurationState, PricingBreakdown } from '../types/configurator';

/**
 * Generates and downloads a print-ready Production Summary Spec Sheet PDF.
 */
export async function generateProductionPdf(
  config: ConfigurationState,
  pricing: PricingBreakdown,
  canvas3dElement: HTMLCanvasElement | null,
  flat2dCanvasElement: HTMLCanvasElement | null
): Promise<void> {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 12;

  // Primary Theme Colors
  pdf.setFillColor(15, 23, 42); // Dark Slate header
  pdf.rect(0, 0, pageWidth, 25, 'F');

  // Title
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.text('PRODUCTION SPECIFICATION SHEET', margin, 12);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Custom Canopy Tent Manufacturing & Print Order', margin, 18);

  const configId = `CFG-${Date.now().toString(36).toUpperCase()}`;
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Config Metadata Box right side
  pdf.setFontSize(8);
  pdf.text(`Order Ref: ${configId}`, pageWidth - margin - 50, 10);
  pdf.text(`Date: ${dateStr}`, pageWidth - margin - 50, 15);
  pdf.text(`SKU: CANOPY-${config.variantSize.replace('.', '')}`, pageWidth - margin - 50, 20);

  let cursorY = 32;

  // 1. Order Summary Table
  pdf.setFillColor(241, 245, 249);
  pdf.rect(margin, cursorY, pageWidth - margin * 2, 28, 'F');
  pdf.setDrawColor(203, 213, 225);
  pdf.rect(margin, cursorY, pageWidth - margin * 2, 28, 'D');

  pdf.setTextColor(15, 23, 42);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.text('Product Specifications', margin + 4, cursorY + 6);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.5);

  const col1X = margin + 4;
  const col2X = margin + 65;
  const col3X = margin + 125;

  pdf.text(`Model Size: ${config.variantSize} ft Canopy`, col1X, cursorY + 12);
  pdf.text(`Frame Finish: ${config.frameFinish.toUpperCase().replace('_', ' ')}`, col1X, cursorY + 18);
  pdf.text(`Base Color: ${config.globalCanopyColor}`, col1X, cursorY + 24);

  pdf.text(`Printing Technique: ${config.printingTechnique.toUpperCase().replace('_', ' ')}`, col2X, cursorY + 12);
  pdf.text(`Wall Option: ${config.wallOption.toUpperCase().replace('_', ' ')}`, col2X, cursorY + 18);
  pdf.text(`Total Price: $${pricing.totalPrice.toFixed(2)} ${pricing.currency}`, col2X, cursorY + 24);

  let textCount = 0;
  let imgCount = 0;
  Object.values(config.sections).forEach((s) => {
    s.layers.forEach((l) => {
      if (l.type === 'text') textCount++;
      if (l.type === 'image') imgCount++;
    });
  });

  pdf.text(`Text Layers: ${textCount}`, col3X, cursorY + 12);
  pdf.text(`Logo Assets: ${imgCount}`, col3X, cursorY + 18);
  pdf.text(`Active Zones: ${Object.keys(config.sections).length}`, col3X, cursorY + 24);

  cursorY += 34;

  // 2. Preview Visual Snapshots (3D Snapshot & 2D Flat Snapshot side by side)
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.text('Visual Layout Previews', margin, cursorY);
  cursorY += 4;

  const boxWidth = (pageWidth - margin * 2 - 6) / 2;
  const boxHeight = 55;

  // 3D Canvas Image
  pdf.setFillColor(248, 250, 252);
  pdf.rect(margin, cursorY, boxWidth, boxHeight, 'F');
  pdf.rect(margin, cursorY, boxWidth, boxHeight, 'D');

  if (canvas3dElement) {
    try {
      const img3dData = canvas3dElement.toDataURL('image/png');
      pdf.addImage(img3dData, 'PNG', margin + 2, cursorY + 2, boxWidth - 4, boxHeight - 8);
    } catch (e) {
      console.warn('Could not export 3D canvas', e);
    }
  }
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.5);
  pdf.setTextColor(71, 85, 105);
  pdf.text('3D Product Render View', margin + 4, cursorY + boxHeight - 2);

  // 2D Flat Texture Canvas Image
  const box2dX = margin + boxWidth + 6;
  pdf.setFillColor(248, 250, 252);
  pdf.rect(box2dX, cursorY, boxWidth, boxHeight, 'F');
  pdf.rect(box2dX, cursorY, boxWidth, boxHeight, 'D');

  if (flat2dCanvasElement) {
    try {
      const img2dData = flat2dCanvasElement.toDataURL('image/png');
      pdf.addImage(img2dData, 'PNG', box2dX + 2, cursorY + 2, boxWidth - 4, boxHeight - 8);
    } catch (e) {
      console.warn('Could not export 2D canvas', e);
    }
  }
  pdf.text('2D Flattened Print Texture Atlas', box2dX + 4, cursorY + boxHeight - 2);

  cursorY += boxHeight + 8;

  // 3. Print Operator Vector Coordinate Matrix Table
  pdf.setTextColor(15, 23, 42);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.text('Print Operator Layer Coordinate Matrix', margin, cursorY);
  cursorY += 4;

  // Table Headers
  const tableHeaders = ['Zone', 'Layer Type', 'Content / Name', 'X %', 'Y %', 'Scale / Font', 'Color Hex'];
  const colWidths = [30, 22, 55, 15, 15, 25, 24];

  pdf.setFillColor(226, 232, 240);
  pdf.rect(margin, cursorY, pageWidth - margin * 2, 6, 'F');
  pdf.setFontSize(7.5);
  pdf.setFont('helvetica', 'bold');

  let currentX = margin + 2;
  tableHeaders.forEach((h, i) => {
    pdf.text(h, currentX, cursorY + 4.2);
    currentX += colWidths[i];
  });

  cursorY += 6;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7);

  let rowCount = 0;
  Object.values(config.sections).forEach((section) => {
    section.layers.forEach((layer) => {
      if (rowCount >= 12) return; // cap table rows for page 1

      const bgVal = rowCount % 2 === 0 ? 255 : 248;
      pdf.setFillColor(bgVal, bgVal, bgVal);
      pdf.rect(margin, cursorY, pageWidth - margin * 2, 5.5, 'F');

      let curX = margin + 2;

      // Zone
      pdf.text(section.label.substring(0, 18), curX, cursorY + 3.8);
      curX += colWidths[0];

      // Type
      pdf.text(layer.type.toUpperCase(), curX, cursorY + 3.8);
      curX += colWidths[1];

      // Content
      const content = layer.type === 'text' ? layer.text : layer.name || 'Logo Image';
      pdf.text(content.substring(0, 32), curX, cursorY + 3.8);
      curX += colWidths[2];

      // X
      pdf.text(`${layer.x.toFixed(1)}%`, curX, cursorY + 3.8);
      curX += colWidths[3];

      // Y
      pdf.text(`${layer.y.toFixed(1)}%`, curX, cursorY + 3.8);
      curX += colWidths[4];

      // Scale/Font
      const details = layer.type === 'text' ? `${layer.fontSize}px ${layer.fontFamily}` : `${layer.scale.toFixed(2)}x scale`;
      pdf.text(details.substring(0, 16), curX, cursorY + 3.8);
      curX += colWidths[5];

      // Color
      const colorStr = layer.type === 'text' ? layer.fill : 'N/A';
      pdf.text(colorStr, curX, cursorY + 3.8);

      cursorY += 5.5;
      rowCount++;
    });
  });

  if (rowCount === 0) {
    pdf.setFillColor(255, 255, 255);
    pdf.rect(margin, cursorY, pageWidth - margin * 2, 6, 'F');
    pdf.text('No graphic layers configured (Solid Color Fabric Order)', margin + 4, cursorY + 4);
    cursorY += 6;
  }

  cursorY += 6;

  // 4. Itemized Pricing Summary Table
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.text('Itemized Cost & Billing Breakdown', margin, cursorY);
  cursorY += 4;

  pricing.breakdownItems.forEach((item) => {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.text(item.label, margin + 4, cursorY + 4);
    pdf.text(`$${item.amount.toFixed(2)}`, pageWidth - margin - 20, cursorY + 4, { align: 'right' });
    cursorY += 5;
  });

  pdf.setFont('helvetica', 'bold');
  pdf.text('Estimated Tax (8%):', margin + 4, cursorY + 4);
  pdf.text(`$${pricing.taxEstimate.toFixed(2)}`, pageWidth - margin - 20, cursorY + 4, { align: 'right' });
  cursorY += 5;

  pdf.setLineWidth(0.4);
  pdf.line(margin, cursorY, pageWidth - margin, cursorY);
  cursorY += 4;

  pdf.setFontSize(10);
  pdf.setTextColor(37, 99, 235);
  pdf.text('Total Production Cost:', margin + 4, cursorY + 2);
  pdf.text(`$${pricing.totalPrice.toFixed(2)} ${pricing.currency}`, pageWidth - margin - 20, cursorY + 2, { align: 'right' });

  // 5. Footer Footer & Barcode Metadata
  pdf.setFillColor(15, 23, 42);
  pdf.rect(0, pageHeight - 12, pageWidth, 12, 'F');

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.setTextColor(148, 163, 184);
  pdf.text(`Shopify Production Payload Token: ${configId} | Generated by Interactive Product Configurator Engine`, margin, pageHeight - 5);

  // Save the PDF
  pdf.save(`Canopy_Tent_Production_Spec_${config.variantSize}_${configId}.pdf`);
}
