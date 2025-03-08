import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * Interactive Time Series Chart Component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.data - The chart data
 * @param {string} props.title - Chart title
 * @param {Array} props.dateRangeOptions - Array of date range options (e.g., ['7d', '30d', '90d', 'All'])
 * @param {Array} props.metricOptions - Array of metric options with { key, label } format
 * @param {string} props.defaultDateRange - Default selected date range
 * @param {Array} props.defaultMetrics - Default selected metrics
 */
export const InteractiveTimeSeriesChart = ({ 
  data, 
  title, 
  dateRangeOptions = ['7d', '30d', '90d', 'All'], 
  metricOptions = [], 
  defaultDateRange = '30d',
  defaultMetrics = []
}) => {
  const [selectedDateRange, setSelectedDateRange] = useState(defaultDateRange);
  const [selectedMetrics, setSelectedMetrics] = useState(defaultMetrics);
  
  // Filter data based on selected date range
  const filteredData = React.useMemo(() => {
    if (!data || !data.length) return [];
    
    if (selectedDateRange === 'All') {
      return data;
    }
    
    const daysToFilter = parseInt(selectedDateRange, 10);
    if (isNaN(daysToFilter)) return data;
    
    const now = new Date();
    const cutoffDate = new Date(now.setDate(now.getDate() - daysToFilter));
    
    return data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= cutoffDate;
    });
  }, [data, selectedDateRange]);

  // Generate colors for each metric
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];
  
  return (
    <div className="chart-container">
      <h2 style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>{title}</h2>
      
      {/* Controls */}
      <div className="chart-controls" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
        <div className="date-range-selector">
          {dateRangeOptions.map(range => (
            <button 
              key={range}
              onClick={() => setSelectedDateRange(range)}
              className={selectedDateRange === range ? 'active' : ''}
            >
              {range}
            </button>
          ))}
        </div>
        
        {metricOptions.length > 0 && (
          <div className="metric-selector">
            {metricOptions.map((metric, index) => (
              <label key={metric.key} style={{ color: COLORS[index % COLORS.length] }}>
                <input
                  type="checkbox"
                  checked={selectedMetrics.includes(metric.key)}
                  onChange={() => {
                    if (selectedMetrics.includes(metric.key)) {
                      setSelectedMetrics(selectedMetrics.filter(m => m !== metric.key));
                    } else {
                      setSelectedMetrics([...selectedMetrics, metric.key]);
                    }
                  }}
                />
                {metric.label}
              </label>
            ))}
          </div>
        )}
      </div>
      
      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedMetrics.map((metricKey, index) => (
            <Line
              key={metricKey}
              type="monotone"
              dataKey={metricKey}
              stroke={COLORS[index % COLORS.length]}
              activeDot={{ r: 8 }}
              name={metricOptions.find(m => m.key === metricKey)?.label || metricKey}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      
      <style jsx>{`
        .chart-container {
          background: white;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }
        
        .chart-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 16px;
        }
        
        .date-range-selector {
          display: flex;
          gap: 8px;
        }
        
        .date-range-selector button {
          padding: 6px 12px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 4px;
          cursor: pointer;
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
        }
        
        .date-range-selector button.active {
          background: #2196f3;
          color: white;
          border-color: #2196f3;
        }
        
        .metric-selector {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        .metric-selector label {
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default InteractiveTimeSeriesChart;
