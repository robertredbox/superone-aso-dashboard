"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, AreaChart, Area
} from "recharts";
import { getRandomDateData } from "@/lib/utils";

// Generate simulated ranking data
const generateRankingData = (startRank: number, variability: number) => {
  return Array.from({ length: 365 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 365 + i);
    
    // Create some variability in the ranking
    const variation = Math.floor(Math.random() * variability) - Math.floor(variability / 2);
    const rank = Math.max(1, startRank + variation);
    
    return {
      date: date.toISOString().split('T')[0],
      rank
    };
  });
};

// Sample data for different categories
const overallRanking = generateRankingData(42, 20);
const gamesRanking = generateRankingData(35, 15);
const triviaRanking = generateRankingData(12, 8);
const sportsRanking = generateRankingData(28, 12);

// Format data for charts by taking every 30th point to avoid overcrowding
const formatChartData = (data: any[], interval: number = 30) => {
  return data.filter((_, i) => i % interval === 0);
};

// Sample data for country rankings
const countryRankings = [
  { country: "United States", rank: 42, change: -3 },
  { country: "United Kingdom", rank: 38, change: +2 },
  { country: "Canada", rank: 45, change: -1 },
  { country: "Australia", rank: 33, change: +5 },
  { country: "Germany", rank: 51, change: -2 },
  { country: "France", rank: 47, change: 0 },
  { country: "Spain", rank: 36, change: +4 },
  { country: "Italy", rank: 49, change: -6 },
  { country: "Brazil", rank: 44, change: +1 },
  { country: "Mexico", rank: 39, change: +3 }
];

export function RankingsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall App Ranking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#42</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">↑3</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Games Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#35</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">↑5</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Trivia Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#12</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">↑2</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sports Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#28</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-red-500">↓4</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Ranking Trend (YTD)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={formatChartData(overallRanking)}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis reversed domain={[1, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="rank" 
                  name="Overall Rank"
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Category Rankings Comparison</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={formatChartData(triviaRanking)}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis reversed domain={[1, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="rank" 
                  name="Trivia Rank"
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="rank" 
                  name="Games Rank"
                  stroke="#82ca9d" 
                  data={formatChartData(gamesRanking)}
                />
                <Line 
                  type="monotone" 
                  dataKey="rank" 
                  name="Sports Rank"
                  stroke="#ffc658" 
                  data={formatChartData(sportsRanking)}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Country-Specific Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Current Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Change (30 days)</th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {countryRankings.map((country, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{country.country}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">#{country.rank}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`${
                        country.change > 0 ? 'text-green-500' : 
                        country.change < 0 ? 'text-red-500' : 
                        'text-gray-500'
                      }`}>
                        {country.change > 0 ? '↑' : country.change < 0 ? '↓' : '–'}
                        {Math.abs(country.change)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
