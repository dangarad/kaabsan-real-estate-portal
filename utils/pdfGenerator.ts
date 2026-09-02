import { jsPDF } from 'jspdf';
import { DocumentResource } from '../types';
import { OFFICIAL_BROCHURES, OfficialBrochureData } from '../data/officialBrochuresData';

/**
 * Generates an authentic, beautifully styled, multi-page PDF brochure using jsPDF.
 * This guarantees the downloaded file is a valid standard PDF readable on all devices,
 * containing accurate metric specs, floor plans, amenities, financing schedules, and Kaabsan branding.
 */
export const generateOfficialBrochurePDF = async (doc: DocumentResource): Promise<Blob> => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
  const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  // Resolve matching rich brochure data if available
  const brochureKey = doc.brochureKey || (
    doc.projectName.toLowerCase().includes('arag') ? 'aragsan' :
    doc.projectName.toLowerCase().includes('bilic') ? 'bilicsan' :
    doc.projectName.toLowerCase().includes('masal') ? 'masalaha' :
    doc.projectName.toLowerCase().includes('rugs') ? 'rugsan' : null
  );

  const richData: OfficialBrochureData | undefined = brochureKey ? OFFICIAL_BROCHURES[brochureKey] : undefined;

  // ==========================================
  // PAGE 1: EXECUTIVE COVER & PROJECT OVERVIEW
  // ==========================================
  
  // Top Header Gold Banner
  pdf.setFillColor(30, 28, 25); // #1E1C19 deep charcoal
  pdf.rect(0, 0, pageWidth, 45, 'F');

  pdf.setFillColor(194, 165, 93); // #C2A55D warm gold accent line
  pdf.rect(0, 44, pageWidth, 2.5, 'F');

  // Telesom Group & Kaabsan Logo Text
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.setTextColor(255, 255, 255);
  pdf.text('KAABSAN REAL ESTATE', margin, 18);

  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(194, 165, 93);
  pdf.text('TELESOM GROUP MEMBER COMPANY • HARGEISA, SOMALILAND', margin, 25);

  pdf.setFontSize(8);
  pdf.setTextColor(200, 200, 200);
  pdf.text(`Official Document ID: ${doc.id.toUpperCase()} • Issued: 2026`, margin, 32);

  pdf.setFontSize(8);
  pdf.setTextColor(255, 255, 255);
  pdf.text('CALL CENTER: 380 | TEL: +252 63 6100090 | WWW.KAABSANRE.CO', margin, 38);

  // Document Title Header
  let currentY = 56;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(194, 165, 93);
  pdf.text((doc.type || 'OFFICIAL ARCHITECTURAL BROCHURE').toUpperCase(), margin, currentY);

  currentY += 8;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(20);
  pdf.setTextColor(26, 26, 26);
  const titleLines = pdf.splitTextToSize(doc.title || doc.projectName, contentWidth);
  pdf.text(titleLines, margin, currentY);
  currentY += titleLines.length * 8;

  // Project Subtitle
  if (richData?.subtitle) {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.setTextColor(100, 95, 88);
    const subLines = pdf.splitTextToSize(richData.subtitle, contentWidth);
    pdf.text(subLines, margin, currentY);
    currentY += subLines.length * 6 + 2;
  }

  // Key Specifications Summary Grid (Gold Box)
  pdf.setFillColor(248, 246, 240); // Warm off-white
  pdf.setDrawColor(229, 226, 218); // Border
  pdf.roundedRect(margin, currentY, contentWidth, 38, 3, 3, 'FD');

  const col1 = margin + 5;
  const col2 = margin + contentWidth / 2 + 5;
  let boxY = currentY + 7;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(140, 115, 62);
  pdf.text('PROJECT NAME', col1, boxY);
  pdf.text('LOCATION', col2, boxY);

  boxY += 5;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(26, 26, 26);
  pdf.text(doc.projectName || 'Kaabsan Master Development', col1, boxY);
  pdf.text(richData?.location || 'Hargeisa, Somaliland', col2, boxY);

  boxY += 7;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(140, 115, 62);
  pdf.text('TOTAL BUILT / PLOT AREA (METRIC)', col1, boxY);
  pdf.text('FINANCING & PRICING', col2, boxY);

  boxY += 5;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(26, 26, 26);
  pdf.text(richData?.totalAreaMetric || 'Metric Dimensions in Sq. Metres (m²)', col1, boxY);
  pdf.text(richData?.priceMetric || '60-Month Islamic Financing (0% Riba)', col2, boxY);

  currentY += 46;

  // Project Narrative Description
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.setTextColor(30, 28, 25);
  pdf.text('Project Overview & Architecture', margin, currentY);
  currentY += 6;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9.5);
  pdf.setTextColor(60, 58, 54);
  const descText = doc.description || richData?.pages[0]?.description || 
    'Kaabsan Real Estate is dedicated to creating world-class master-planned gated communities with durable infrastructure, complete social living facilities, paved roads, and 24/7 security in Hargeisa.';
  const descLines = pdf.splitTextToSize(descText, contentWidth);
  pdf.text(descLines, margin, currentY);
  currentY += descLines.length * 5 + 6;

  // Key Amenities List
  if (richData?.amenities && richData.amenities.length > 0) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(30, 28, 25);
    pdf.text('Key Amenities & Master Facilities', margin, currentY);
    currentY += 6;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8.5);
    pdf.setTextColor(50, 48, 45);

    const half = Math.ceil(richData.amenities.length / 2);
    const leftAmenities = richData.amenities.slice(0, half);
    const rightAmenities = richData.amenities.slice(half);

    leftAmenities.forEach((item, idx) => {
      pdf.setFillColor(194, 165, 93);
      pdf.circle(margin + 2, currentY + idx * 5.5 - 1, 1, 'F');
      pdf.text(item, margin + 6, currentY + idx * 5.5);
    });

    rightAmenities.forEach((item, idx) => {
      pdf.setFillColor(194, 165, 93);
      pdf.circle(margin + contentWidth / 2 + 2, currentY + idx * 5.5 - 1, 1, 'F');
      pdf.text(item, margin + contentWidth / 2 + 6, currentY + idx * 5.5);
    });

    currentY += Math.max(leftAmenities.length, rightAmenities.length) * 5.5 + 8;
  }

  // Footer on Page 1
  addPdfFooter(pdf, 1, richData ? 3 : 2, pageWidth, pageHeight, margin);

  // =======================================================
  // PAGE 2: METRIC ARCHITECTURAL PLANS & ROOM BREAKDOWNS
  // =======================================================
  pdf.addPage();

  // Page 2 Header Bar
  addPdfSubHeader(pdf, 'ARCHITECTURAL FLOOR PLANS & METRIC DIMENSIONS', doc.projectName, pageWidth, margin);

  let p2Y = 32;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(14);
  pdf.setTextColor(30, 28, 25);
  pdf.text('Floor Level Specifications (in m² / Square Metres)', margin, p2Y);
  p2Y += 6;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(100, 95, 88);
  pdf.text('All structural drawings adhere to international engineering standards and municipal planning codes.', margin, p2Y);
  p2Y += 10;

  if (richData?.floorPlansMetric && richData.floorPlansMetric.length > 0) {
    richData.floorPlansMetric.forEach((fp) => {
      if (p2Y > pageHeight - 50) {
        addPdfFooter(pdf, 2, 3, pageWidth, pageHeight, margin);
        pdf.addPage();
        addPdfSubHeader(pdf, 'ARCHITECTURAL FLOOR PLANS (CONTINUED)', doc.projectName, pageWidth, margin);
        p2Y = 32;
      }

      // Card container for each level
      pdf.setFillColor(250, 249, 246);
      pdf.setDrawColor(220, 216, 205);
      
      const cardHeight = fp.roomBreakdown && fp.roomBreakdown.length > 0 ? 46 : 30;
      pdf.roundedRect(margin, p2Y, contentWidth, cardHeight, 2.5, 2.5, 'FD');

      // Card Header
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10.5);
      pdf.setTextColor(30, 28, 25);
      pdf.text(fp.levelName, margin + 4, p2Y + 6);

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9.5);
      pdf.setTextColor(194, 165, 93);
      const areaLabel = `Gross: ${fp.grossArea}${fp.netArea ? ` | Net: ${fp.netArea}` : ''}`;
      pdf.text(areaLabel, margin + contentWidth - 4, p2Y + 6, { align: 'right' });

      // Highlights / rooms
      let detailY = p2Y + 12;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8.5);
      pdf.setTextColor(60, 58, 54);

      if (fp.highlights && fp.highlights.length > 0) {
        fp.highlights.slice(0, 3).forEach((h) => {
          pdf.setFillColor(140, 115, 62);
          pdf.circle(margin + 6, detailY - 1, 0.8, 'F');
          const hLines = pdf.splitTextToSize(h, contentWidth - 14);
          pdf.text(hLines[0] || h, margin + 9, detailY);
          detailY += 4.8;
        });
      }

      // Room Breakdown Row if available
      if (fp.roomBreakdown && fp.roomBreakdown.length > 0) {
        detailY += 1;
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(7.5);
        pdf.setTextColor(140, 115, 62);
        const roomSummary = fp.roomBreakdown.map(r => `${r.room}: ${r.areaM2}`).join('  •  ');
        const roomLines = pdf.splitTextToSize(roomSummary, contentWidth - 8);
        pdf.text(roomLines.slice(0, 2), margin + 4, detailY);
      }

      p2Y += cardHeight + 6;
    });
  } else {
    // Default Floor Plan Layout for other documents
    pdf.setFillColor(250, 249, 246);
    pdf.setDrawColor(220, 216, 205);
    pdf.roundedRect(margin, p2Y, contentWidth, 60, 2.5, 2.5, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(30, 28, 25);
    pdf.text('Standard Metric Master Layout Overview', margin + 6, p2Y + 10);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(70, 68, 64);
    const genericText = [
      '• Ground Floor: Reception Majlis, Formal Dining, Designer Kitchen, Guest Suite & Maid Quarters.',
      '• First Floor: Master Bedroom with Walk-in Dressing & Luxury Bath, Family TV Lounge & Balconies.',
      '• Upper Level / Penthouse: Dedicated Terraces with panoramic views of Hargeisa and natural mountain breezes.',
      '• Site Infrastructure: Paved internal avenues, dedicated dual parking bays, and 24/7 security perimeter.'
    ];
    let gy = p2Y + 20;
    genericText.forEach(line => {
      pdf.text(line, margin + 6, gy);
      gy += 8;
    });
    p2Y += 70;
  }

  addPdfFooter(pdf, 2, richData ? 3 : 2, pageWidth, pageHeight, margin);

  // =======================================================
  // PAGE 3: 60-MONTH FINANCING & OFFICIAL PURCHASE GUIDE
  // =======================================================
  if (richData) {
    pdf.addPage();
    addPdfSubHeader(pdf, '60-MONTH ISLAMIC FINANCING & PURCHASE PROCESS', doc.projectName, pageWidth, margin);

    let p3Y = 32;

    // Financing Program Title
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.setTextColor(30, 28, 25);
    pdf.text('Dara Salaam Bank & Kaabsan 5-Year Payment Plan', margin, p3Y);
    p3Y += 6;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(100, 95, 88);
    pdf.text('Transparent, interest-free (0% Riba) installment plans tailored for local and diaspora homebuyers.', margin, p3Y);
    p3Y += 10;

    // 3 Step Plan Table
    const stepWidth = (contentWidth - 8) / 3;

    // Step 1
    pdf.setFillColor(248, 246, 240);
    pdf.setDrawColor(229, 226, 218);
    pdf.roundedRect(margin, p3Y, stepWidth, 42, 2.5, 2.5, 'FD');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(194, 165, 93);
    pdf.text('STEP 1', margin + 4, p3Y + 7);
    pdf.setFontSize(10);
    pdf.setTextColor(30, 28, 25);
    pdf.text('Unit Selection & Booking', margin + 4, p3Y + 13);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(70, 68, 64);
    const s1Text = pdf.splitTextToSize('Choose your preferred plot / unit. Pay a booking deposit via Zaad Merchant or Bank Wire.', stepWidth - 8);
    pdf.text(s1Text, margin + 4, p3Y + 20);

    // Step 2
    const s2X = margin + stepWidth + 4;
    pdf.setFillColor(248, 246, 240);
    pdf.roundedRect(s2X, p3Y, stepWidth, 42, 2.5, 2.5, 'FD');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(194, 165, 93);
    pdf.text('STEP 2', s2X + 4, p3Y + 7);
    pdf.setFontSize(10);
    pdf.setTextColor(30, 28, 25);
    pdf.text('30% Down Payment', s2X + 4, p3Y + 13);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(70, 68, 64);
    const s2Text = pdf.splitTextToSize('Sign official purchase contract with Dara Salaam Bank. Pay 30% initial equity.', stepWidth - 8);
    pdf.text(s2Text, s2X + 4, p3Y + 20);

    // Step 3
    const s3X = margin + (stepWidth + 4) * 2;
    pdf.setFillColor(248, 246, 240);
    pdf.roundedRect(s3X, p3Y, stepWidth, 42, 2.5, 2.5, 'FD');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(194, 165, 93);
    pdf.text('STEP 3', s3X + 4, p3Y + 7);
    pdf.setFontSize(10);
    pdf.setTextColor(30, 28, 25);
    pdf.text('60-Month Installments', s3X + 4, p3Y + 13);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(70, 68, 64);
    const s3Text = pdf.splitTextToSize('Spread remaining 70% balance evenly across 5 years with 0% Riba interest.', stepWidth - 8);
    pdf.text(s3Text, s3X + 4, p3Y + 20);

    p3Y += 50;

    // Official Contact & Booking Seal Box
    pdf.setFillColor(30, 28, 25);
    pdf.roundedRect(margin, p3Y, contentWidth, 55, 3, 3, 'F');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(194, 165, 93);
    pdf.text('Book an On-Site VIP Tour or Inquire With Our Engineering Team', margin + 6, p3Y + 10);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8.5);
    pdf.setTextColor(220, 216, 205);
    pdf.text('Sales Center & Physical Blueprint Inspection:', margin + 6, p3Y + 18);
    pdf.text('• Masalaha Airport Road Main Office & Headquarters, Hargeisa', margin + 6, p3Y + 24);
    pdf.text('• Phone & WhatsApp: +252 63 6100090 / +252 63 6100091', margin + 6, p3Y + 30);
    pdf.text('• Telesom Network Shortcode: 380 (Toll-Free Customer Service)', margin + 6, p3Y + 36);
    pdf.text('• Official Portal: https://kaabsanrealestate.com | www.kaabsanre.co', margin + 6, p3Y + 42);
    pdf.text('• Email Inquiries: sales@kaabsan.com', margin + 6, p3Y + 48);

    addPdfFooter(pdf, 3, 3, pageWidth, pageHeight, margin);
  }

  return pdf.output('blob');
};

