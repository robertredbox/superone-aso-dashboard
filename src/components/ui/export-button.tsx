import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PDFExportService } from '@/lib/pdf-export';
import { FileText, Download, Loader2 } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExportButtonProps<T> {
  // The data to export
  data: T[];
  
  // Title for the export (will appear in the PDF)
  title: string;
  
  // Optional subtitle for the export
  subtitle?: string;
  
  // Optional filename (without extension)
  filename?: string;
  
  // Data type to apply specific formatting
  dataType?: 'keywords' | 'reviews' | 'app' | 'default';
  
  // Optional class name for the button
  className?: string;
  
  // Optional button variant
  variant?: 'default' | 'outline' | 'link' | 'ghost';
  
  // Optional button size
  size?: 'default' | 'sm' | 'lg' | 'icon';
  
  // Optional callback when export is complete
  onExportComplete?: () => void;
}

export default function ExportButton<T extends Record<string, any>>({
  data,
  title,
  subtitle,
  filename = 'superone-export',
  dataType = 'default',
  className = '',
  variant = 'outline',
  size = 'default',
  onExportComplete,
}: ExportButtonProps<T>) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Process data based on type
      let processedData;
      switch (dataType) {
        case 'keywords':
          processedData = PDFExportService.formatKeywordData(data);
          break;
        case 'reviews':
          processedData = PDFExportService.formatReviewData(data);
          break;
        case 'app':
          // This assumes data is a single item wrapped in an array for app details
          processedData = [PDFExportService.formatAppData(data[0])];
          break;
        default:
          processedData = data;
      }
      
      // Export to PDF
      PDFExportService.exportToPDF(processedData, {
        title,
        subtitle,
        filename,
        includeTimestamp: true,
      });
      
      // Call the completion callback if provided
      if (onExportComplete) {
        onExportComplete();
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      {isExporting ? (
        <Button
          disabled
          variant={variant}
          size={size}
          className={className}
        >
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Exporting...
        </Button>
      ) : (
        <Button
          onClick={handleExport}
          variant={variant}
          size={size}
          className={className}
          disabled={data.length === 0}
        >
          <FileText className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      )}
    </>
  );
}