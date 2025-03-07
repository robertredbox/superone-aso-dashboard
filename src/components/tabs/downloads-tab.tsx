"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, BarChart, Bar, 
  PieChart, Pie, Cell, AreaChart, Area,
  ReferenceLine
} from "recharts";
import { formatNumber, getRandomDateData, getYTDDateRange } from "@/lib/utils";
import { AlertCircle, TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#d884d8', '#d8d884'];
const dateRange = getYTDDateRange();

// Define data interfaces
interface DownloadDataPoint {
  date: string;
  downloads: number;
  average?: number | null;
  formattedDate?: string;
}

// Correct daily downloads data matched with dashboard-tab.tsx
const dailyDownloads: DownloadDataPoint[] = [
  { "date": "1/1/25", "downloads": 13 },
  { "date": "1/2/25", "downloads": 13 },
  { "date": "1/3/25", "downloads": 10 },
  { "date": "1/4/25", "downloads": 7 },
  { "date": "1/5/25", "downloads": 14 },
  { "date": "1/6/25", "downloads": 11 },
  { "date": "1/7/25", "downloads": 8 },
  { "date": "1/8/25", "downloads": 20 },
  { "date": "1/9/25", "downloads": 15 },
  { "date": "1/10/25", "downloads": 18 },
  { "date": "1/11/25", "downloads": 11 },
  { "date": "1/12/25", "downloads": 18 },
  { "date": "1/13/25", "downloads": 15 },
  { "date": "1/14/25", "downloads": 17 },
  { "date": "1/15/25", "downloads": 22 },
  { "date": "1/16/25", "downloads": 27 },
  { "date": "1/17/25", "downloads": 39 },
  { "date": "1/18/25", "downloads": 40 },
  { "date": "1/19/25", "downloads": 27 },
  { "date": "1/20/25", "downloads": 68 },
  { "date": "1/21/25", "downloads": 62 },
  { "date": "1/22/25", "downloads": 43 },
  { "date": "1/23/25", "downloads": 26 },
  { "date": "1/24/25", "downloads": 27 },
  { "date": "1/25/25", "downloads": 13 },
  { "date": "1/26/25", "downloads": 24 },
  { "date": "1/27/25", "downloads": 41 },
  { "date": "1/28/25", "downloads": 27 },
  { "date": "1/29/25", "downloads": 22 },
  { "date": "1/30/25", "downloads": 176 },
  { "date": "1/31/25", "downloads": 186 },
  { "date": "2/1/25", "downloads": 86 },
  { "date": "2/2/25", "downloads": 67 },
  { "date": "2/3/25", "downloads": 70 },
  { "date": "2/4/25", "downloads": 68 },
  { "date": "2/5/25", "downloads": 53 },
  { "date": "2/6/25", "downloads": 48 },
  { "date": "2/7/25", "downloads": 38 },
  { "date": "2/8/25", "downloads": 41 },
  { "date": "2/9/25", "downloads": 43 },
  { "date": "2/10/25", "downloads": 51 },
  { "date": "2/11/25", "downloads": 35 },
  { "date": "2/12/25", "downloads": 29 },
  { "date": "2/13/25", "downloads": 40 },
  { "date": "2/14/25", "downloads": 33 },
  { "date": "2/15/25", "downloads": 40 },
  { "date": "2/16/25", "downloads": 26 },
  { "date": "2/17/25", "downloads": 27 },
  { "date": "2/18/25", "downloads": 26 },
  { "date": "2/19/25", "downloads": 19 },
  { "date": "2/20/25", "downloads": 22 },
  { "date": "2/21/25", "downloads": 29 },
  { "date": "2/22/25", "downloads": 29 },
  { "date": "2/23/25", "downloads": 20 },
  { "date": "2/24/25", "downloads": 26 },
  { "date": "2/25/25", "downloads": 14 },
  { "date": "2/26/25", "downloads": 22 },
  { "date": "2/27/25", "downloads": 14 },
  { "date": "2/28/25", "downloads": 18 },
  { "date": "3/1/25", "downloads": 17 },
  { "date": "3/2/25", "downloads": 31 },
  { "date": "3/3/25", "downloads": 33 },
  { "date": "3/4/25", "downloads": 25 },
  { "date": "3/5/25", "downloads": 28 }
];

// Format date for cleaner display
const formatDayMonth = (dateStr: string): string => {
  try {
    const [month, day] = dateStr.split('/');
    return `${month}/${day}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateStr;
  }
};

// Calculate 7-day moving average
const calculate7DayAverage = (data: DownloadDataPoint[]): DownloadDataPoint[] => {
  try {
    return data.map((item, index, array) => {
      if (index < 3) return { ...item, average: null };
      
      // Calculate average of current day and 6 days before
      const sumPrev7Days = array
        .slice(Math.max(0, index - 6), index + 1)
        .reduce((sum, curr) => sum + curr.downloads, 0);
      
      const avg = sumPrev7Days / Math.min(7, index + 1);
      
      return {
        ...item,
        average: parseFloat(avg.toFixed(1)),
        formattedDate: formatDayMonth(item.date)
      };
    });
  } catch (error) {
    console.error("Error calculating 7-day average:", error);
    return data.map(item => ({
      ...item,
      average: null,
      formattedDate: formatDayMonth(item.date)
    }));
  }
};

const dailyDownloadsWithAverage = calculate7DayAverage(dailyDownloads);

// Custom tooltip component for charts
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
        <p style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }} className="text-sm mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p 
            key={`tooltip-entry-${index}`}
            style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}
            className="text-xs"
          >
            {entry.name}: <span className="font-medium" style={{ color: entry.color }}>
              {typeof entry.value === 'number' ? 
                (entry.name.includes('Growth') ? `${entry.value.toFixed(1)}%` : formatNumber(entry.value)) 
                : entry.value}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function DownloadsTab() {
  // Calculate total YTD downloads
  const totalDownloads = dailyDownloads.reduce((sum, day) => sum + day.downloads, 0);
  
  // Calculate last year's total (example - in real app would come from historical data)
  const lastYearDownloads = 25430; 
  const yoyGrowth = ((totalDownloads - lastYearDownloads) / lastYearDownloads) * 100;

  // Calculate 30-day average (last 30 days)
  const last30DaysData = dailyDownloads.slice(-30);
  const last30DaysAvg = last30DaysData.reduce((sum, day) => sum + day.downloads, 0) / last30DaysData.length;
  
  // Calculate previous 30-days average for comparison
  const previous30DaysData = dailyDownloads.slice(-60, -30);
  const previous30DaysAvg = previous30DaysData.length > 0 
    ? previous30DaysData.reduce((sum, day) => sum + day.downloads, 0) / previous30DaysData.length 
    : 0;
  
  // Calculate percentage change
  const avgPercentChange = previous30DaysAvg > 0 
    ? ((last30DaysAvg - previous30DaysAvg) / previous30DaysAvg) * 100 
    : 0;

  // Calculate total installs and uninstalls
  const totalInstalls = totalDownloads;
  const totalUninstalls = Math.round(totalDownloads * 0.10); // Assuming 10% uninstall rate
  const retentionRate = Math.round((totalInstalls - totalUninstalls) / totalInstalls * 100);

  // Calculate peak download day
  const peakDownloadDay = [...dailyDownloads].sort((a, b) => b.downloads - a.downloads)[0];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
              Total Downloads (YTD)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              {formatNumber(totalDownloads)}
            </div>
            <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              <span className={yoyGrowth >= 0 ? 'text-green-500' : 'text-red-500'}>
                {yoyGrowth >= 0 ? '↑' : '↓'}{Math.abs(yoyGrowth).toFixed(1)}%
              </span> from last year
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
              30-Day Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              {Math.round(last30DaysAvg)}/day
            </div>
            <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              <span className={avgPercentChange >= 0 ? 'text-green-500' : 'text-red-500'}>
                {avgPercentChange >= 0 ? '↑' : '↓'}{Math.abs(avgPercentChange).toFixed(1)}%
              </span> from previous period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
              User Retention Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              {retentionRate}%
            </div>
            <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              {totalUninstalls} uninstalls from {totalInstalls} installs
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
              Peak Download Day
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              {peakDownloadDay.downloads}
            </div>
            <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              on {peakDownloadDay.date} (Jan 31st)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Downloads Chart */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
            Daily Downloads (YTD: {dateRange.formattedStart} - {dateRange.formattedEnd})
          </CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dailyDownloadsWithAverage}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="formattedDate" 
                tick={{ fontSize: 12, fontFamily: 'Roboto, sans-serif' }}
                interval="preserveStartEnd"
                tickCount={6}
              />
              <YAxis 
                tick={{ fontSize: 12, fontFamily: 'Roboto, sans-serif' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', paddingTop: '10px' }} 
              />
              <Line 
                type="monotone" 
                dataKey="downloads" 
                name="Daily Downloads"
                stroke="#0088FE" 
                strokeWidth={2}
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="average" 
                name="7-Day Moving Average"
                stroke="#FF8042" 
                strokeWidth={2}
                dot={false}
                connectNulls={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}