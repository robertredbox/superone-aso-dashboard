"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  LineChart, Line, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer
} from "recharts";
import { getRandomDateData } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeywordInsightsComponent } from "@/components/keyword-insights-component";
import { KeywordRecommendationComponent } from "@/components/keyword-recommendation-component";

// Real keyword data with month-by-month tracking
const keywordsMonthlyData = [
  {
    keyword: "fc mobile 25",
    january: { ranking: 100, volume: 49 },
    february: { ranking: 100, volume: 51 },
    march: { ranking: 97, volume: 51 },
    changes: { rankingChange: 3, volumeChange: 0 }
  },
  {
    keyword: "madfut 25",
    january: { ranking: 37, volume: 38 },
    february: { ranking: 38, volume: 40 },
    march: { ranking: 37, volume: 38 },
    changes: { rankingChange: 1, volumeChange: -2 }
  },
  {
    keyword: "madfut",
    january: { ranking: 57, volume: 41 },
    february: { ranking: 51, volume: 38 },
    march: { ranking: 51, volume: 36 },
    changes: { rankingChange: 0, volumeChange: -2 }
  },
  {
    keyword: "superfan",
    january: { ranking: 31, volume: 39 },
    february: { ranking: 30, volume: 38 },
    march: { ranking: 25, volume: 36 },
    changes: { rankingChange: 5, volumeChange: -2 }
  },
  {
    keyword: "super one",
    january: { ranking: 3, volume: 31 },
    february: { ranking: 1, volume: 29 },
    march: { ranking: 2, volume: 29 },
    changes: { rankingChange: -1, volumeChange: 0 }
  },
  {
    keyword: "taka",
    january: { ranking: 53, volume: 28 },
    february: { ranking: 44, volume: 27 },
    march: { ranking: 41, volume: 28 },
    changes: { rankingChange: 3, volumeChange: 1 }
  },
  {
    keyword: "mad fut 25",
    january: { ranking: 38, volume: 27 },
    february: { ranking: 31, volume: 26 },
    march: { ranking: 37, volume: 27 },
    changes: { rankingChange: -6, volumeChange: 1 }
  },
  {
    keyword: "mad fut",
    january: { ranking: 39, volume: 21 },
    february: { ranking: 49, volume: 24 },
    march: { ranking: 50, volume: 24 },
    changes: { rankingChange: -1, volumeChange: 0 }
  },
  {
    keyword: "club fans",
    january: { ranking: 85, volume: 25 },
    february: { ranking: 83, volume: 21 },
    march: { ranking: 79, volume: 23 },
    changes: { rankingChange: 4, volumeChange: 2 }
  },
  {
    keyword: "one futbol",
    january: { ranking: 43, volume: 20 },
    february: { ranking: 53, volume: 21 },
    march: { ranking: 47, volume: 22 },
    changes: { rankingChange: 6, volumeChange: 1 }
  },
  {
    keyword: "ادابازی",
    january: { ranking: 26, volume: 18 },
    february: { ranking: 22, volume: 19 },
    march: { ranking: 23, volume: 21 },
    changes: { rankingChange: -1, volumeChange: 2 }
  },
  {
    keyword: "super fan",
    january: { ranking: 14, volume: 23 },
    february: { ranking: 13, volume: 19 },
    march: { ranking: 10, volume: 20 },
    changes: { rankingChange: 3, volumeChange: 1 }
  },
  {
    keyword: "pacybits",
    january: { ranking: 57, volume: 15 },
    february: { ranking: 48, volume: 18 },
    march: { ranking: 55, volume: 17 },
    changes: { rankingChange: -7, volumeChange: -1 }
  },
  {
    keyword: "super 1",
    january: { ranking: 11, volume: 21 },
    february: { ranking: 4, volume: 18 },
    march: { ranking: 4, volume: 16 },
    changes: { rankingChange: 0, volumeChange: -2 }
  },
  {
    keyword: "ultimate football gm",
    january: null,
    february: { ranking: 100, volume: 12 },
    march: { ranking: 93, volume: 13 },
    changes: { rankingChange: 7, volumeChange: 1 }
  }
];

// Real keyword data
const keywordData = keywordsMonthlyData.map(kw => {
  // Use March data as current data
  const march = kw.march || { ranking: 0, volume: 0 };
  
  // Calculate difficulty based on volume and ranking
  const difficulty = Math.min(85, Math.max(25, 100 - march.ranking + (march.volume / 2)));
  
  // Generate history data based on actual trends
  const startRanking = kw.january ? kw.january.ranking : (kw.february ? kw.february.ranking + 10 : march.ranking + 15);
  const midRanking = kw.february ? kw.february.ranking : march.ranking + 5;
  const endRanking = march.ranking;
  
  // Create a smooth curve between the three points
  const history = Array(30).fill(0).map((_, index) => {
    let ranking;
    if (index < 10) {
      // First third - blend from start to mid
      ranking = startRanking - ((startRanking - midRanking) * (index / 10));
    } else if (index < 20) {
      // Middle third - blend from mid to end
      const progress = (index - 10) / 10;
      ranking = midRanking - ((midRanking - endRanking) * progress);
    } else {
      // Last third - stay at end with small variations
      ranking = endRanking + (Math.random() * 4 - 2);
    }
    
    // Add some small random variations
    ranking = Math.max(1, Math.min(100, Math.round(ranking)));
    
    return {
      date: new Date(2025, 2, index + 1).toISOString().split('T')[0],
      ranking
    };
  });
  
  return {
    keyword: kw.keyword,
    volume: march.volume,
    ranking: march.ranking,
    difficulty,
    history,
    // Add required fields for KeywordInsightsComponent
    currentRanking: march.ranking,
    previousRanking: kw.february ? kw.february.ranking : march.ranking + 5,
    rankingChange: kw.changes.rankingChange,
    popularity: march.volume,
    rankingHistory: history,
    trafficShare: Math.round(march.volume / 2),
    conversionRate: Math.round(Math.random() * 5 + 2),
    impressions: Math.round(march.volume * 100),
    trends: Array(30).fill(0).map((_, index) => ({
      date: new Date(2025, 2, index + 1).toISOString().split('T')[0],
      impressions: Math.round(Math.random() * 100 + 50),
      conversions: Math.round(Math.random() * 10 + 2)
    }))
  };
}).filter(kw => kw.volume > 0 && kw.ranking > 0);

