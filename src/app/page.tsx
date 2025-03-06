import { AppTabs } from '@/components/app-tabs';
import { SideNav } from '@/components/side-nav';

export default function Home() {
  return (
    <main className="min-h-screen flex">
      <SideNav />
      <div className="flex-1 p-8">
        <h1 className="text-3xl mb-8">SuperOne Fan Battle - YTD ASO Dashboard</h1>
        <AppTabs />
      </div>
    </main>
  );
}
