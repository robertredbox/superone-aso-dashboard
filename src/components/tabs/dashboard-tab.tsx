"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, PieChart, Pie, Cell,
  ReferenceLine
} from "recharts";
import { formatNumber, formatPercentage, getRandomDateData, getYTDDateRange } from "@/lib/utils";

// Custom error fallback component (no dependency required)
const ErrorDisplay = ({ message }) => {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-md" role="alert">
      <h2 style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }} className="text-lg text-red-800 mb-2">Data Error</h2>
      <p style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }} className="text-sm text-red-600">
        {message || "There was an error loading the dashboard data. Please try refreshing the page."}
      </p>
    </div>
  );
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const dateRange = getYTDDateRange();

// Data validation function for AppTweak data
const validateAppTweakData = (data, dataType) => {
  if (!data) {
    throw new Error(`Missing ${dataType} data`);
  }
  
  switch (dataType) {
    case 'downloads':
      if (!Array.isArray(data)) {
        throw new Error(`Invalid downloads data structure: expected array`);
      }
      data.forEach((item, index) => {
        if (!item.date || typeof item.value !== 'number') {
          throw new Error(`Invalid download data at index ${index}: missing date or value`);
        }
      });
      break;
    case 'rating':
      if (typeof data !== 'number' || data < 0 || data > 5) {
        throw new Error(`Invalid rating: ${data}`);
      }
      break;
    // Add more validation cases as needed
    default:
      // General validation
      return true;
  }
  return true;
};

// Calculate 7-day moving average
const calculate7DayAverage = (data) => {
  return data.map((item, index, array) => {
    if (index < 3) return { ...item, average: null }; // Not enough prior data
    
    // Calculate average of current day and 6 days before
    const sumPrev7Days = array
      .slice(Math.max(0, index - 6), index + 1)
      .reduce((sum, curr) => sum + curr.value, 0);
    
    const avg = sumPrev7Days / Math.min(7, index + 1);
    
    return {
      ...item,
      average: parseFloat(avg.toFixed(1))
    };
  });
};

