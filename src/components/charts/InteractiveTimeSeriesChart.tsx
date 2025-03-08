import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MetricOption {
  key: string;
  label: string;
}

interface InteractiveTimeSeriesChartProps {
  data: any[];
  title: string;
  dateRangeOptions?: string[];
  metricOptions?: MetricOption[];
  defaultDateRange?: string;
  defaultMetrics?: string[];
}

export const InteractiveTimeSeriesChart: React.FC<InteractiveTimeSeriesChartProps> = ({ 
  data, 
  title, 
  dateRangeOptions = ['7d', '30d', '90d', 'All'], 
  metricOptions = [], 
  defaultDateRange = '30d',
  defaultMetrics = []
}) => {
  const [selectedDateRange, setSelectedDateRange] = useState(defaultDateRange);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(defaultMetrics);
  
  // Filter data based on selected date range
  const filteredData = React.useMemo(() => {
    if (!data || selectedDateRange === 'All') {
      return data;
    }
    
    // Extract the number of days
    const days = parseInt(selectedDateRange.replace('d', ''));
    if (isNaN(days)) return data;
    
    // Calculate the cut-off date
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= cutoffDate;
    });
  }, [data, selectedDateRange]);

  // Generate colors for each metric
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];
  
  if (!data || data.length === 0) {
    return (
      <div className="chart-container p-4 border rounded-lg">
        <h2 className="text-xl mb-4" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>{title}</h2>
        <div className="text-center py-8" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>No data available</div>
      </div>
    );
  }
  
  return (
    <div className="chart-container p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl mb-4" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>{title}</h2>
      
      {/* Controls */}
      <div className="chart-controls flex flex-wrap justify-between mb-4" 
           style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
        <div className="date-range-selector flex space-x-2 mb-2">
          {dateRangeOptions.map(range => (
            <button 
              key={range}
              onClick={() => setSelectedDateRange(range)}
              className={`px-3 py-1 rounded text-sm ${selectedDateRange === range 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {range}
            </button>
          ))}
        </div>
        
        {metricOptions.length > 0 && (
          <div className="metric-selector flex flex-wrap gap-3">
            {metricOptions.map((metric, index) => (
              <label 
                key={metric.key} 
                className="flex items-center cursor-pointer"
                style={{ color: selectedMetrics.includes(metric.key) ? COLORS[index % COLORS.length] : 'inherit' }}
              >
                <input
                  type="checkbox"
                  className="mr-1"
                  checked={selectedMetrics.includes(metric.key)}
                  onChange={() => {
                    if (selectedMetrics.includes(metric.key)) {
                      setSelectedMetrics(selectedMetrics.filter(m => m !== metric.key));
                    } else {
                      setSelectedMetrics([...selectedMetrics, metric.key]);
                    }
                  }}
                />
                <span>{metric.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      {/* Chart */}
      <div className="chart-wrapper h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectedMetrics.map((metricKey, index) => {
              const metricOption = metricOptions.find(m => m.key === metricKey);
              return (
                <Line
                  key={metricKey}
                  type="monotone"
                  dataKey={metricKey}
                  stroke={COLORS[index % COLORS.length]}
                  activeDot={{ r: 8 }}
                  name={metricOption?.label || metricKey}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
