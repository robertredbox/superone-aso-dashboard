"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardTab } from "@/components/tabs/dashboard-tab";
import { KeywordPerformanceTab } from "@/components/tabs/keyword-performance-tab";
import { CompetitiveAnalysisTab } from "@/components/tabs/competitive-analysis-tab";
import { AppReviewsTab } from "@/components/tabs/app-reviews-tab";
import { RankingsTab } from "@/components/tabs/rankings-tab";
import { DownloadsTab } from "@/components/tabs/downloads-tab";
import { TestTab } from "@/components/tabs/test-tab";

export function AppTabs() {
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="keyword-performance">Keyword Performance</TabsTrigger>
        <TabsTrigger value="competitive-analysis">Competitive Analysis</TabsTrigger>
        <TabsTrigger value="app-reviews">App Reviews</TabsTrigger>
        <TabsTrigger value="rankings">Rankings</TabsTrigger>
        <TabsTrigger value="downloads">Downloads</TabsTrigger>
        <TabsTrigger value="test">Test</TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard">
        <DashboardTab />
      </TabsContent>
      <TabsContent value="keyword-performance">
        <KeywordPerformanceTab />
      </TabsContent>
      <TabsContent value="competitive-analysis">
        <CompetitiveAnalysisTab />
      </TabsContent>
      <TabsContent value="app-reviews">
        <AppReviewsTab />
      </TabsContent>
      <TabsContent value="rankings">
        <RankingsTab />
      </TabsContent>
      <TabsContent value="downloads">
        <DownloadsTab />
      </TabsContent>
      <TabsContent value="test">
        <TestTab />
      </TabsContent>
    </Tabs>
  );
}