"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, BarChart, Bar, 
  PieChart, Pie, Cell
} from "recharts";
import { formatNumber, getRandomDateData } from "@/lib/utils";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Generate monthly download data
const monthlyDownloads = [
  { month: 'Jan', downloads: 1039 },
  { month: 'Feb', downloads: 1034 },
  { month: 'Mar', downloads: 134 },
  { month: 'Apr', downloads: 0 },
  { month: 'May', downloads: 0 },
  { month: 'Jun', downloads: 0 },
  { month: 'Jul', downloads: 0 },
  { month: 'Aug', downloads: 0 },
  { month: 'Sep', downloads: 0 },
  { month: 'Oct', downloads: 0 },
  { month: 'Nov', downloads: 0 },
  { month: 'Dec', downloads: 0 }
];

// Daily downloads for the last 30 days - Real data from CSV
const dailyDownloads = [
  {
    "date": "2/4/25",
    "downloads": 68
  },
  {
    "date": "2/5/25",
    "downloads": 53
  },
  {
    "date": "2/6/25",
    "downloads": 48
  },
  {
    "date": "2/7/25",
    "downloads": 38
  },
  {
    "date": "2/8/25",
    "downloads": 41
  },
  {
    "date": "2/9/25",
    "downloads": 43
  },
  {
    "date": "2/10/25",
    "downloads": 51
  },
  {
    "date": "2/11/25",
    "downloads": 35
  },
  {
    "date": "2/12/25",
    "downloads": 29
  },
  {
    "date": "2/13/25",
    "downloads": 40
  },
  {
    "date": "2/14/25",
    "downloads": 33
  },
  {
    "date": "2/15/25",
    "downloads": 40
  },
  {
    "date": "2/16/25",
    "downloads": 26
  },
  {
    "date": "2/17/25",
    "downloads": 27
  },
  {
    "date": "2/18/25",
    "downloads": 26
  },
  {
    "date": "2/19/25",
    "downloads": 19
  },
  {
    "date": "2/20/25",
    "downloads": 22
  },
  {
    "date": "2/21/25",
    "downloads": 29
  },
  {
    "date": "2/22/25",
    "downloads": 29
  },
  {
    "date": "2/23/25",
    "downloads": 20
  },
  {
    "date": "2/24/25",
    "downloads": 26
  },
  {
    "date": "2/25/25",
    "downloads": 14
  },
  {
    "date": "2/26/25",
    "downloads": 22
  },
  {
    "date": "2/27/25",
    "downloads": 14
  },
  {
    "date": "2/28/25",
    "downloads": 18
  },
  {
    "date": "3/1/25",
    "downloads": 17
  },
  {
    "date": "3/2/25",
    "downloads": 31
  },
  {
    "date": "3/3/25",
    "downloads": 33
  },
  {
    "date": "3/4/25",
    "downloads": 25
  },
  {
    "date": "3/5/25",
    "downloads": 28
  }
];

// Download sources data
const downloadSources = [
  { name: 'Search', value: 65 },
  { name: 'Browse', value: 15 },
  { name: 'Referral', value: 10 },
  { name: 'Web to App', value: 5 },
  { name: 'Other', value: 5 }
];

// Download by country data
const downloadsByCountry = [
  { country: 'United States', downloads: 11250 },
  { country: 'United Kingdom', downloads: 4520 },
  { country: 'Canada', downloads: 3650 },
  { country: 'Australia', downloads: 2970 },
  { country: 'Germany', downloads: 1850 },
  { country: 'Other', downloads: 4220 }
];

// Install and uninstall data
const retentionData = [
  { month: 'Jan', installs: 1139, uninstalls: 100 },
  { month: 'Feb', installs: 1134, uninstalls: 100 },
  { month: 'Mar', installs: 155, uninstalls: 21 },
  { month: 'Apr', installs: 0, uninstalls: 0 },
  { month: 'May', installs: 0, uninstalls: 0 },
  { month: 'Jun', installs: 0, uninstalls: 0 },
  { month: 'Jul', installs: 0, uninstalls: 0 },
  { month: 'Aug', installs: 0, uninstalls: 0 },
  { month: 'Sep', installs: 0, uninstalls: 0 },
  { month: 'Oct', installs: 0, uninstalls: 0 }
];

export function DownloadsTab() {
  // Calculate total YTD downloads
  const totalDownloads = monthlyDownloads.reduce((sum, month) => sum + month.downloads, 0);
  
  // Calculate YOY growth
  const lastYearDownloads = 25430; // This would normally come from historical data
  const yoyGrowth = ((totalDownloads - lastYearDownloads) / lastYearDownloads) * 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads (YTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalDownloads)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className={yoyGrowth >= 0 ? 'text-green-500' : 'text-red-500'}>
                {yoyGrowth >= 0 ? '↑' : '↓'}{Math.abs(yoyGrowth).toFixed(1)}%
              </span> from last year
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">30-Day Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32/day</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-red-500">↓22.5%</span> from previous period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">↑0.5%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Uninstall Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10.0%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-red-500">↑1.2%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Downloads (YTD)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyDownloads}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="downloads" name="Downloads" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Daily Downloads (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={dailyDownloads}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 'dataMax + 20']} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="downloads" 
                  name="Daily Downloads"
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Download Sources</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={downloadSources}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {downloadSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Downloads by Country</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={downloadsByCountry}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="country" width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="downloads" name="Downloads" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Installs vs Uninstalls</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={retentionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="installs" name="Installs" fill="#82ca9d" />
                <Bar dataKey="uninstalls" name="Uninstalls" fill="#f87171" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}