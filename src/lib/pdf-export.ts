import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';

// Extend the jsPDF type to include autoTable and additional internal properties
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    internal: {
      events: any;
      scaleFactor: number;
      pageSize: {
        width: number;
        height: number;
        getWidth: () => number;
        getHeight: () => number;
      };
      pages: number[];
      getEncryptor(objectId: number): (data: string) => string;
      getNumberOfPages: () => number;
    };
  }
}

interface PDFExportOptions {
  title: string;
  filename?: string;
  subtitle?: string;
  orientation?: 'portrait' | 'landscape';
  includeTimestamp?: boolean;
}

export class PDFExportService {
  /**
   * Export data to PDF with customizable options
   */
  static exportToPDF<T extends Record<string, any>>(
    data: T[],
    options: PDFExportOptions
  ): void {
    // Default options
    const {
      title,
      filename = 'superone-export',
      subtitle = '',
      orientation = 'portrait',
      includeTimestamp = true,
    } = options;

    // Initialize PDF with proper orientation
    const doc = new jsPDF({
      orientation,
      unit: 'mm',
      format: 'a4',
    });

    // Set up fonts to match dashboard requirements
    doc.setFont('helvetica', 'bold');
    
    // Add SuperOne logo/header
    this.addHeader(doc);

    // Add title
    doc.setFontSize(18);
    doc.text(title, 14, 30);

    // Add subtitle if provided
    if (subtitle) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(subtitle, 14, 38);
    }

    // Add timestamp if requested
    if (includeTimestamp) {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      doc.text(
        `Generated: ${format(new Date(), 'PPpp')}`,
        orientation === 'portrait' ? 14 : 14,
        orientation === 'portrait' ? 45 : 45
      );
    }

    // Prepare data for table
    if (data.length > 0) {
      // Extract column headers from the first data item
      const tableColumn = Object.keys(data[0]);
      
      // Format column headers to be more readable
      const formattedColumns = tableColumn.map(col => 
        col.replace(/([A-Z])/g, ' $1')
           .replace(/^./, str => str.toUpperCase())
           .trim()
      );
      
      // Convert data to rows
      const tableRows = data.map(item => Object.values(item));

      // Generate table with autoTable plugin
      doc.autoTable({
        head: [formattedColumns],
        body: tableRows,
        startY: 50,
        styles: {
          fontSize: 10,
          cellPadding: 3,
          lineWidth: 0.5,
          lineColor: [0, 0, 0],
        },
        headStyles: {
          fillColor: [66, 66, 66],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240],
        },
        margin: { top: 50 },
      });
    } else {
      // Show a message if no data is available
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('No data available for export', 14, 60);
    }

    // Add page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }

    // Add footer with company info
    this.addFooter(doc);

    // Save the PDF with a formatted filename
    const formattedFilename = `${filename}-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
    doc.save(formattedFilename);
  }

  /**
   * Add a header to the PDF including logo and company name
   */
  private static addHeader(doc: jsPDF): void {
    // Company/app name as text instead of image
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(44, 62, 80); // Dark blue
    doc.text('SuperOne ASO Dashboard', 14, 15);
    
    // Add a horizontal line
    doc.setDrawColor(44, 62, 80);
    doc.setLineWidth(0.5);
    doc.line(14, 20, doc.internal.pageSize.getWidth() - 14, 20);
  }

  /**
   * Add a footer to the PDF
   */
  private static addFooter(doc: jsPDF): void {
    const pageCount = doc.internal.getNumberOfPages();
    
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      // Add a horizontal line
      doc.setDrawColor(44, 62, 80);
      doc.setLineWidth(0.5);
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.line(14, pageHeight - 20, doc.internal.pageSize.getWidth() - 14, pageHeight - 20);
      
      // Add copyright text
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(128, 128, 128);
      doc.text(
        `© ${new Date().getFullYear()} SuperOne - Confidential Data - For internal use only`,
        doc.internal.pageSize.getWidth() / 2,
        pageHeight - 15,
        { align: 'center' }
      );
    }
  }

  /**
   * Format data for specific export types
   */
  static formatKeywordData(keywordData: any[]): any[] {
    return keywordData.map(item => ({
      Keyword: item.keyword,
      Rank: item.rank || 'Not Ranked',
      PreviousRank: item.previousRank || 'N/A',
      Change: this.formatRankChange(item.rank, item.previousRank),
      Volume: item.volume || 0,
      Difficulty: item.difficulty ? `${item.difficulty}%` : 'N/A',
    }));
  }
  
  static formatReviewData(reviewData: any[]): any[] {
    return reviewData.map(review => ({
      Date: format(new Date(review.date), 'PP'),
      Rating: review.rating,
      Title: review.title || 'No Title',
      Content: this.truncateText(review.content, 100),
      Author: review.userName || 'Anonymous',
      Version: review.version || 'Unknown',
    }));
  }
  
  static formatAppData(appData: any): any {
    return {
      AppID: appData.id,
      Name: appData.name,
      Developer: appData.developer || 'Unknown',
      Category: appData.primaryCategory || 'N/A',
      Rating: appData.rating || 'N/A',
      Reviews: appData.reviews || 'N/A',
      Size: appData.size || 'N/A',
      Price: appData.price || 'Free',
      LastUpdated: appData.updatedDate ? format(new Date(appData.updatedDate), 'PP') : 'N/A',
    };
  }
  
  /**
   * Helper methods
   */
  private static formatRankChange(current: number, previous: number): string {
    if (!current || !previous) return 'N/A';
    
    const change = previous - current;
    if (change > 0) return `▲ ${change}`;
    if (change < 0) return `▼ ${Math.abs(change)}`;
    return 'No change';
  }
  
  private static truncateText(text: string, maxLength: number): string {
    if (!text) return 'No content';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  }
}