"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, AreaChart, Area
} from "recharts";
import { getRandomDateData } from "@/lib/utils";

// Sample historical data
const historicalRankingData = [
  {
    date: "2023-07-01",
    overallRank: 64,
    gamesRank: 53,
    triviaRank: 22,
    sportsRank: 41
  },
  {
    date: "2023-08-01",
    overallRank: 58,
    gamesRank: 48,
    triviaRank: 19,
    sportsRank: 37
  },
  {
    date: "2023-09-01",
    overallRank: 52,
    gamesRank: 42,
    triviaRank: 15,
    sportsRank: 33
  },
  {
    date: "2023-10-01",
    overallRank: 48,
    gamesRank: 39,
    triviaRank: 13,
    sportsRank: 31
  },
  {
    date: "2023-11-01",
    overallRank: 45,
    gamesRank: 37,
    triviaRank: 12,
    sportsRank: 29
  },
  {
    date: "2023-12-01",
    overallRank: 43,
    gamesRank: 35,
    triviaRank: 12,
    sportsRank: 28
  },
  {
    date: "2024-01-01",
    overallRank: 42,
    gamesRank: 35,
    triviaRank: 12,
    sportsRank: 28
  },
  {
    date: "2024-02-01",
    overallRank: 0,
    gamesRank: 0,
    triviaRank: 0,
    sportsRank: 0
  },
  {
    date: "2024-03-01",
    overallRank: 0,
    gamesRank: 0,
    triviaRank: 0,
    sportsRank: 0
  }
];

// Sample historical country rankings
const countryHistoricalRankings = [
  { country: "United States", lastRanked: "January 2024", lastRank: 42 },
  { country: "United Kingdom", lastRanked: "January 2024", lastRank: 38 },
  { country: "Canada", lastRanked: "January 2024", lastRank: 45 },
  { country: "Australia", lastRanked: "January 2024", lastRank: 33 },
  { country: "Germany", lastRanked: "January 2024", lastRank: 51 },
  { country: "France", lastRanked: "January 2024", lastRank: 47 },
  { country: "Spain", lastRanked: "January 2024", lastRank: 36 },
  { country: "Italy", lastRanked: "January 2024", lastRank: 49 },
  { country: "Brazil", lastRanked: "January 2024", lastRank: 44 },
  { country: "Mexico", lastRanked: "January 2024", lastRank: 39 }
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
            <div className="text-2xl font-bold">Unranked</div>
            <p className="text-xs text-muted-foreground mt-1">
              Not currently in rankings
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Games Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Unranked</div>
            <p className="text-xs text-muted-foreground mt-1">
              Not currently in rankings
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Trivia Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Unranked</div>
            <p className="text-xs text-muted-foreground mt-1">
              Not currently in rankings
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sports Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Unranked</div>
            <p className="text-xs text-muted-foreground mt-1">
              Not currently in rankings
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Historical Ranking Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={historicalRankingData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis reversed domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="overallRank" 
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
            <CardTitle>Category Historical Rankings</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={historicalRankingData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis reversed domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="triviaRank" 
                  name="Trivia Rank"
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="gamesRank" 
                  name="Games Rank"
                  stroke="#82ca9d" 
                />
                <Line 
                  type="monotone" 
                  dataKey="sportsRank" 
                  name="Sports Rank"
                  stroke="#ffc658" 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Most Recent Country Rankings Data</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Note: App is currently unranked in all countries. Below shows last known rankings.
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Ranked</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Known Rank</th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {countryHistoricalRankings.map((country, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{country.country}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{country.lastRanked}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">#{country.lastRank}</td>
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