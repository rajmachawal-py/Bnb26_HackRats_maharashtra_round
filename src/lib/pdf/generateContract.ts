import jsPDF from 'jspdf';
import { Deal } from '@/types/deal';

export const generateContractPdf = (deal: Deal) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(22);
  doc.text('Creator-Brand Collaboration Agreement', 20, 20);
  
  doc.setFontSize(12);
  doc.text(`Deal ID: ${deal.id}`, 20, 30);
  doc.text(`Date: ${new Date(deal.updatedAt).toLocaleDateString()}`, 20, 36);
  doc.text(`Status: ${deal.status.toUpperCase()}`, 20, 42);
  
  // Parties
  doc.setFontSize(16);
  doc.text('Parties', 20, 55);
  doc.setFontSize(12);
  doc.text(`Brand: ${deal.brandName}`, 20, 65);
  doc.text(`Creator: ${deal.creatorName}`, 20, 71);
  
  // Terms
  doc.setFontSize(16);
  doc.text('Commercial Terms', 20, 85);
  doc.setFontSize(12);
  doc.text(`Compensation: $${deal.terms.compensationAmount.toLocaleString()}`, 20, 95);
  doc.text(`Submission Deadline: ${deal.terms.submissionDeadline}`, 20, 101);
  doc.text(`Publishing Deadline: ${deal.terms.publishingDeadline}`, 20, 107);
  
  doc.text('Deliverables:', 20, 117);
  deal.terms.deliverablesSummary.forEach((d, i) => {
    doc.text(`- ${d}`, 25, 123 + (i * 6));
  });
  
  let y = 145;
  if (deal.brandConfirmation && deal.creatorConfirmation) {
    doc.setFontSize(16);
    doc.text('Signatures (Cryptographic)', 20, y);
    doc.setFontSize(10);
    y += 10;
    doc.text(`Brand Signatory: ${deal.brandConfirmation.userName} (${deal.brandConfirmation.timestamp})`, 20, y);
    y += 6;
    doc.text(`Signature Stamp: ${deal.brandConfirmation.signatureStamp}`, 20, y);
    
    y += 10;
    doc.text(`Creator Signatory: ${deal.creatorConfirmation.userName} (${deal.creatorConfirmation.timestamp})`, 20, y);
    y += 6;
    doc.text(`Signature Stamp: ${deal.creatorConfirmation.signatureStamp}`, 20, y);
  }
  
  // Footer with Hash
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text(`Document Hash (SHA-256): ${deal.sha256Fingerprint}`, 20, 280);
  
  return doc;
};

export const downloadContractPdf = (deal: Deal) => {
  const doc = generateContractPdf(deal);
  doc.save(`${deal.id}_Contract.pdf`);
};
