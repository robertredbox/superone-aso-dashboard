"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer
} from "recharts";
import { formatNumber, formatPercentage, getStatusColorClass } from "@/lib/utils";
import { LINE_CHART_COLORS, BAR_CHART_COLORS } from "@/lib/chart-colors";

// Sample data for demonstration
const sampleData = {
  dailyDownloads: [
    { date: "3/1", value: 150 },
    { date: "3/2", value: 165 },
    { date: "3/3", value: 190 },
    { date: "3/4", value: 210 },
    { date: "3/5", value: 180 },
    { date: "3/6", value: 195 },
    { date: "3/7", value: 220 }
  ],
  keywordPerformance: [
    { keyword: "fan battle", rank: 3, volume: 320 },
    { keyword: "quiz competition", rank: 7, volume: 580 },
    { keyword: "sports trivia", rank: 12, volume: 430 },
    { keyword: "fantasy league", rank: 22, volume: 790 }
  ]
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-primary/10 p-3 shadow rounded">
        <p className="text-xs font-medium">{label}</p>
        <p className="text-xs">
          {`${payload[0].name}: ${formatNumber(payload[0].value)}`}
        </p>
      </div>
    );
  }
  return null;
};

// Example of updating a dashboard component with the new color scheme
export function DashboardSample() {
  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getStatusColorClass(4.6, { good: 4.5, average: 4.0 })}`}>
              4.6 ★
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on 23 ratings
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">YTD Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getStatusColorClass(2180, { good: 3000, average: 2000 })}`}>
              {formatNumber(2180)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-status-bad">-15.3%</span> from last year
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Category Position</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getStatusColorClass(35, { good: 10, average: 30 }, true)}`}>
              #35
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-status-good">+5</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getStatusColorClass(9.64, { good: 10, average: 8 })}`}>
              {formatPercentage(9.64)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-status-good">+0.5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Downloads (March 2025)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={sampleData.dailyDownloads}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12, fontFamily: 'Roboto, sans-serif' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fontFamily: 'Roboto, sans-serif' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Downloads"
                  stroke={LINE_CHART_COLORS[0]} 
                  strokeWidth={2}
                  activeDot={{ r: 6, fill: LINE_CHART_COLORS[0] }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Keyword Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sampleData.keywordPerformance}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis type="number" />
                <YAxis 
                  dataKey="keyword" 
                  type="category"
                  tick={{ fontSize: 12, fontFamily: 'Roboto, sans-serif' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="volume" name="Search Volume" fill={BAR_CHART_COLORS[0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}