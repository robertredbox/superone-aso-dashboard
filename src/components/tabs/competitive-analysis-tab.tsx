"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  Radar, LineChart, Line
} from "recharts";
import { getRandomDateData, getYTDDateRange } from "@/lib/utils";

const dateRange = getYTDDateRange();

// Updated data based on YTD downloads (Jan 1 - Mar 6, 2025)
// with corrected download numbers and competitor data
const competitorData = [
  { name: "SuperOne Fan Battle", id: "1455333818", rating: 4.6, downloads: 2429, visibility: 65, inAppPurchases: 12, retention: 38, engagementScore: 71, updates: 5 },
  { name: "Sports Trivia Star", id: "6444810592", rating: 4.9, downloads: 4150, visibility: 82, inAppPurchases: 8, retention: 44, engagementScore: 83, updates: 7 },
  { name: "MADFUT 24", id: "6446899306", rating: 4.8, downloads: 7580, visibility: 91, inAppPurchases: 22, retention: 56, engagementScore: 88, updates: 9 },
  { name: "Basketball Highlights 2045", id: "1003138996", rating: 4.7, downloads: 1860, visibility: 58, inAppPurchases: 15, retention: 41, engagementScore: 68, updates: 4 },
  { name: "Astonishing Basketball Manager", id: "1589313811", rating: 4.7, downloads: 3120, visibility: 73, inAppPurchases: 18, retention: 48, engagementScore: 75, updates: 6 }
];

const appRatings = competitorData.map(app => ({
  name: app.name.length > 15 ? app.name.substring(0, 15) + '...' : app.name,
  rating: app.rating
}));

const appDownloads = competitorData.map(app => ({
  name: app.name.length > 15 ? app.name.substring(0, 15) + '...' : app.name,
  downloads: app.downloads
}));

const keywordOverlap = [
  { name: "Sports Trivia Star", shared: 12, uniqueToSuperOne: 8, uniqueToCompetitor: 15 },
  { name: "MADFUT 24", shared: 5, uniqueToSuperOne: 15, uniqueToCompetitor: 23 },
  { name: "Soctics League Multiplayer", shared: 7, uniqueToSuperOne: 13, uniqueToCompetitor: 19 },
  { name: "Ultimate Clash Soccer", shared: 6, uniqueToSuperOne: 14, uniqueToCompetitor: 16 }
];

const appMetrics = [
  { subject: 'Visibility', SuperOne: 65, "Sports Trivia Star": 82, "MADFUT 24": 91 },
  { subject: 'In-App Purchases', SuperOne: 12, "Sports Trivia Star": 8, "MADFUT 24": 22 },
  { subject: 'Retention', SuperOne: 38, "Sports Trivia Star": 44, "MADFUT 24": 56 },
  { subject: 'Engagement', SuperOne: 71, "Sports Trivia Star": 83, "MADFUT 24": 88 },
  { subject: 'Update Frequency', SuperOne: 5, "Sports Trivia Star": 7, "MADFUT 24": 9 }
];

const rankingTrends = [
  { month: 'Jan', SuperOne: 85, "Sports Trivia Star": 62, "MADFUT 24": 45 },
  { month: 'Feb', SuperOne: 78, "Sports Trivia Star": 59, "MADFUT 24": 41 },
  { month: 'Mar', SuperOne: 72, "Sports Trivia Star": 57, "MADFUT 24": 39 },
  { month: 'Apr', SuperOne: 65, "Sports Trivia Star": 55, "MADFUT 24": 32 },
  { month: 'May', SuperOne: 68, "Sports Trivia Star": 58, "MADFUT 24": 35 },
  { month: 'Jun', SuperOne: 62, "Sports Trivia Star": 51, "MADFUT 24": 31 },
  { month: 'Jul', SuperOne: 55, "Sports Trivia Star": 49, "MADFUT 24": 28 },
  { month: 'Aug', SuperOne: 48, "Sports Trivia Star": 47, "MADFUT 24": 25 },
  { month: 'Sep', SuperOne: 42, "Sports Trivia Star": 45, "MADFUT 24": 22 },
  { month: 'Oct', SuperOne: 45, "Sports Trivia Star": 44, "MADFUT 24": 20 },
  { month: 'Nov', SuperOne: 42, "Sports Trivia Star": 42, "MADFUT 24": 18 },
  { month: 'Dec', SuperOne: 40, "Sports Trivia Star": 40, "MADFUT 24": 15 }
];

export function CompetitiveAnalysisTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Competitive Landscape - {dateRange.territory}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">App Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">App ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Est. Downloads (YTD)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Visibility Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Engagement Score</th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {competitorData.map((app, index) => (
                  <tr key={index} className={app.name === "SuperOne Fan Battle" ? "bg-primary/10" : ""}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{app.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{app.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{app.rating}★</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{app.downloads.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${app.visibility}%` }}></div>
                      </div>
                      <span className="text-xs mt-1 block">{app.visibility}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${app.engagementScore}%` }}></div>
                      </div>
                      <span className="text-xs mt-1 block">{app.engagementScore}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>App Ratings Comparison</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={appRatings}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[4, 5]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="rating" name="App Store Rating" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Estimated Downloads (YTD: {dateRange.formattedStart} - {dateRange.formattedEnd})</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={appDownloads}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="downloads" name="Downloads" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={90} width={730} height={250} data={appMetrics}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="SuperOne" dataKey="SuperOne" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Sports Trivia Star" dataKey="Sports Trivia Star" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Radar name="MADFUT 24" dataKey="MADFUT 24" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Category Ranking Trends - {dateRange.territory}</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={rankingTrends}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis reversed domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="SuperOne" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Sports Trivia Star" stroke="#82ca9d" />
                <Line type="monotone" dataKey="MADFUT 24" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Keyword Overlap Analysis</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={keywordOverlap}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="shared" name="Shared Keywords" stackId="a" fill="#8884d8" />
                <Bar dataKey="uniqueToSuperOne" name="Unique to SuperOne" stackId="a" fill="#82ca9d" />
                <Bar dataKey="uniqueToCompetitor" name="Unique to Competitor" stackId="a" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}