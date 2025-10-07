import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface Entity {
  type: string;
  value: string;
  risk: 'high' | 'medium' | 'low';
}

interface Result {
  id: string;
  sender: string;
  receiver: string;
  app: string;
  timestamp: string;
  text: string;
  entities: Entity[];
}

interface ReportOptions {
  includeTimeline: boolean;
  includeRawJson: boolean;
}

interface ReportData {
  query: string;
  mode: string;
  queryId: string;
  dataset: string;
  totalResults: number;
  selectedResults: Result[];
  options: ReportOptions;
  generatedAt: string;
}

export const generateReportPDF = (data: ReportData): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Helper function to add text with word wrapping
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + (lines.length * fontSize * 0.4);
  };

  // Helper function to add a new page if needed
  const checkNewPage = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - 20) {
      doc.addPage();
      yPosition = 20;
      return true;
    }
    return false;
  };

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('EOFDR Copilot - Forensic Report', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // Report metadata
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  yPosition = addWrappedText(`Generated: ${data.generatedAt}`, 20, yPosition, pageWidth - 40);
  yPosition = addWrappedText(`Query ID: ${data.queryId}`, 20, yPosition, pageWidth - 40);
  yPosition = addWrappedText(`Dataset: ${data.dataset}`, 20, yPosition, pageWidth - 40);
  yPosition = addWrappedText(`Total Results: ${data.totalResults}`, 20, yPosition, pageWidth - 40);
  yPosition = addWrappedText(`Selected Items: ${data.selectedResults.length}`, 20, yPosition, pageWidth - 40);
  yPosition += 10;

  // Query information
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Search Query', 20, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  yPosition = addWrappedText(`Query: "${data.query}"`, 20, yPosition, pageWidth - 40);
  yPosition = addWrappedText(`Mode: ${data.mode}`, 20, yPosition, pageWidth - 40);
  yPosition += 15;

  // Results table
  checkNewPage(50);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Selected Evidence Items', 20, yPosition);
  yPosition += 10;

  // Prepare table data
  const tableData = data.selectedResults.map((result, index) => [
    index + 1,
    result.sender,
    result.receiver,
    result.app,
    new Date(result.timestamp).toLocaleString(),
    result.text.length > 50 ? result.text.substring(0, 50) + '...' : result.text,
    result.entities.map(e => `${e.type}: ${e.value}`).join(', ')
  ]);

  doc.autoTable({
    head: [['#', 'Sender', 'Receiver', 'App', 'Timestamp', 'Text', 'Entities']],
    body: tableData,
    startY: yPosition,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [31, 41, 55] },
    alternateRowStyles: { fillColor: [248, 249, 250] },
    columnStyles: {
      0: { cellWidth: 15 },
      1: { cellWidth: 30 },
      2: { cellWidth: 30 },
      3: { cellWidth: 25 },
      4: { cellWidth: 35 },
      5: { cellWidth: 40 },
      6: { cellWidth: 50 }
    }
  });

  yPosition = (doc as any).lastAutoTable.finalY + 15;

  // Timeline section
  if (data.options.includeTimeline) {
    checkNewPage(50);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Timeline Analysis', 20, yPosition);
    yPosition += 10;

    // Sort results by timestamp
    const sortedResults = [...data.selectedResults].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    sortedResults.forEach((result, index) => {
      checkNewPage(20);
      const timestamp = new Date(result.timestamp).toLocaleString();
      const summary = `${result.app}: ${result.sender} → ${result.receiver}`;
      
      yPosition = addWrappedText(`${index + 1}. ${timestamp}`, 20, yPosition, pageWidth - 40);
      yPosition = addWrappedText(`   ${summary}`, 25, yPosition, pageWidth - 45);
      yPosition += 5;
    });
  }

  // Raw JSON section
  if (data.options.includeRawJson) {
    checkNewPage(50);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Raw Data (JSON)', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(8);
    doc.setFont('courier', 'normal');
    
    data.selectedResults.forEach((result, index) => {
      checkNewPage(30);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(`Item ${index + 1}:`, 20, yPosition);
      yPosition += 8;
      
      doc.setFontSize(8);
      doc.setFont('courier', 'normal');
      const jsonText = JSON.stringify(result, null, 2);
      yPosition = addWrappedText(jsonText, 20, yPosition, pageWidth - 40);
      yPosition += 10;
    });
  }

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `Page ${i} of ${totalPages} - EOFDR Copilot Forensic Report`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  const fileName = `forensic-report-${data.queryId}-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
