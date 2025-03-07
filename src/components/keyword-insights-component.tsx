"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, 
  AreaChart, Area, ComposedChart, Bar
} from "recharts";
import { formatNumber } from "@/lib/utils";

interface KeywordData {
  keyword: string;
  currentRanking: number;
  previousRanking: number;
  rankingChange: number;
  popularity: number;
  difficulty: number;
  rankingHistory: {
    date: string;
    ranking: number;
  }[];
  trafficShare: number;
  conversionRate: number;
  impressions: number;
  trends: {
    date: string;
    impressions: number;
    conversions: number;
  }[];
}

interface KeywordInsightsProps {
  keywords: KeywordData[];
  timeframe: string;
}

// Sample enhanced keyword data with more metrics
const enhancedKeywordData: KeywordData[] = [
  {
    keyword: "super one",
    currentRanking: 2,
    previousRanking: 1,
    rankingChange: -1,
    popularity: 29,
    difficulty: 65,
    rankingHistory: Array(30).fill(0).map((_, index) => {
      let baseRanking = index < 15 ? 1 : 2;
      return {
        date: new Date(2025, 2, index + 1).toISOString().split('T')[0],
        ranking: baseRanking + (Math.random() * 0.5 - 0.25)
      };
    }),
    trafficShare: 24.3,
    conversionRate: 5.2,
    impressions: 3420,
    trends: Array(30).fill(0).map((_, index) => ({
      date: new Date(2025, 2, index + 1).toISOString().split('T')[0],
      impressions: 100 + Math.floor(Math.random() * 50),
      conversions: 5 + Math.floor(Math.random() * 3)
    }))
  },
  {
    keyword: "super fan",
    currentRanking: 10,
    previousRanking: 13,
    rankingChange: 3,
    popularity: 20,
    difficulty: 58,
    rankingHistory: Array(30).fill(0).map((_, index) => {
      const midPoint = index < 15 ? 13 : 10;
      return {
        date: new Date(2025, 2, index + 1).toISOString().split('T')[0],
        ranking: midPoint + (Math.random() * 2 - 1)
      };
    }),
    trafficShare: 18.5,
    conversionRate: 4.8,
    impressions: 2560,
    trends: Array(30).fill(0).map((_, index) => ({
      date: new Date(2025, 2, index + 1).toISOString().split('T')[0],
      impressions: 80 + Math.floor(Math.random() * 40),
      conversions: 3 + Math.floor(Math.random() * 3)
    }))
  },
  {
    keyword: "madfut 25",
    currentRanking: 37,
    previousRanking: 38,
    rankingChange: 1,
    popularity: 38,
    difficulty: 72,
    rankingHistory: Array(30).fill(0).map((_, index) => {
      const trendRanking = 38 - (index / 30);
      return {
        date: new Date(2025, 2, index + 1).toISOString().split('T')[0],
        ranking: trendRanking + (Math.random() * 3 - 1.5)
      };
    }),
    trafficShare: 14.2,
    conversionRate: 3.5,
    impressions: 1980,
    trends: Array(30).fill(0).map((_, index) => ({
      date: new Date(2025, 2, index + 1).toISOString().split('T')[0],
      impressions: 65 + Math.floor(Math.random() * 30),
      conversions: 2 + Math.floor(Math.random() * 2)
    }))
  }
];

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
        <p style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }} className="text-sm mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p 
            key={`tooltip-entry-${index}`}
            style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}
            className="text-xs"
          >
            {entry.name}: <span className="font-medium" style={{ color: entry.color }}>
              {entry.name === 'Ranking' ? `#${entry.value}` : formatNumber(entry.value)}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Status badge component
const StatusBadge = ({ change }: { change: number }) => {
  if (change > 0) {
    return <Badge className="bg-green-100 text-green-800">↑ {change}</Badge>;
  } else if (change < 0) {
    return <Badge className="bg-red-100 text-red-800">↓ {Math.abs(change)}</Badge>;
  } else {
    return <Badge className="bg-gray-100 text-gray-800">No change</Badge>;
  }
};

export function KeywordInsightsComponent({ keywords = enhancedKeywordData, timeframe = "Last 30 days" }: KeywordInsightsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
            Keyword Performance Insights
          </CardTitle>
          <CardDescription>
            Advanced metrics for top-performing keywords ({timeframe})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keywords.map((keyword, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
                      "{keyword.keyword}"
                    </CardTitle>
                    <StatusBadge change={keyword.rankingChange} />
                  </div>
                  <CardDescription>
                    Current Rank: #{keyword.currentRanking} • Popularity: {keyword.popularity}/100
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={keyword.rankingHistory}
                        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                      >
                        <XAxis 
                          dataKey="date" 
                          tick={false}
                          axisLine={false}
                        />
                        <YAxis 
                          reversed
                          domain={['dataMin - 5', 'dataMax + 5']}
                          tick={false}
                          axisLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="ranking"
                          name="Ranking"
                          stroke="#8884d8"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Traffic Share</p>
                      <p className="text-lg font-bold">{keyword.trafficShare}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Conversion Rate</p>
                      <p className="text-lg font-bold">{keyword.conversionRate}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Impressions</p>
                      <p className="text-lg font-bold">{formatNumber(keyword.impressions)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Difficulty</p>
                      <p className="text-lg font-bold">{keyword.difficulty}/100</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
              Keyword Ranking Trends
            </CardTitle>
            <CardDescription>
              Performance comparison over time
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date"
                  type="category"
                  allowDuplicatedCategory={false}
                  tick={{ fontSize: 12, fontFamily: 'Roboto, sans-serif' }}
                />
                <YAxis 
                  reversed 
                  domain={[1, 40]}
                  tick={{ fontSize: 12, fontFamily: 'Roboto, sans-serif' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px' }} />
                {keywords.map((keyword, index) => (
                  <Line 
                    key={index}
                    data={keyword.rankingHistory}
                    type="monotone" 
                    dataKey="ranking" 
                    name={keyword.keyword}
                    stroke={['#8884d8', '#82ca9d', '#ffc658'][index % 3]}
                    strokeWidth={2}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
              Impressions vs Conversion Rate
            </CardTitle>
            <CardDescription>
              Efficiency analysis by keyword
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={keywords}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="keyword"
                  type="category"
                  allowDuplicatedCategory={false}
                  tick={{ fontSize: 12, fontFamily: 'Roboto, sans-serif' }}
                />
                <YAxis 
                  yAxisId="left"
                  orientation="left"
                  tick={{ fontSize: 12, fontFamily: 'Roboto, sans-serif' }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 12, fontFamily: 'Roboto, sans-serif' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px' }} />
                <Bar 
                  yAxisId="left" 
                  dataKey="impressions" 
                  name="Impressions" 
                  fill="#8884d8" 
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="conversionRate" 
                  name="Conversion Rate (%)" 
                  stroke="#ff7300"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}