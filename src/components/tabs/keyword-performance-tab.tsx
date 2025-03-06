"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer
} from "recharts";
import { getRandomDateData } from "@/lib/utils";

// Sample data based on the app's keywords we found earlier
const keywordData = [
  { 
    keyword: "super one", 
    volume: 29,
    ranking: 2,
    difficulty: 32,
    history: getRandomDateData(30).map(item => ({ ...item, ranking: Math.floor(Math.random() * 10) + 1 }))
  },
  { 
    keyword: "superfan", 
    volume: 36,
    ranking: 25,
    difficulty: 45,
    history: getRandomDateData(30).map(item => ({ ...item, ranking: Math.floor(Math.random() * 30) + 1 }))
  },
  { 
    keyword: "super fan", 
    volume: 20,
    ranking: 10,
    difficulty: 38,
    history: getRandomDateData(30).map(item => ({ ...item, ranking: Math.floor(Math.random() * 15) + 1 }))
  },
  { 
    keyword: "super 1", 
    volume: 16,
    ranking: 4,
    difficulty: 29,
    history: getRandomDateData(30).map(item => ({ ...item, ranking: Math.floor(Math.random() * 10) + 1 }))
  },
  { 
    keyword: "madfut", 
    volume: 36,
    ranking: 51,
    difficulty: 67,
    history: getRandomDateData(30).map(item => ({ ...item, ranking: Math.floor(Math.random() * 60) + 40 }))
  },
  { 
    keyword: "fc mobile 25", 
    volume: 51,
    ranking: 97,
    difficulty: 78,
    history: getRandomDateData(30).map(item => ({ ...item, ranking: Math.floor(Math.random() * 20) + 85 }))
  },
  { 
    keyword: "soccer quiz", 
    volume: 10,
    ranking: 33,
    difficulty: 52,
    history: getRandomDateData(30).map(item => ({ ...item, ranking: Math.floor(Math.random() * 20) + 25 }))
  },
  { 
    keyword: "taka", 
    volume: 28,
    ranking: 41,
    difficulty: 59,
    history: getRandomDateData(30).map(item => ({ ...item, ranking: Math.floor(Math.random() * 20) + 30 }))
  }
];

const compareData = [
  { name: "Jan", organic: 65, paid: 35 },
  { name: "Feb", organic: 59, paid: 41 },
  { name: "Mar", organic: 80, paid: 20 },
  { name: "Apr", organic: 81, paid: 19 },
  { name: "May", organic: 56, paid: 44 },
  { name: "Jun", organic: 55, paid: 45 },
  { name: "Jul", organic: 40, paid: 60 },
  { name: "Aug", organic: 70, paid: 30 },
  { name: "Sep", organic: 90, paid: 10 },
  { name: "Oct", organic: 85, paid: 15 },
  { name: "Nov", organic: 75, paid: 25 },
  { name: "Dec", organic: 68, paid: 32 },
];

const brandKeywords = keywordData
  .filter(kw => kw.keyword.includes('super') || kw.keyword.includes('fan'))
  .map(kw => ({
    name: kw.keyword,
    volume: kw.volume,
    ranking: kw.ranking
  }));

const nonBrandKeywords = keywordData
  .filter(kw => !(kw.keyword.includes('super') || kw.keyword.includes('fan')))
  .map(kw => ({
    name: kw.keyword,
    volume: kw.volume,
    ranking: kw.ranking
  }));

export function KeywordPerformanceTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Keywords</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Keyword</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Volume</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Ranking</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Difficulty</th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {keywordData.map((keyword, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{keyword.keyword}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{keyword.volume}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">#{keyword.ranking}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${keyword.difficulty}%` }}></div>
                      </div>
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
            <CardTitle>Brand Keyword Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={brandKeywords}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="volume" name="Search Volume" fill="#8884d8" />
                <Bar dataKey="ranking" name="Ranking" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Non-Brand Keyword Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={nonBrandKeywords}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="volume" name="Search Volume" fill="#8884d8" />
                <Bar dataKey="ranking" name="Ranking" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Keyword Ranking Trends (YTD)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={keywordData[0].history}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis reversed domain={[1, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="ranking" 
                  name={`Ranking: ${keywordData[0].keyword}`}
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Organic vs. Paid Keyword Traffic</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={compareData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="organic" name="Organic %" stackId="a" fill="#8884d8" />
                <Bar dataKey="paid" name="Paid %" stackId="a" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
