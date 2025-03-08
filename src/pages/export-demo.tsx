import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import KeywordRankingsPanel from '@/components/keyword-rankings-panel';
import DashboardExportHeader from '@/components/dashboard-export-header';

const mockKeywordData = [
  {
    keyword: 'crypto wallet',
    rank: 12,
    previousRank: 15,
    volume: 24500,
    difficulty: 87,
    updatedAt: '2025-03-07T00:00:00Z'
  },
  {
    keyword: 'bitcoin app',
    rank: 8,
    previousRank: 9,
    volume: 18200,
    difficulty: 82,
    updatedAt: '2025-03-07T00:00:00Z'
  },
  {
    keyword: 'crypto trading',
    rank: 22,
    previousRank: 18,
    volume: 12800,
    difficulty: 76,
    updatedAt: '2025-03-07T00:00:00Z'
  },
  {
    keyword: 'nft marketplace',
    rank: 5,
    previousRank: 7,
    volume: 9500,
    difficulty: 89,
    updatedAt: '2025-03-07T00:00:00Z'
  },
  {
    keyword: 'blockchain app',
    rank: 14,
    previousRank: 14,
    volume: 7800,
    difficulty: 72,
    updatedAt: '2025-03-07T00:00:00Z'
  },
  {
    keyword: 'secure wallet',
    rank: 19,
    previousRank: 25,
    volume: 5400,
    difficulty: 68,
    updatedAt: '2025-03-07T00:00:00Z'
  },
  {
    keyword: 'cryptocurrency',
    rank: 39,
    previousRank: 32,
    volume: 31200,
    difficulty: 95,
    updatedAt: '2025-03-07T00:00:00Z'
  },
  {
    keyword: 'digital assets',
    rank: 45,
    previousRank: 50,
    volume: 4700,
    difficulty: 65,
    updatedAt: '2025-03-07T00:00:00Z'
  },
  {
    keyword: 'defi wallet',
    rank: 17,
    previousRank: 22,
    volume: 8900,
    difficulty: 74,
    updatedAt: '2025-03-07T00:00:00Z'
  },
  {
    keyword: 'buy bitcoin',
    rank: 11,
    previousRank: 10,
    volume: 27800,
    difficulty: 93,
    updatedAt: '2025-03-07T00:00:00Z'
  }
];

const mockReviewData = [
  {
    date: '2025-03-06T14:28:00Z',
    rating: 5,
    title: 'Great app!',
    content: 'This is the best crypto wallet I have used. Simple interface and great security features.',
    userName: 'CryptoFan123',
    version: '2.4.1'
  },
  {
    date: '2025-03-05T09:45:00Z',
    rating: 4,
    title: 'Good but could be better',
    content: 'I like the app overall, but would appreciate faster transaction times. Otherwise solid.',
    userName: 'BlockchainBob',
    version: '2.4.0'
  },
  {
    date: '2025-03-04T22:12:00Z',
    rating: 2,
    title: 'Issues with latest update',
    content: 'The latest update is causing frequent crashes. Please fix ASAP.',
    userName: 'CoinCollector',
    version: '2.4.1'
  },
  {
    date: '2025-03-03T11:30:00Z',
    rating: 5,
    title: 'Excellent security',
    content: 'I feel very secure using this wallet. The biometric authentication works flawlessly.',
    userName: 'CryptoSecurity',
    version: '2.4.0'
  },
  {
    date: '2025-03-02T16:48:00Z',
    rating: 3,
    title: 'Decent but needs improvements',
    content: 'The UI could be more intuitive. Sometimes I struggle to find basic features.',
    userName: 'CryptoNewbie',
    version: '2.3.9'
  }
];

const mockAppData = [
  {
    id: 'com.superone.wallet',
    name: 'SuperOne Crypto Wallet',
    developer: 'SuperOne Technologies Ltd',
    primaryCategory: 'Finance',
    rating: 4.7,
    reviews: 12483,
    size: '45.2 MB',
    price: 'Free',
    updatedDate: '2025-02-28T00:00:00Z'
  }
];

export default function ExportDemo() {
  // Create datasets for bulk export
  const exportDatasets = [
    {
      id: 'keyword-rankings',
      title: 'Keyword Rankings',
      data: mockKeywordData,
      type: 'keywords' as const,
      filename: 'superone-keyword-rankings'
    },
    {
      id: 'app-reviews',
      title: 'App Reviews',
      data: mockReviewData,
      type: 'reviews' as const,
      filename: 'superone-app-reviews'
    },
    {
      id: 'app-details',
      title: 'App Details',
      data: mockAppData,
      type: 'app' as const,
      filename: 'superone-app-details'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 
        className="text-2xl mb-6" 
        style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}
      >
        SuperOne ASO Dashboard - Export Demo
      </h1>

      {/* Global export header */}
      <DashboardExportHeader datasets={exportDatasets} />
      
      <div className="grid grid-cols-1 gap-6">
        {/* Keyword Rankings Panel */}
        <KeywordRankingsPanel data={mockKeywordData} />
        
        {/* App Reviews Panel */}
        <div className="border rounded-lg shadow-sm p-4 bg-white dark:bg-slate-900">
          <div className="flex justify-between items-center mb-4">
            <h2 
              className="text-lg font-medium" 
              style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}
            >
              App Reviews
            </h2>
            
            {/* Individual export button for this panel */}
            <Button
              variant="ghost"
              size="sm"
              asChild
            >
              <a href="#" onClick={(e) => {
                e.preventDefault();
                // We'll integrate this with the actual export button in production
                alert('This would trigger the export of app reviews in production');
              }}>Export Reviews</a>
            </Button>
          </div>
          
          <div className="space-y-4" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
            {mockReviewData.map((review, index) => (
              <div 
                key={index} 
                className="border-b pb-4 last:border-0 dark:border-slate-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{review.title}</h3>
                    <div className="text-yellow-500 my-1">
                      {'★'.repeat(review.rating)}
                      {'☆'.repeat(5 - review.rating)}
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">
                    {new Date(review.date).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300">{review.content}</p>
                <div className="text-sm text-slate-500 mt-2">
                  {review.userName} • Version {review.version}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-slate-500 text-sm" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
        This is a demo of the PDF export functionality for the SuperOne ASO Dashboard.
        <br />
        Try exporting individual panels or use the "Export Dashboard Data" button to export multiple datasets.
      </div>
    </div>
  );
}