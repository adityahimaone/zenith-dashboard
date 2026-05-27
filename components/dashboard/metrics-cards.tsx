"use client";

import { Transaction } from "@/lib/types";
import { formatCurrency } from "@/lib/utils/calculations";
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";

interface MetricsCardsProps {
  transactions: Transaction[];
}

export default function MetricsCards({ transactions }: MetricsCardsProps) {
  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const netWorth =
    transactions.length > 0 ? transactions[transactions.length - 1].balance : 0;
  const savingsRate = income > 0 ? ((income - expense) / income) * 100 : 0;

  const metrics = [
    {
      title: "Total Income",
      value: formatCurrency(income),
      icon: TrendingUp,
      gradient: "from-emerald-400 to-teal-500",
      shadow: "shadow-emerald-500/25",
      bg: "bg-emerald-500/10",
      text: "text-emerald-600 dark:text-emerald-400",
      badge: "+12.5%",
      badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Total Expense",
      value: formatCurrency(expense),
      icon: TrendingDown,
      gradient: "from-rose-400 to-pink-500",
      shadow: "shadow-rose-500/25",
      bg: "bg-rose-500/10",
      text: "text-rose-600 dark:text-rose-400",
      badge: "+8.3%",
      badgeBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    },
    {
      title: "Net Worth",
      value: formatCurrency(netWorth),
      icon: Wallet,
      gradient: "from-indigo-400 to-violet-500",
      shadow: "shadow-indigo-500/25",
      bg: "bg-indigo-500/10",
      text: "text-indigo-600 dark:text-indigo-400",
      badge: "+5.2%",
      badgeBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    },
    {
      title: "Savings Rate",
      value: `${savingsRate.toFixed(1)}%`,
      icon: PiggyBank,
      gradient: savingsRate >= 0
        ? "from-amber-400 to-orange-500"
        : "from-rose-400 to-pink-500",
      shadow: savingsRate >= 0
        ? "shadow-amber-500/25"
        : "shadow-rose-500/25",
      bg: savingsRate >= 0 ? "bg-amber-500/10" : "bg-rose-500/10",
      text: savingsRate >= 0
        ? "text-amber-600 dark:text-amber-400"
        : "text-rose-600 dark:text-rose-400",
      badge: savingsRate >= 0 ? "Healthy" : "Low",
      badgeBg: savingsRate >= 0
        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
        : "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.title}
          className="group neu-raised neu-float bg-card rounded-2xl p-5 flex flex-col gap-3 animate-fade-in-up
            hover:scale-[1.02] cursor-default"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {metric.title}
            </span>
            <div
              className={`h-10 w-10 rounded-xl bg-gradient-to-br ${metric.gradient}
                flex items-center justify-center shadow-lg ${metric.shadow}
                group-hover:scale-110 transition-transform duration-300`}
            >
              <metric.icon className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="flex items-end gap-3">
            <span className={`text-xl lg:text-2xl font-bold ${metric.text}`}>
              {metric.value}
            </span>
          </div>
          <div>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${metric.badgeBg}`}
            >
              {metric.badge}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
