'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-600">{formatCurrency(income)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expense</CardTitle>
          <TrendingDown className="h-4 w-4 text-rose-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-rose-600">{formatCurrency(expense)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
          <Wallet className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(netWorth)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
          <PiggyBank className="h-4 w-4 text-violet-500" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${savingsRate >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {savingsRate.toFixed(1)}%
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
