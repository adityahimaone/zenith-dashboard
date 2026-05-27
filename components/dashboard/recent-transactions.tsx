'use client';

import { Transaction } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils/calculations';
import { useState } from 'react';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const FILTERS = [
  { key: 'all' as const, label: 'All' },
  { key: 'income' as const, label: 'Income' },
  { key: 'expense' as const, label: 'Expense' },
];

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');

  const filtered = transactions.filter((t) => {
    if (filter === 'all') return true;
    return t.type.toLowerCase() === filter;
  });

  const recent = filtered.slice(-10).reverse();

  return (
    <div className="neu-raised bg-card rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">Recent Transactions</h3>
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={
                filter === f.key
                  ? 'rounded-full bg-[#5266eb] text-white px-3 py-1 text-xs font-medium transition-all duration-200'
                  : 'rounded-full bg-[#f0f0f3] text-muted-foreground px-3 py-1 text-xs font-medium transition-all duration-200 hover:bg-gray-200'
              }
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No transactions found</p>
        ) : (
          recent.map((t, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-xl p-3 transition-all hover:bg-muted/50"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground truncate">{t.description}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formatDate(t.timestamp)} &bull; {t.category} &bull; {t.source}
                </p>
              </div>
              <span className={`font-semibold text-sm shrink-0 ml-2 ${t.type === 'Income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {t.type === 'Income' ? '+' : '-'}
                {formatCurrency(Math.abs(t.amount))}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
