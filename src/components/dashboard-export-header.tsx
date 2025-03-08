import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import BulkExportModal from "./bulk-export-modal";
import { Download } from 'lucide-react';

interface DashboardExportHeaderProps {
  datasets: Array<{
    id: string;
    title: string;
    data: any[];
    type: 'keywords' | 'reviews' | 'app' | 'default';
    filename?: string;
    subtitle?: string;
  }>;
}

export default function DashboardExportHeader({ datasets }: DashboardExportHeaderProps) {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  return (
    <div 
      className="flex justify-end mb-4 p-2 bg-slate-50 dark:bg-slate-800 rounded-md shadow-sm"
      style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}
    >
      <Button 
        onClick={() => setIsExportModalOpen(true)}
        variant="outline"
        className="flex items-center"
      >
        <Download className="mr-2 h-4 w-4" />
        Export Dashboard Data
      </Button>
      
      <BulkExportModal
        open={isExportModalOpen}
        onOpenChange={setIsExportModalOpen}
        datasets={datasets}
      />
    </div>
  );
}