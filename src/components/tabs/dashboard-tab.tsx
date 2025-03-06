"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from "recharts";
import { formatNumber, formatPercentage, getRandomDateData } from "@/lib/utils";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Real data from the CSV file
const realDownloads = [
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
  }
];

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
  downloads: realDownloads, // Use real data
  categoryRanking: getRandomDateData(30).map(item => ({ ...item, value: Math.floor(Math.random() * 100) + 1 })),
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
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appData.rating} ★</div>
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
            <div className="text-2xl font-bold">{formatNumber(2207)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              -91.3% from last year
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Position</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#42</div>
            <p className="text-xs text-muted-foreground mt-1">
              In Games category
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(3.2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +0.5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Downloads (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={appData.downloads}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 'dataMax + 10']} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Downloads"
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Category Ranking (YTD)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={appData.categoryRanking}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis reversed domain={[1, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Rank"
                  stroke="#82ca9d" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Keywords</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={appData.topKeywords}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="volume" name="Search Volume" fill="#8884d8" />
                <Bar dataKey="rank" name="Ranking" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={appData.reviews}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="star"
                >
                  {appData.reviews.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}