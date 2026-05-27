import { Suspense } from 'react';
import MetricsCards from '@/components/dashboard/metrics-cards';
import CategoryChart from '@/components/dashboard/category-chart';
import MonthlyChart from '@/components/dashboard/monthly-chart';
import RecentTransactions from '@/components/dashboard/recent-transactions';
import AccountBalances from '@/components/dashboard/account-balances';
import { calculateCategoryBreakdown, calculateMonthlyData } from '@/lib/utils/calculations';

async function getSheetData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 
                  (typeof window === 'undefined' ? 'http://localhost:3005' : '');
  
  const res = await fetch(`${baseUrl}/api/sheets`, {
    next: { revalidate: 60 },
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-80 bg-gray-200 rounded-lg"></div>
        <div className="h-80 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const data = await getSheetData();
  const { transactions, metrics } = data;

  const categoryData = calculateCategoryBreakdown(transactions);
  const monthlyData = calculateMonthlyData(transactions);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-sm text-gray-500">
            Last updated: {new Date(metrics.lastUpdated).toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <MetricsCards transactions={transactions} />
      </Suspense>

      <div className="grid gap-4 md:grid-cols-2">
        <CategoryChart data={categoryData} />
        <MonthlyChart data={monthlyData} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AccountBalances transactions={transactions} />
        <RecentTransactions transactions={transactions} />
      </div>
    </div>
  );
}
