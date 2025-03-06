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

// Sample data based on app's rating information
const ratingDistribution = [
  { name: "5★", value: 20 },
  { name: "4★", value: 0 },
  { name: "3★", value: 1 },
  { name: "2★", value: 1 },
  { name: "1★", value: 1 }
];

const ratingTrend = Array.from({ length: 12 }, (_, i) => {
  const date = new Date();
  date.setMonth(date.getMonth() - i);
  return {
    month: date.toLocaleString('default', { month: 'short' }),
    rating: 4.5 + (Math.random() * 0.4 - 0.2).toFixed(1)
  };
}).reverse();

const reviewSentiment = [
  { name: "Positive", value: 82 },
  { name: "Neutral", value: 10 },
  { name: "Negative", value: 8 }
];

const keywordMentions = [
  { name: "game", count: 15 },
  { name: "fun", count: 12 },
  { name: "easy", count: 9 },
  { name: "trivia", count: 8 },
  { name: "questions", count: 7 },
  { name: "rewards", count: 6 },
  { name: "addictive", count: 5 },
  { name: "prizes", count: 4 },
  { name: "challenging", count: 3 },
  { name: "bugs", count: 2 }
];

// Sample reviews
const reviews = [
  {
    id: 1,
    author: "GameFan123",
    rating: 5,
    title: "Amazing trivia game!",
    comment: "I absolutely love this trivia game. The questions are challenging but fair, and the rewards are great. Can't stop playing!",
    date: "2025-02-25",
    helpful: 12,
    version: "3.88",
    sentiment: "positive"
  },
  {
    id: 2,
    author: "TriviaExpert",
    rating: 5,
    title: "Best fan battle game",
    comment: "This is by far the best fan battle trivia game I've played. The Super.One platform is very engaging and the prizes are actually achievable. Great work!",
    date: "2025-02-18",
    helpful: 8,
    version: "3.88",
    sentiment: "positive"
  },
  {
    id: 3,
    author: "SportsQuizzer",
    rating: 5,
    title: "Excellent game mechanics",
    comment: "The swipe mechanics make this so intuitive to play. I love the true/false format and how quickly the games move. Perfect for short breaks.",
    date: "2025-01-30",
    helpful: 5,
    version: "3.87",
    sentiment: "positive"
  },
  {
    id: 4,
    author: "CasualGamer22",
    rating: 3,
    title: "Good but needs improvement",
    comment: "The concept is great, but I've encountered some lag issues. Also, some questions repeat too often. Still enjoying it overall though.",
    date: "2025-01-15",
    helpful: 3,
    version: "3.87",
    sentiment: "neutral"
  },
  {
    id: 5,
    author: "UnhappyUser",
    rating: 1,
    title: "Too many ads",
    comment: "The game itself is fine but there are way too many ads interrupting gameplay. Makes it frustrating to play for more than a few minutes.",
    date: "2024-12-22",
    helpful: 7,
    version: "3.86",
    sentiment: "negative"
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
            <CardTitle>Review Sentiment</CardTitle>
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
          <CardTitle>Recent Reviews</CardTitle>
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