// Format date consistently
const formatDate = (dateStr) => {
  try {
    const [month, day, year] = dateStr.split('/');
    return `${month}/${day}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateStr;
  }
};

// Real data from the CSV file - YTD Jan 1st to March 6th, 2025
const realDownloads = [
  {
    "date": "1/1/25",
    "value": 58
  },
  {
    "date": "1/2/25",
    "value": 47
  },
  {
    "date": "1/3/25",
    "value": 49
  },
  {
    "date": "1/4/25",
    "value": 53
  },
  {
    "date": "1/5/25",
    "value": 56
  },
  {
    "date": "1/6/25",
    "value": 42
  },
  {
    "date": "1/7/25",
    "value": 37
  },
  {
    "date": "1/8/25",
    "value": 41
  },
  {
    "date": "1/9/25",
    "value": 38
  },
  {
    "date": "1/10/25",
    "value": 43
  },
  {
    "date": "1/11/25",
    "value": 52
  },
  {
    "date": "1/12/25",
    "value": 49
  },
  {
    "date": "1/13/25",
    "value": 45
  },
  {
    "date": "1/14/25",
    "value": 39
  },
  {
    "date": "1/15/25",
    "value": 33
  },
  {
    "date": "1/16/25",
    "value": 36
  },
  {
    "date": "1/17/25",
    "value": 47
  },
  {
    "date": "1/18/25",
    "value": 51
  },
  {
    "date": "1/19/25",
    "value": 55
  },
  {
    "date": "1/20/25",
    "value": 53
  },
  {
    "date": "1/21/25",
    "value": 48
  },
  {
    "date": "1/22/25",
    "value": 45
  },
  {
    "date": "1/23/25",
    "value": 36
  },
  {
    "date": "1/24/25",
    "value": 31
  },
  {
    "date": "1/25/25",
    "value": 44
  },
  {
    "date": "1/26/25",
    "value": 39
  },
  {
    "date": "1/27/25",
    "value": 35
  },
  {
    "date": "1/28/25",
    "value": 28
  },
  {
    "date": "1/29/25",
    "value": 26
  },
  {
    "date": "1/30/25",
    "value": 31
  },
  {
    "date": "1/31/25",
    "value": 36
  },
  {
    "date": "2/1/25",
    "value": 39
  },
  {
    "date": "2/2/25",
    "value": 42
  },
  {
    "date": "2/3/25",
    "value": 37
  },
  {
    "date": "2/4/25",
    "value": 68
  },
  {
    "date": "2/5/25",
    "value": 53
  },
  {
    "date": "2/6/25",
    "value": 48
  },
  {
    "date": "2/7/25",
    "value": 38
  },
  {
    "date": "2/8/25",
    "value": 41
  },
  {
    "date": "2/9/25",
    "value": 43
  },
  {
    "date": "2/10/25",
    "value": 51
  },
  {
    "date": "2/11/25",
    "value": 35
  },
  {
    "date": "2/12/25",
    "value": 29
  },
  {
    "date": "2/13/25",
    "value": 40
  },
  {
    "date": "2/14/25",
    "value": 33
  },
  {
    "date": "2/15/25",
    "value": 40
  },
  {
    "date": "2/16/25",
    "value": 26
  },
  {
    "date": "2/17/25",
    "value": 27
  },
  {
    "date": "2/18/25",
    "value": 26
  },
  {
    "date": "2/19/25",
    "value": 19
  },
  {
    "date": "2/20/25",
    "value": 22
  },
  {
    "date": "2/21/25",
    "value": 29
  },
  {
    "date": "2/22/25",
    "value": 29
  },
  {
    "date": "2/23/25",
    "value": 20
  },
  {
    "date": "2/24/25",
    "value": 26
  },
  {
    "date": "2/25/25",
    "value": 14
  },
  {
    "date": "2/26/25",
    "value": 22
  },
  {
    "date": "2/27/25",
    "value": 14
  },
  {
    "date": "2/28/25",
    "value": 18
  },
  {
    "date": "3/1/25",
    "value": 17
  },
  {
    "date": "3/2/25",
    "value": 31
  },
  {
    "date": "3/3/25",
    "value": 33
  },
  {
    "date": "3/4/25",
    "value": 25
  },
  {
    "date": "3/5/25",
    "value": 28
  },
  {
    "date": "3/6/25",
    "value": 24
  }
];

// Process the data and add the 7-day moving average
const processedDownloads = calculate7DayAverage(realDownloads).map(item => ({
  ...item,
  formattedDate: formatDate(item.date)
}));

// Calculate total YTD downloads
const totalYtdDownloads = realDownloads.reduce((sum, item) => sum + item.value, 0);

// Find the max value for appropriate Y-axis scaling
const maxDownloadValue = Math.max(...realDownloads.map(item => item.value));
const yAxisDomain = [0, Math.ceil(maxDownloadValue * 1.1)]; // Add 10% padding

// Custom tooltip component with proper font styling
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
        <p style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }} className="text-sm mb-1">{label}</p>
        <p style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }} className="text-xs">
          Downloads: <span className="font-medium">{payload[0].value}</span>
        </p>
        {payload[1] && payload[1].value && (
          <p style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }} className="text-xs">
            7-Day Avg: <span className="font-medium">{payload[1].value}</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

const appData = {
  name: "Super.One Fan Battle",
  appId: 1455333818,
  rating: 4.6,
  currentVersion: "3.88",
  topKeywords: [
    { name: "super one", rank: 2, volume: 29 },
    { name: "super fan", rank: 10, volume: 20 },
    { name: "super 1", rank: 4, volume: 16 },
    { name: "ultamate fan", rank: 13, volume: 9 }
  ],
  competitors: [
    { name: "Sports Trivia Star", id: "6444810592", rating: 4.9 },
    { name: "MADFUT 24", id: "6446899306", rating: 4.8 },
    { name: "Basketball Highlights 2045", id: "1003138996", rating: 4.7 },
    { name: "Astonishing Basketball Manager", id: "1589313811", rating: 4.7 }
  ],
  downloads: processedDownloads, // Use processed data with 7-day average
  conversionRate: getRandomDateData(30).map(item => ({ ...item, value: (Math.random() * 5) + 1 })),
  reviews: [
    { star: 5, count: 20 },
    { star: 4, count: 0 },
    { star: 3, count: 1 },
    { star: 2, count: 1 },
    { star: 1, count: 1 }
  ]
};

export function DashboardTab() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataError, setDataError] = useState(null);

  // Simulate data loading
  useEffect(() => {
    setIsLoading(true);
    // In a real app, this would be an API call to fetch data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  // Add Google Fonts
  useEffect(() => {
    // Check if the fonts are already loaded
    const linkExists = document.querySelector('link[href*="Roboto"]');
    if (!linkExists) {
      const link = document.createElement('link');
      link.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&family=Roboto+Slab:wght@500&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }, []);

  // Validate app data
  useEffect(() => {
    try {
      validateAppTweakData(appData.rating, 'rating');
      validateAppTweakData(appData.downloads, 'downloads');
    } catch (error) {
      console.error("Data validation error:", error);
      setDataError(error);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6 p-4 flex justify-center items-center h-64">
        <p style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>Loading dashboard data...</p>
      </div>
    );
  }

  if (dataError) {
    return <ErrorDisplay message={dataError.message} />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }} className="text-sm font-medium">Current Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }} className="text-2xl font-bold">{appData.rating} ★</div>
            <p style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }} className="text-xs text-muted-foreground mt-1">
              Based on 23 ratings
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }} className="text-sm font-medium">YTD Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }} className="text-2xl font-bold">{formatNumber(totalYtdDownloads)}</div>
            <p style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }} className="text-xs text-muted-foreground mt-1">
              -91.3% from last year
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }} className="text-sm font-medium">Category Position</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }} className="text-2xl font-bold">Unranked</div>
            <p style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }} className="text-xs text-muted-foreground mt-1">
              Not currently ranked in categories
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }} className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }} className="text-2xl font-bold">{formatPercentage(3.2)}</div>
            <p style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }} className="text-xs text-muted-foreground mt-1">
              +0.5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
              Downloads (YTD: {dateRange.formattedStart} - {dateRange.formattedEnd})
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={appData.downloads}
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
                  domain={yAxisDomain}
                  tick={{ fontSize: 12, fontFamily: 'Roboto, sans-serif' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ 
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '12px',
                    paddingTop: '10px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Daily Downloads"
                  stroke="#0088FE" 
                  strokeWidth={2}
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="average" 
                  name="7-Day Average"
                  stroke="#FF8042" 
                  strokeWidth={2}
                  dot={false}
                  connectNulls={true}
                />
                <ReferenceLine y={0} stroke="#CCC" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Top Keywords</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={appData.topKeywords}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis 
                  dataKey="name" 
                  type="category"
                  tick={{ fontSize: 12, fontFamily: 'Roboto, sans-serif' }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="volume" name="Search Volume" fill="#00C49F" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Competitor Ratings</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={appData.competitors}
                margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name"
                  tick={{ fontSize: 12, fontFamily: 'Roboto, sans-serif' }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                />
                <YAxis 
                  domain={[0, 5]}
                  tick={{ fontSize: 12, fontFamily: 'Roboto, sans-serif' }}
                />
                <Tooltip />
                <Bar dataKey="rating" fill="#8884d8" name="Rating">
                  {appData.competitors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Review Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={appData.reviews}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="star"
                  label={({ name, percent }) => `${name}★: ${(percent * 100).toFixed(0)}%`}
                >
                  {appData.reviews.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} reviews`, `${name} stars`]}
                  contentStyle={{ fontFamily: 'Roboto, sans-serif' }}
                />
                <Legend 
                  formatter={(value) => `${value} Stars`}
                  wrapperStyle={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional section for conversion rate trend */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Conversion Rate Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={appData.conversionRate}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fontFamily: 'Roboto, sans-serif' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fontFamily: 'Roboto, sans-serif' }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value) => [`${value.toFixed(2)}%`, 'Conversion Rate']}
                contentStyle={{ fontFamily: 'Roboto, sans-serif' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                name="Conversion Rate"
                stroke="#8884d8" 
                activeDot={{ r: 6 }} 
              />
              <ReferenceLine y={3.0} stroke="#FF8042" strokeDasharray="3 3" label={{ 
                value: "Target (3%)", 
                position: "insideBottomRight",
                style: { fontFamily: 'Roboto, sans-serif', fontSize: '12px' }
              }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}