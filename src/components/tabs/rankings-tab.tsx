"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, AreaChart, Area
} from "recharts";
import { getRandomDateData } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

// Sample date range for when app could have ranked
const historicalDateRange = [
  { date: "2023-07-01" },
  { date: "2023-08-01" },
  { date: "2023-09-01" },
  { date: "2023-10-01" },
  { date: "2023-11-01" },
  { date: "2023-12-01" },
  { date: "2024-01-01" },
  { date: "2024-02-01" },
  { date: "2024-03-01" }
];

// List of countries where app is available
const countriesAvailable = [
  { country: "United States" },
  { country: "United Kingdom" },
  { country: "Canada" },
  { country: "Australia" },
  { country: "Germany" },
  { country: "France" },
  { country: "Spain" },
  { country: "Italy" },
  { country: "Brazil" },
  { country: "Mexico" }
];

export function RankingsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
              Overall App Ranking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              Unranked
            </div>
            <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              App has never ranked in charts
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
              Games Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              Unranked
            </div>
            <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              App has never ranked in this category
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
              Trivia Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              Unranked
            </div>
            <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              App has never ranked in this category
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
              Sports Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              Unranked
            </div>
            <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              App has never ranked in this category
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
              Historical Ranking Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 bg-opacity-80 bg-background">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2 text-center" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
                No Historical Ranking Data
              </h3>
              <p className="text-sm text-muted-foreground text-center" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
                SuperOne has not ranked in the App Store charts since launch. 
                This chart will populate once the app achieves ranking positions.
              </p>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={historicalDateRange}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="date" opacity={0.3} />
                <YAxis reversed domain={[0, 100]} opacity={0.3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
              Category Historical Rankings
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 bg-opacity-80 bg-background">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2 text-center" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
                No Category Ranking Data
              </h3>
              <p className="text-sm text-muted-foreground text-center" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
                SuperOne has not ranked in any App Store category charts.
                This chart will show comparative category performance once rankings are achieved.
              </p>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={historicalDateRange}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="date" opacity={0.3} />
                <YAxis reversed domain={[0, 100]} opacity={0.3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
            Country Rankings Status
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
            SuperOne has not achieved rankings in any country markets.
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
                    Ranking Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {countriesAvailable.map((country, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
                      {country.country}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
                      Has never ranked
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
            App Store Ranking Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
            <p>
              For an app to appear in the App Store charts, it typically needs to meet certain thresholds of:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Download volume relative to other apps in the category</li>
              <li>Engagement metrics and retention</li>
              <li>Rating count and average score</li>
              <li>Recent download velocity and trends</li>
            </ul>
            <p>
              The SuperOne ASO Dashboard will automatically track and display rankings once the app achieves chart positions.
              Consider implementing ASO strategies focused on keyword optimization, ratings/reviews campaigns, and user acquisition to
              improve ranking potential.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}