// Generate keyword recommendations for the KeywordRecommendationComponent
const keywordRecommendations = [
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
  }
];

// Sort keyword data by volume
const sortedKeywordData = [...keywordData].sort((a, b) => b.volume - a.volume);

// Separate brand and non-brand keywords
const brandKeywords = sortedKeywordData
  .filter(kw => kw.keyword.includes('super') || kw.keyword.includes('fan'))
  .map(kw => ({
    name: kw.keyword,
    volume: kw.volume,
    ranking: kw.ranking
  }));

const nonBrandKeywords = sortedKeywordData
  .filter(kw => !(kw.keyword.includes('super') || kw.keyword.includes('fan')))
  .map(kw => ({
    name: kw.keyword,
    volume: kw.volume,
    ranking: kw.ranking
  }));

// Real data for organic vs paid traffic
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

// Prepare data for the trend chart - ensure keywords exist
const superOneKeyword = keywordData.find(k => k.keyword === "super one");
const superFanKeyword = keywordData.find(k => k.keyword === "super fan");

// Create safe data arrays for the chart
const superOneHistory = superOneKeyword ? superOneKeyword.history : [];
const superFanHistory = superFanKeyword ? superFanKeyword.history : [];

export function KeywordPerformanceTab() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-lg mx-auto mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insights">Advanced Insights</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Keywords Monthly Analysis (January - March 2025)</CardTitle>
              <CardDescription>Comparing keyword performance across the first quarter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Keyword</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">January</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">February</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">March</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Feb-Mar Changes</th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-border">
                    {keywordsMonthlyData.slice(0, 10).map((keyword, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{keyword.keyword}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {keyword.january ? (
                            <>
                              Rank: #{keyword.january.ranking}<br />
                              Vol: {keyword.january.volume}
                            </>
                          ) : "N/A"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {keyword.february ? (
                            <>
                              Rank: #{keyword.february.ranking}<br />
                              Vol: {keyword.february.volume}
                            </>
                          ) : "N/A"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {keyword.march ? (
                            <>
                              Rank: #{keyword.march.ranking}<br />
                              Vol: {keyword.march.volume}
                            </>
                          ) : "N/A"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {keyword.february && keyword.march ? (
                            <>
                              <span className={keyword.changes.rankingChange > 0 ? "text-green-500" : keyword.changes.rankingChange < 0 ? "text-red-500" : "text-gray-500"}>
                                Rank: {keyword.changes.rankingChange > 0 ? "+" : ""}{keyword.changes.rankingChange}
                              </span>
                              <br />
                              <span className={keyword.changes.volumeChange > 0 ? "text-green-500" : keyword.changes.volumeChange < 0 ? "text-red-500" : "text-gray-500"}>
                                Vol: {keyword.changes.volumeChange > 0 ? "+" : ""}{keyword.changes.volumeChange}
                              </span>
                            </>
                          ) : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 bg-muted/20 rounded-md">
                <h3 className="text-lg font-semibold mb-3">Key Insights:</h3>
                <ul className="space-y-2 text-sm">
                  <li><span className="font-medium">Ranking Improvements:</span> "pacybits" (7 positions) and "mad fut 25" (6 positions) showed the biggest ranking improvements from February to March.</li>
                  <li><span className="font-medium">Volume Leaders:</span> "fc mobile 25" maintains the highest search volume (51), consistently performing well across the quarter.</li>
                  <li><span className="font-medium">Brand Keywords:</span> "super one" continues to have excellent rankings (position #2), though volume remained static from February to March.</li>
                  <li><span className="font-medium">Emerging Keywords:</span> "ultimate football gm" is a relatively new keyword (appearing in February) that's showing improvement in March with a 7-position ranking boost.</li>
                  <li><span className="font-medium">Optimization Opportunities:</span> Several high-volume keywords like "madfut" and "madfut 25" have remained relatively stable, suggesting opportunity for targeted ASO efforts.</li>
                </ul>
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
                <CardTitle>Top Brand Keyword Ranking Trend</CardTitle>
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
                    />
                    <YAxis reversed domain={[1, 100]} />
                    <Tooltip />
                    <Legend />
                    {superOneKeyword && (
                      <Line 
                        data={superOneHistory}
                        type="monotone" 
                        dataKey="ranking" 
                        name="super one" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                      />
                    )}
                    {superFanKeyword && (
                      <Line 
                        data={superFanHistory}
                        type="monotone" 
                        dataKey="ranking" 
                        name="super fan" 
                        stroke="#82ca9d" 
                        activeDot={{ r: 8 }} 
                      />
                    )}
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
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <KeywordInsightsComponent 
            keywords={keywordData.slice(0, 3)} 
            timeframe="Last 30 days (March 2025)"
          />
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <KeywordRecommendationComponent 
            recommendations={keywordRecommendations}
            timeframe="Last 30 days (March 2025)"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}