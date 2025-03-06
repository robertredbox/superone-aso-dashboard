"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, PieChart, Pie, Cell,
  LineChart, Line
} from "recharts";
import { formatDate, getRandomDateData } from "@/lib/utils";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Real data from AppTweak for all versions
const ratingDistribution = [
  { name: "5★", value: 20 },
  { name: "4★", value: 0 },
  { name: "3★", value: 1 },
  { name: "2★", value: 1 },
  { name: "1★", value: 1 }
];

// Rating trend (partially based on real data and historical pattern)
const ratingTrend = Array.from({ length: 12 }, (_, i) => {
  const date = new Date();
  date.setMonth(date.getMonth() - i);
  // All months before Jan 2025 have rating 4.6, Jan-Mar 2025 are 5.0 for UK reviews
  const rating = date.getMonth() >= 0 && date.getMonth() <= 2 && date.getFullYear() === 2025 ? 5.0 : 4.6;
  return {
    month: date.toLocaleString('default', { month: 'short' }),
    rating: rating
  };
}).reverse();

// Sentiment analysis based on our review analysis
const reviewSentiment = [
  { name: "Positive", value: 3 },
  { name: "Neutral", value: 1 },
  { name: "Negative", value: 0 }
];

// Keywords extracted from real reviews
const keywordMentions = [
  { name: "game", count: 4 },
  { name: "play", count: 3 },
  { name: "great", count: 2 },
  { name: "looking", count: 2 },
  { name: "forward", count: 2 },
  { name: "hooked", count: 2 },
  { name: "well", count: 2 },
  { name: "see", count: 2 },
  { name: "knowledge", count: 1 },
  { name: "trivia", count: 1 }
];

// Real reviews from AppTweak (GB store) with sentiment analysis
const reviews = [
  {
    id: 1,
    author: "umbrellarz",
    rating: 5,
    title: "This is a game changer! 😎",
    comment: "An amazing fun game! With many ways to Play. Win, and Earn! See You on the inside! Let's play! 😜",
    date: "2025-02-13",
    helpful: 0,
    version: "3.88",
    country: "GB",
    sentiment: "positive"
  },
  {
    id: 2,
    author: "Jimbob1980!",
    rating: 5,
    title: "Great and more to come",
    comment: "Considering this is the first version in a trial stage this could be huge !! Well done , looking forward to what's coming",
    date: "2025-02-03",
    helpful: 0,
    version: "3.88",
    country: "GB",
    sentiment: "neutral"
  },
  {
    id: 3,
    author: "Ronny Omelette",
    rating: 5,
    title: "Incredible Game",
    comment: "Absolutely loved it really well designed app and the trivia questions are superb",
    date: "2025-01-31",
    helpful: 0,
    version: "3.87",
    country: "GB",
    sentiment: "positive"
  },
  {
    id: 4,
    author: "Gareth03",
    rating: 5,
    title: "I am hooked!",
    comment: "This game is great. I am hooked. I find it hard to put my phone down as I keep wanting to play and test my knowledge. Easy to use and looking forward to see what it looks like in the future.",
    date: "2025-01-31",
    helpful: 0,
    version: "3.87",
    country: "GB",
    sentiment: "positive"
  }
];

export function AppReviewsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Average Rating</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-40">
            <div className="text-center">
              <div className="text-5xl font-bold">4.6★</div>
              <p className="text-sm text-muted-foreground mt-2">Based on 23 ratings</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ratingDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {ratingDistribution.map((entry, index) => (
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
            <CardTitle>Review Sentiment (2025)</CardTitle>
          </CardHeader>
          <CardContent className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reviewSentiment}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#4ade80" />
                  <Cell fill="#facc15" />
                  <Cell fill="#f87171" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Rating Trend (YTD)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={ratingTrend}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[4, 5]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="rating" 
                  name="Average Rating"
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Common Keywords in Reviews</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={keywordMentions}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Mentions" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews (2025)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <span className="text-lg font-semibold">{review.title}</span>
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                        review.sentiment === 'positive' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                        review.sentiment === 'neutral' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                        'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                      }`}>{review.sentiment}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="text-yellow-500">
                        {'★'.repeat(review.rating)}
                        {'☆'.repeat(5 - review.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground ml-2">by {review.author}</span>
                      <span className="text-xs text-muted-foreground ml-2">(from {review.country})</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div>{review.date}</div>
                    <div>Version {review.version}</div>
                  </div>
                </div>
                <p className="mt-3">{review.comment}</p>
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <span>{review.helpful} people found this helpful</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}