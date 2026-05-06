'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Transaction } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils/calculations';
import { useState } from 'react';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');

  const filtered = transactions.filter((t) => {
    if (filter === 'all') return true;
    return t.type.toLowerCase() === filter;
  });

  const recent = filtered.slice(-10).reverse();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
          <div className="flex gap-2">
            <Badge
              variant={filter === 'all' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setFilter('all')}
            >
              All
            </Badge>
            <Badge
              variant={filter === 'income' ? 'default' : 'outline'}
              className="cursor-pointer bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
              onClick={() => setFilter('income')}
            >
              Income
            </Badge>
            <Badge
              variant={filter === 'expense' ? 'default' : 'outline'}
              className="cursor-pointer bg-rose-100 text-rose-800 hover:bg-rose-200"
              onClick={() => setFilter('expense')}
            >
              Expense
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {recent.length === 0 ? (
            <p className="text-sm text-gray-500">No transactions found</p>
          ) : (
            recent.map((t, idx) => (
              <div key={idx} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                <div className="flex-1">
                  <p className="font-medium text-sm">{t.description}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(t.timestamp)} • {t.category} • {t.source}
                  </p>
                </div>
                <div className={`font-semibold text-sm ${t.type === 'Income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {t.type === 'Income' ? '+' : '-'}
                  {formatCurrency(Math.abs(t.amount))}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
