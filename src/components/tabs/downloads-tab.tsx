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