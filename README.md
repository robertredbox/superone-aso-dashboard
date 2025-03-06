# SuperOne ASO Dashboard

A comprehensive Year-to-Date App Store Optimization (ASO) dashboard for the SuperOne Fan Battle iOS app. This dashboard provides insights into app performance metrics, keyword rankings, competitive analysis, user reviews, and download statistics.

## Features

- **Dashboard**: Overview of key metrics including ratings, downloads, and keyword performance
- **Keyword Performance**: Track keyword rankings, search volumes, and visibility metrics
- **Competitive Analysis**: Compare with similar apps in the market
- **App Reviews**: Monitor user feedback and sentiment analysis
- **Rankings**: Track app position across different categories and regions
- **Downloads**: Analyze download trends and user acquisition

## Data Sources

- **AppTweak API**: Provides ASO metrics, keyword data, and competitor insights
- **App Store Connect**: Import data for downloads and user retention metrics

## Tech Stack

- **Framework**: Next.js 14
- **UI Components**: Custom components with Tailwind CSS
- **Styling**: Tailwind CSS with custom theming
- **Data Visualization**: Recharts for interactive charts
- **State Management**: React Hooks and Context API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- AppTweak API access
- App Store Connect API access (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/robertredbox/superone-aso-dashboard.git
cd superone-aso-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with your API keys:
```
APPTWEAK_API_KEY=your_apptweak_api_key
APP_STORE_CONNECT_API_KEY=your_app_store_connect_api_key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

## Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect the repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
