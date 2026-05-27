"use client";

import { Suspense, useEffect, useState } from "react";
import MetricsCards from "@/components/dashboard/metrics-cards";
import CategoryChart from "@/components/dashboard/category-chart";
import MonthlyChart from "@/components/dashboard/monthly-chart";
import RecentTransactions from "@/components/dashboard/recent-transactions";
import AccountBalances from "@/components/dashboard/account-balances";
import {
  calculateCategoryBreakdown,
  calculateMonthlyData,
} from "@/lib/utils/calculations";

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-muted rounded-2xl" />
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-80 bg-muted rounded-2xl" />
        <div className="h-80 bg-muted rounded-2xl" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/sheets");
        if (!res.ok) throw new Error("Failed to fetch data");
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <LoadingSkeleton />;
  if (error) return <div className="text-destructive">{error}</div>;
  if (!data) return <div>No data</div>;

  const { transactions, metrics } = data;
  const categoryData = calculateCategoryBreakdown(transactions);
  const monthlyData = calculateMonthlyData(transactions);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Last updated:{" "}
            {new Date(metrics.lastUpdated).toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="stagger-children">
        <Suspense fallback={<LoadingSkeleton />}>
          <MetricsCards transactions={transactions} />
        </Suspense>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2 stagger-children">
        <div className="animate-fade-in-up">
          <CategoryChart data={categoryData} />
        </div>
        <div className="animate-fade-in-up">
          <MonthlyChart data={monthlyData} />
        </div>
      </div>

      {/* Accounts + Transactions */}
      <div className="grid gap-6 md:grid-cols-2 stagger-children">
        <div className="animate-fade-in-up">
          <AccountBalances transactions={transactions} />
        </div>
        <div className="animate-fade-in-up">
          <RecentTransactions transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
