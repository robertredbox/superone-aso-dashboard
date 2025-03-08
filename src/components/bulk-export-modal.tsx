import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PDFExportService } from '@/lib/pdf-export';
import { FilePdf, X, Loader2, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface DatasetOption {
  id: string;
  title: string;
  data: any[];
  type: 'keywords' | 'reviews' | 'app' | 'default';
  filename?: string;
  subtitle?: string;
}

interface BulkExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  datasets: DatasetOption[];
}

export default function BulkExportModal({
  open,
  onOpenChange,
  datasets,
}: BulkExportModalProps) {
  const [selectedDatasets, setSelectedDatasets] = useState<Record<string, boolean>>({});
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<Record<string, 'pending' | 'success' | 'error'>>({});
  const [showExportProgress, setShowExportProgress] = useState(false);
  
  // Get count of selected datasets
  const selectedCount = Object.values(selectedDatasets).filter(Boolean).length;

  const handleToggleSelect = (datasetId: string) => {
    setSelectedDatasets(prev => ({
      ...prev,
      [datasetId]: !prev[datasetId]
    }));
  };
  
  const handleSelectAll = () => {
    const allSelected = datasets.every(dataset => selectedDatasets[dataset.id]);
    
    if (allSelected) {
      // If all are selected, deselect all
      setSelectedDatasets({});
    } else {
      // Otherwise, select all
      const newSelected: Record<string, boolean> = {};
      datasets.forEach(dataset => {
        newSelected[dataset.id] = true;
      });
      setSelectedDatasets(newSelected);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    setShowExportProgress(true);
    
    // Initialize export status for all selected datasets
    const newExportStatus: Record<string, 'pending' | 'success' | 'error'> = {};
    datasets.forEach(dataset => {
      if (selectedDatasets[dataset.id]) {
        newExportStatus[dataset.id] = 'pending';
      }
    });
    setExportStatus(newExportStatus);
    
    try {
      // Get selected datasets
      const selectedIds = Object.keys(selectedDatasets).filter(id => selectedDatasets[id]);
      
      // Export each dataset
      for (const id of selectedIds) {
        const dataset = datasets.find(d => d.id === id);
        if (!dataset) continue;
        
        try {
          // Process data based on type
          let processedData;
          switch (dataset.type) {
            case 'keywords':
              processedData = PDFExportService.formatKeywordData(dataset.data);
              break;
            case 'reviews':
              processedData = PDFExportService.formatReviewData(dataset.data);
              break;
            case 'app':
              // This assumes data is a single item wrapped in an array for app details
              processedData = [PDFExportService.formatAppData(dataset.data[0])];
              break;
            default:
              processedData = dataset.data;
          }
          
          // Export to PDF
          PDFExportService.exportToPDF(processedData, {
            title: dataset.title,
            subtitle: dataset.subtitle,
            filename: dataset.filename || `superone-${dataset.type}`,
            includeTimestamp: true,
          });
          
          // Update status to success
          setExportStatus(prev => ({
            ...prev,
            [id]: 'success'
          }));
          
          // Small delay between exports to prevent browser issues
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
          console.error(`Export failed for ${dataset.title}:`, error);
          // Update status to error
          setExportStatus(prev => ({
            ...prev,
            [id]: 'error'
          }));
        }
      }
    } catch (error) {
      console.error('Bulk export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };
  
  const handleClose = () => {
    // Reset state if not exporting
    if (!isExporting) {
      setSelectedDatasets({});
      setExportStatus({});
      setShowExportProgress(false);
    }
    
    // Only allow closing if not currently exporting
    if (!isExporting) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
            Export Dashboard Data
          </DialogTitle>
          <DialogDescription style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
            Select the data you want to export as PDF.
          </DialogDescription>
        </DialogHeader>
        
        {showExportProgress ? (
          <div className="space-y-4 py-4" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
            <h3 className="text-sm font-medium">Export Progress</h3>
            <div className="space-y-2">
              {datasets.filter(d => selectedDatasets[d.id]).map(dataset => (
                <div key={dataset.id} className="flex items-center justify-between">
                  <span>{dataset.title}</span>
                  {exportStatus[dataset.id] === 'pending' && isExporting && (
                    <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                  )}
                  {exportStatus[dataset.id] === 'success' && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                  {exportStatus[dataset.id] === 'error' && (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all"
                checked={datasets.length > 0 && datasets.every(dataset => selectedDatasets[dataset.id])}
                onCheckedChange={handleSelectAll}
              />
              <Label htmlFor="select-all" className="text-sm font-medium">
                Select All
              </Label>
            </div>
            <div className="space-y-2">
              {datasets.map(dataset => (
                <div key={dataset.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`dataset-${dataset.id}`}
                    checked={selectedDatasets[dataset.id] || false}
                    onCheckedChange={() => handleToggleSelect(dataset.id)}
                  />
                  <Label htmlFor={`dataset-${dataset.id}`} className="text-sm">
                    {dataset.title} {dataset.data.length === 0 && "(No data)"}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose} disabled={isExporting}>
            {showExportProgress ? 'Close' : 'Cancel'}
          </Button>
          {!showExportProgress && (
            <Button
              type="button"
              onClick={handleExport}
              disabled={isExporting || selectedCount === 0}
            >
              {isExporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <FilePdf className="mr-2 h-4 w-4" />
                  Export {selectedCount} {selectedCount === 1 ? 'Item' : 'Items'}
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}