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
  { month: 'Jan', downloads: 3250 },
  { month: 'Feb', downloads: 3520 },
  { month: 'Mar', downloads: 2980 },
  { month: 'Apr', downloads: 3410 },
  { month: 'May', downloads: 3850 },
  { month: 'Jun', downloads: 2950 },
  { month: 'Jul', downloads: 2560 },
  { month: 'Aug', downloads: 2190 },
  { month: 'Sep', downloads: 2760 },
  { month: 'Oct', downloads: 3090 },
  { month: 'Nov', downloads: 0 }, // Future months
  { month: 'Dec', downloads: 0 }  // Future months
];

// Daily downloads for the last 30 days
const generateDailyDownloads = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // Generate random downloads between 80 and 150
    const downloads = Math.floor(Math.random() * 70) + 80;
    
    data.push({
      date: date.toISOString().split('T')[0],
      downloads
    });
  }
  
  return data;
};

const dailyDownloads = generateDailyDownloads();

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
  { month: 'Jan', installs: 3650, uninstalls: 400 },
  { month: 'Feb', installs: 3920, uninstalls: 450 },
  { month: 'Mar', installs: 3380, uninstalls: 420 },
  { month: 'Apr', installs: 3810, uninstalls: 480 },
  { month: 'May', installs: 4250, uninstalls: 510 },
  { month: 'Jun', installs: 3350, uninstalls: 390 },
  { month: 'Jul', installs: 2960, uninstalls: 360 },
  { month: 'Aug', installs: 2590, uninstalls: 310 },
  { month: 'Sep', installs: 3160, uninstalls: 370 },
  { month: 'Oct', installs: 3490, uninstalls: 415 }
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
            <div className="text-2xl font-bold">103/day</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">↑8.5%</span> from previous period
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
            <div className="text-2xl font-bold">12.4%</div>
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
