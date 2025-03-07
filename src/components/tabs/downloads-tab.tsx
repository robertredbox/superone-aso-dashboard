"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, BarChart, Bar, 
  PieChart, Pie, Cell, AreaChart, Area
} from "recharts";
import { formatNumber, getRandomDateData, getYTDDateRange } from "@/lib/utils";
import { AlertCircle, TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#d884d8', '#d8d884'];
const dateRange = getYTDDateRange();

// Correct daily downloads data matched with dashboard-tab.tsx (changed "value" to "downloads")
const dailyDownloads = [
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

// Calculate accurate monthly downloads based on daily data
const calculateMonthlyDownloads = () => {
  const monthlyTotals = {};
  
  dailyDownloads.forEach(day => {
    const [month] = day.date.split('/');
    
    if (!monthlyTotals[month]) {
      monthlyTotals[month] = 0;
    }
    
    monthlyTotals[month] += day.downloads;
  });
  
  // Convert to the format needed for the chart
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return monthNames.map((month, index) => {
    const monthNumber = (index + 1).toString();
    return {
      month,
      downloads: monthlyTotals[monthNumber] || 0
    };
  });
};

const monthlyDownloads = calculateMonthlyDownloads();

// Weekly download trends (last 6 weeks)
const calculateWeeklyTrends = () => {
  const weeklyData = [];
  const totalWeeks = 6;
  const daysPerWeek = 7;
  
  for (let i = 0; i < totalWeeks; i++) {
    const startIndex = dailyDownloads.length - ((i + 1) * daysPerWeek);
    const endIndex = dailyDownloads.length - (i * daysPerWeek);
    
    if (startIndex >= 0) {
      const weekData = dailyDownloads.slice(Math.max(0, startIndex), endIndex);
      const totalDownloads = weekData.reduce((sum, day) => sum + day.downloads, 0);
      const weekNumber = totalWeeks - i;
      
      const startDate = weekData[0]?.date || '';
      const endDate = weekData[weekData.length - 1]?.date || '';
      
      weeklyData.push({
        week: `Week ${weekNumber}`,
        dateRange: `${startDate} - ${endDate}`,
        downloads: totalDownloads,
      });
    }
  }
  
  return weeklyData.reverse();
};

const weeklyTrends = calculateWeeklyTrends();

// Add week-over-week growth to weekly trends
const addWeeklyGrowth = (weeklyData) => {
  return weeklyData.map((week, index) => {
    if (index === 0) {
      return { ...week, growth: 0 };
    }
    
    const previousWeek = weeklyData[index - 1];
    const growth = previousWeek.downloads > 0 
      ? ((week.downloads - previousWeek.downloads) / previousWeek.downloads) * 100 
      : 0;
    
    return {
      ...week,
      growth,
      previousDownloads: previousWeek.downloads
    };
  });
};

const weeklyTrendsWithGrowth = addWeeklyGrowth(weeklyTrends);

// Download sources data (from CSV analysis)
const downloadSources = [
  { name: 'App Store Search', value: 1123, percent: 50.9 },
  { name: 'App Referrer', value: 533, percent: 24.2 },
  { name: 'Web Referrer', value: 331, percent: 15.0 },
  { name: 'App Store Browse', value: 198, percent: 9.0 },
  { name: 'Unavailable', value: 22, percent: 1.0 }
];

// Downloads by country data (top territories from CSV analysis)
const downloadsByCountry = [
  { country: 'Germany', downloads: 474, growth: 12.5 },
  { country: 'Philippines', downloads: 253, growth: -3.2 },
  { country: 'Japan', downloads: 224, growth: 5.7 },
  { country: 'United States', downloads: 148, growth: -1.3 },
  { country: 'Australia', downloads: 144, growth: 8.9 },
  { country: 'Côte d\'Ivoire', downloads: 129, growth: 22.1 },
  { country: 'United Kingdom', downloads: 117, growth: -5.4 },
  { country: 'Norway', downloads: 116, growth: 15.2 },
  { country: 'Austria', downloads: 82, growth: 4.3 },
  { country: 'Benin', downloads: 77, growth: 18.6 }
];

// Install and uninstall data - YTD 2025
const calculateRetentionData = () => {
  // Group installs by month
  const monthlyInstalls = {};
  
  dailyDownloads.forEach(day => {
    const [month] = day.date.split('/');
    
    if (!monthlyInstalls[month]) {
      monthlyInstalls[month] = 0;
    }
    
    monthlyInstalls[month] += day.downloads;
  });
  
  // Assume 10% uninstall rate (we would use actual data in a real app)
  const uninstallRate = 0.10;
  
  // Convert to the format needed for the chart
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return monthNames.map((month, index) => {
    const monthNumber = (index + 1).toString();
    const installs = monthlyInstalls[monthNumber] || 0;
    const uninstalls = Math.round(installs * uninstallRate);
    const retention = Math.round((installs - uninstalls) / installs * 100);
    
    return {
      month,
      installs,
      uninstalls,
      retention: installs > 0 ? retention : 0
    };
  });
};

const retentionData = calculateRetentionData();

// Acquisition cost data (estimated based on industry benchmarks)
const acquisitionCostData = [
  { source: 'Organic', cost: 0, installs: 1542, cpi: 0 },
  { source: 'Paid Social', cost: 850, installs: 426, cpi: 2.00 },
  { source: 'Search Ads', cost: 620, installs: 186, cpi: 3.33 },
  { source: 'Other', cost: 105, installs: 53, cpi: 1.98 }
];

// Format date for cleaner display
const formatDayMonth = (dateStr) => {
  try {
    const [month, day] = dateStr.split('/');
    return `${month}/${day}`;
  } catch (error) {
    return dateStr;
  }
};

// Calculate 7-day moving average
const calculate7DayAverage = (data) => {
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
};

const dailyDownloadsWithAverage = calculate7DayAverage(dailyDownloads);

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

  // Calculate weighted average CPI
  const totalPaidCost = acquisitionCostData.reduce((sum, item) => sum + item.cost, 0);
  const totalPaidInstalls = acquisitionCostData
    .filter(item => item.source !== 'Organic')
    .reduce((sum, item) => sum + item.installs, 0);
  const avgCpi = totalPaidInstalls > 0 ? (totalPaidCost / totalPaidInstalls).toFixed(2) : 0;

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