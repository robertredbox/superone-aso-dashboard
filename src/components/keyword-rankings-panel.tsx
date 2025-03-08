import React from 'react';
import ExportButton from '@/components/ui/export-button';

interface KeywordRanking {
  keyword: string;
  rank: number | null;
  previousRank: number | null;
  volume: number;
  difficulty: number;
  updatedAt: string;
}

interface KeywordRankingsPanelProps {
  data: KeywordRanking[];
  title?: string;
}

export default function KeywordRankingsPanel({
  data,
  title = 'Keyword Rankings'
}: KeywordRankingsPanelProps) {
  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white dark:bg-slate-900">
      <div className="flex justify-between items-center mb-4">
        <h2 
          className="text-lg font-medium" 
          style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}
        >
          {title}
        </h2>
        
        <ExportButton
          data={data}
          title={title}
          subtitle="Keyword position tracking data"
          filename="superone-keyword-rankings"
          dataType="keywords"
          size="sm"
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
          <thead>
            <tr className="border-b dark:border-slate-700">
              <th className="text-left p-2">Keyword</th>
              <th className="text-right p-2">Rank</th>
              <th className="text-right p-2">Previous</th>
              <th className="text-right p-2">Change</th>
              <th className="text-right p-2">Volume</th>
              <th className="text-right p-2">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr 
                  key={index} 
                  className={`border-b dark:border-slate-700 ${
                    index % 2 === 0 ? 'bg-slate-50 dark:bg-slate-800/50' : ''
                  }`}
                >
                  <td className="p-2">{item.keyword}</td>
                  <td className="text-right p-2">{item.rank || 'Not Ranked'}</td>
                  <td className="text-right p-2">{item.previousRank || '-'}</td>
                  <td className="text-right p-2">
                    {renderRankChange(item.rank, item.previousRank)}
                  </td>
                  <td className="text-right p-2">{item.volume.toLocaleString()}</td>
                  <td className="text-right p-2">{item.difficulty}%</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-slate-500">
                  No keyword ranking data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Helper function to render rank change
function renderRankChange(current: number | null, previous: number | null): React.ReactNode {
  if (!current || !previous) return '-';
  
  const change = previous - current;
  
  if (change > 0) {
    return (
      <span className="text-green-600 dark:text-green-500 font-medium">
        ▲ {change}
      </span>
    );
  }
  
  if (change < 0) {
    return (
      <span className="text-red-600 dark:text-red-500 font-medium">
        ▼ {Math.abs(change)}
      </span>
    );
  }
  
  return <span className="text-slate-500">No change</span>;
}