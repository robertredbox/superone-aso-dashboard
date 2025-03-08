import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { InteractiveTimeSeriesChart } from '@/components/charts/InteractiveTimeSeriesChart';

// Sample data for demonstration
const sampleData = [
  { date: '2025-01-01', downloads: 1200, installs: 980, uninstalls: 150 },
  { date: '2025-01-08', downloads: 1350, installs: 1100, uninstalls: 180 },
  { date: '2025-01-15', downloads: 1500, installs: 1250, uninstalls: 200 },
  { date: '2025-01-22', downloads: 1650, installs: 1400, uninstalls: 230 },
  { date: '2025-01-29', downloads: 1800, installs: 1550, uninstalls: 260 },
  { date: '2025-02-05', downloads: 1950, installs: 1700, uninstalls: 290 },
  { date: '2025-02-12', downloads: 2100, installs: 1850, uninstalls: 320 },
  { date: '2025-02-19', downloads: 2250, installs: 2000, uninstalls: 350 },
  { date: '2025-02-26', downloads: 2400, installs: 2150, uninstalls: 380 },
  { date: '2025-03-05', downloads: 2550, installs: 2300, uninstalls: 410 },
];

// Metric options for the chart
const metricOptions = [
  { key: 'downloads', label: 'Downloads' },
  { key: 'installs', label: 'Installs' },
  { key: 'uninstalls', label: 'Uninstalls' },
];

export default function ChartDemo() {
  return (
    <AppLayout title="SuperOne ASO Dashboard - Chart Demo">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl mb-6" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
          Interactive Chart Demo
        </h2>
        
        <p className="mb-6" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
          This page demonstrates the InteractiveTimeSeriesChart component with sample data.
          You can toggle different metrics and change the date range.
        </p>
        
        <div className="mb-8">
          <InteractiveTimeSeriesChart
            data={sampleData}
            title="App Performance Metrics"
            dateRangeOptions={['7d', '30d', '60d', 'All']}
            metricOptions={metricOptions}
            defaultMetrics={['downloads', 'installs']}
          />
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200" 
             style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
          <h3 className="text-lg mb-2 text-blue-800" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
            Component Usage
          </h3>
          <p className="text-blue-800 mb-2">
            The InteractiveTimeSeriesChart component can visualize time-series data with multiple metrics.
            Key features include:
          </p>
          <ul className="list-disc pl-5 text-blue-800">
            <li>Selectable date ranges</li>
            <li>Toggle different metrics on/off</li>
            <li>Responsive design</li>
            <li>Customizable colors and formatting</li>
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}
