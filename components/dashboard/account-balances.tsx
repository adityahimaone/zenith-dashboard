'use client';

import { Transaction } from '@/lib/types';
import { formatCurrency, getAccountBalances } from '@/lib/utils/calculations';
import { Landmark, Wallet, TrendingUp, CircleDollarSign } from 'lucide-react';

interface AccountBalancesProps {
  transactions: Transaction[];
}

function getAccountIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('bank') || lower.includes('bca') || lower.includes('bri') || lower.includes('mandiri')) {
    return <Landmark className="h-4 w-4" />;
  }
  if (lower.includes('gopay') || lower.includes('ovo') || lower.includes('shopeepay') || lower.includes('ewallet')) {
    return <Wallet className="h-4 w-4" />;
  }
  if (lower.includes('rdn') || lower.includes('stock') || lower.includes('emas') || lower.includes('gold')) {
    return <TrendingUp className="h-4 w-4" />;
  }
  return <CircleDollarSign className="h-4 w-4" />;
}

function getAccountColor(balance: number): string {
  if (balance >= 10000000) return 'text-emerald-600';
  if (balance >= 1000000) return 'text-blue-600';
  if (balance > 0) return 'text-amber-600';
  return 'text-muted-foreground';
}

export default function AccountBalances({ transactions }: AccountBalancesProps) {
  const accounts = getAccountBalances(transactions);
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  return (
    <div className="neu-raised bg-card rounded-2xl p-5 flex flex-col gap-4">
      <h3 className="text-lg font-semibold tracking-tight text-foreground">Account Balances</h3>

      <div className="rounded-xl p-4 bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-lg">
        <p className="text-xs opacity-80 uppercase tracking-wider">Total Net Worth</p>
        <p className="text-2xl font-bold mt-1">{formatCurrency(totalBalance)}</p>
      </div>

      <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
        {accounts.map((account, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-xl p-3 transition-all hover:bg-muted/50"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-xl flex items-center justify-center neu-pressed bg-card text-foreground shrink-0">
                {getAccountIcon(account.name)}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm text-foreground truncate">{account.name}</p>
                <p className="text-xs text-muted-foreground">
                  {totalBalance > 0 ? ((account.balance / totalBalance) * 100).toFixed(1) : 0}% of total
                </p>
              </div>
            </div>
            <p className={`font-semibold text-sm ${getAccountColor(account.balance)} shrink-0 ml-2`}>
              {formatCurrency(account.balance)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