/**
 * Helper to add consistent sub-header across pages
 */
function addPdfSubHeader(pdf: jsPDF, subtitle: string, project: string, pageWidth: number, margin: number) {
  pdf.setFillColor(30, 28, 25);
  pdf.rect(0, 0, pageWidth, 20, 'F');

  pdf.setFillColor(194, 165, 93);
  pdf.rect(0, 19, pageWidth, 1, 'F');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.setTextColor(255, 255, 255);
  pdf.text('KAABSAN REAL ESTATE • TELESOM GROUP', margin, 12);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(194, 165, 93);
  pdf.text(`${project.toUpperCase()} • ${subtitle}`, pageWidth - margin, 12, { align: 'right' });
}

/**
 * Helper to add consistent footer across pages
 */
function addPdfFooter(pdf: jsPDF, page: number, totalPages: number, pageWidth: number, pageHeight: number, margin: number) {
  pdf.setDrawColor(220, 216, 205);
  pdf.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.setTextColor(140, 136, 128);
  pdf.text('© 2026 Kaabsan Real Estate (Telesom Group). Certified Official Blueprint & Architectural Catalog.', margin, pageHeight - 9);
  pdf.text(`Page ${page} of ${totalPages}`, pageWidth - margin, pageHeight - 9, { align: 'right' });
}
