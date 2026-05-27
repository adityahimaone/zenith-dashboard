'use client';

import { Transaction } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/calculations';
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from 'lucide-react';

interface MetricsCardsProps {
  transactions: Transaction[];
}

export default function MetricsCards({ transactions }: MetricsCardsProps) {
  const income = transactions
    .filter((t) => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const netWorth = transactions.length > 0 ? transactions[transactions.length - 1].balance : 0;
  const savingsRate = income > 0 ? ((income - expense) / income) * 100 : 0;

  const metrics = [
    {
      title: 'Total Income',
      value: formatCurrency(income),
      icon: TrendingUp,
      color: 'text-emerald-600',
      accent: 'bg-emerald-500',
      iconBg: 'bg-emerald-50',
    },
    {
      title: 'Total Expense',
      value: formatCurrency(expense),
      icon: TrendingDown,
      color: 'text-rose-600',
      accent: 'bg-rose-500',
      iconBg: 'bg-rose-50',
    },
    {
      title: 'Net Worth',
      value: formatCurrency(netWorth),
      icon: Wallet,
      color: 'text-blue-600',
      accent: 'bg-blue-500',
      iconBg: 'bg-blue-50',
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      icon: PiggyBank,
      color: savingsRate >= 0 ? 'text-emerald-600' : 'text-rose-600',
      accent: savingsRate >= 0 ? 'bg-emerald-500' : 'bg-rose-500',
      iconBg: savingsRate >= 0 ? 'bg-emerald-50' : 'bg-rose-50',
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.title}
          className="neu-raised neu-float bg-card rounded-2xl p-5 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">{metric.title}</span>
            <div className={`h-10 w-10 rounded-xl ${metric.iconBg} flex items-center justify-center`}>
              <metric.icon className={`h-5 w-5 ${metric.color}`} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-1 h-8 rounded-full ${metric.accent}`} />
            <span className={`text-xl lg:text-2xl font-bold ${metric.color}`}>{metric.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
