"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, 
  AreaChart, Area, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar, Scatter,
  ScatterChart, ZAxis, ReferenceLine, Cell
} from "recharts";
import { formatNumber } from "@/lib/utils";

interface KeywordRecommendation {
  keyword: string;
  volume: number;
  difficulty: number;
  potentialRanking: number;
  trafficPotential: number;
  relevanceScore: number;
  competitorUsage: number;
  metrics: {
    relevance: number;
    competition: number;
    potential: number;
    conversion: number;
    difficulty: number;
  };
  origin: string;
}

interface KeywordRecommendationProps {
  recommendations: KeywordRecommendation[];
  timeframe: string;
}

// Sample keyword recommendations data
const keywordRecommendations: KeywordRecommendation[] = [
  {
    keyword: "football fan game",
    volume: 37,
    difficulty: 42,
    potentialRanking: 8,
    trafficPotential: 520,
    relevanceScore: 85,
    competitorUsage: 2,
    metrics: {
      relevance: 85,
      competition: 42,
      potential: 78,
      conversion: 65,
      difficulty: 42
    },
    origin: "competitor analysis"
  },
  {
    keyword: "soccer fantasy game",
    volume: 45,
    difficulty: 55,
    potentialRanking: 12,
    trafficPotential: 480,
    relevanceScore: 80,
    competitorUsage: 3,
    metrics: {
      relevance: 80,
      competition: 55,
      potential: 72,
      conversion: 60,
      difficulty: 55
    },
    origin: "search trends"
  },
  {
    keyword: "football manager mobile",
    volume: 68,
    difficulty: 75,
    potentialRanking: 18,
    trafficPotential: 640,
    relevanceScore: 75,
    competitorUsage: 5,
    metrics: {
      relevance: 75,
      competition: 75,
      potential: 65,
      conversion: 50,
      difficulty: 75
    },
    origin: "app store suggestions"
  },
  {
    keyword: "team manager game",
    volume: 28,
    difficulty: 35,
    potentialRanking: 5,
    trafficPotential: 390,
    relevanceScore: 70,
    competitorUsage: 1,
    metrics: {
      relevance: 70,
      competition: 35,
      potential: 82,
      conversion: 68,
      difficulty: 35
    },
    origin: "user reviews"
  },
  {
    keyword: "football card collection",
    volume: 32,
    difficulty: 48,
    potentialRanking: 10,
    trafficPotential: 410,
    relevanceScore: 78,
    competitorUsage: 2,
    metrics: {
      relevance: 78,
      competition: 48,
      potential: 75,
      conversion: 62,
      difficulty: 48
    },
    origin: "search trends"
  },
  {
    keyword: "football team game",
    volume: 41,
    difficulty: 52,
    potentialRanking: 11,
    trafficPotential: 450,
    relevanceScore: 82,
    competitorUsage: 3,
    metrics: {
      relevance: 82,
      competition: 52,
      potential: 76,
      conversion: 64,
      difficulty: 52
    },
    origin: "competitor analysis"
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
              {entry.value}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Opportunity score calculation
const calculateOpportunityScore = (keyword: KeywordRecommendation): number => {
  // Higher volume, lower difficulty, better potential ranking = better opportunity
  return Math.round(
    (keyword.volume * 0.3) + 
    ((100 - keyword.difficulty) * 0.4) + 
    ((30 - Math.min(30, keyword.potentialRanking)) / 30 * 100 * 0.3)
  );
};

export function KeywordRecommendationComponent({ 
  recommendations = keywordRecommendations, 
  timeframe = "Last 30 days" 
}: KeywordRecommendationProps) {
  // Calculate opportunity scores
  const recommendationsWithScores = recommendations.map(keyword => ({
    ...keyword,
    opportunityScore: calculateOpportunityScore(keyword)
  }));
  
  // Sort by opportunity score
  const sortedRecommendations = [...recommendationsWithScores].sort((a, b) => 
    b.opportunityScore - a.opportunityScore
  );
  
  // Prepare data for radar chart
  const radarData = sortedRecommendations[0].metrics ? 
    Object.entries(sortedRecommendations[0].metrics).map(([key, value]) => ({
      subject: key.charAt(0).toUpperCase() + key.slice(1),
      A: value,
      fullMark: 100
    })) : [];

  // Matrix data for difficulty vs volume chart
  const matrixData = sortedRecommendations.map(keyword => ({
    keyword: keyword.keyword,
    x: keyword.difficulty,  // X-axis: difficulty
    y: keyword.volume,      // Y-axis: volume
    z: keyword.opportunityScore // Z-axis (size): opportunity score
  }));
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
            Keyword Recommendations
          </CardTitle>
          <CardDescription>
            High-potential keywords based on competitor analysis and search trends ({timeframe})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="rounded-md border overflow-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Keyword</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Volume</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Difficulty</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Potential Ranking</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Opportunity Score</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Source</th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-border">
                    {sortedRecommendations.map((keyword, index) => (
                      <tr key={index} className={index < 3 ? "bg-green-50 dark:bg-green-900/10" : ""}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                          {keyword.keyword}
                          {index < 3 && <Badge className="ml-2 bg-green-100 text-green-800">Top Pick</Badge>}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{keyword.volume}/100</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{keyword.difficulty}/100</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">#{keyword.potentialRanking}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {keyword.opportunityScore}/100
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {keyword.origin}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
                    Top Recommendation Analysis
                  </CardTitle>
                  <CardDescription>
                    {sortedRecommendations[0]?.keyword || "No recommendation available"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius={90} data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                        <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                        <Radar
                          name="Metrics"
                          dataKey="A"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.6}
                        />
                        <Tooltip content={<CustomTooltip />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-4 text-sm">
                    <p className="font-medium mb-2" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Why this keyword?</p>
                    <ul className="space-y-1 text-xs">
                      <li>• {sortedRecommendations[0]?.volume || 0} search volume (moderate-high)</li>
                      <li>• {sortedRecommendations[0]?.difficulty || 0}/100 difficulty (relatively low)</li>
                      <li>• Potential ranking of #{sortedRecommendations[0]?.potentialRanking || 0}</li>
                      <li>• Only used by {sortedRecommendations[0]?.competitorUsage || 0} competitors</li>
                      <li>• Discovered through {sortedRecommendations[0]?.origin || "analysis"}</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
              Opportunity Matrix
            </CardTitle>
            <CardDescription>
              Volume vs. Difficulty Analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Difficulty" 
                  domain={[20, 80]}
                  label={{ value: 'Difficulty', position: 'bottom', offset: 0 }}
                  tick={{ fontSize: 12, fontFamily: 'Roboto, sans-serif' }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Volume"
                  domain={[20, 80]}
                  label={{ value: 'Volume', angle: -90, position: 'left' }}
                  tick={{ fontSize: 12, fontFamily: 'Roboto, sans-serif' }}
                />
                <ZAxis 
                  type="number"
                  dataKey="z" 
                  range={[50, 400]}
                  name="Opportunity Score"
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={<CustomTooltip />}
                />
                <Legend wrapperStyle={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px' }} />
                
                {/* Reference lines to create quadrants */}
                <ReferenceLine x={50} stroke="#666" strokeDasharray="3 3" />
                <ReferenceLine y={50} stroke="#666" strokeDasharray="3 3" />
                
                <Scatter 
                  name="Keywords" 
                  data={matrixData} 
                  fill="#8884d8"
                  shape="circle"
                >
                  {matrixData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.z > 70 ? '#00C49F' : entry.z > 50 ? '#FFBB28' : '#FF8042'} 
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
              Expected Traffic Potential
            </CardTitle>
            <CardDescription>
              Projected user acquisition from recommended keywords
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={sortedRecommendations.map((kw, index) => ({
                  name: kw.keyword,
                  value: kw.trafficPotential,
                  cumulative: sortedRecommendations
                    .slice(0, index + 1)
                    .reduce((sum, k) => sum + k.trafficPotential, 0)
                }))}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10, fontFamily: 'Roboto, sans-serif' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
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
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="value" 
                  name="Potential Traffic" 
                  stroke="#8884d8"
                  fill="#8884d8" 
                  fillOpacity={0.3}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="cumulative" 
                  name="Cumulative" 
                  stroke="#ff7300"
                  dot={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
            Implementation Strategy
          </CardTitle>
          <CardDescription>
            Recommended actions for keyword optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted/20 rounded-md">
              <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Immediate Actions:</h3>
              <ul className="space-y-2 text-sm">
                <li><span className="font-medium">1. App Title Optimization:</span> Include "{sortedRecommendations[0]?.keyword || 'top keyword'}" in the app title to improve visibility for this high-opportunity term.</li>
                <li><span className="font-medium">2. Subtitle Enhancement:</span> Add "{sortedRecommendations[1]?.keyword || 'second keyword'}" to the subtitle for additional keyword coverage.</li>
                <li><span className="font-medium">3. Description Update:</span> Naturally incorporate all recommended keywords in the app description, with emphasis on top 3 suggestions.</li>
                <li><span className="font-medium">4. Keyword Field Expansion:</span> Add lower competition terms like "{sortedRecommendations.find(k => k.difficulty < 40)?.keyword || 'low difficulty keyword'}" to the keyword field.</li>
              </ul>
            </div>
            
            <div className="p-4 bg-muted/20 rounded-md">
              <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Monitoring Plan:</h3>
              <ul className="space-y-2 text-sm">
                <li><span className="font-medium">1. Weekly Rank Tracking:</span> Monitor position changes for all implemented keywords.</li>
                <li><span className="font-medium">2. Conversion Analysis:</span> Track which keywords drive not just impressions but actual downloads.</li>
                <li><span className="font-medium">3. Competitive Surveillance:</span> Watch for changes in competitor keyword strategies.</li>
                <li><span className="font-medium">4. Seasonal Adjustment:</span> Prepare to emphasize different keywords based on seasonal trends.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
