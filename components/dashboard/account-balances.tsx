'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  return 'text-gray-500';
}

export default function AccountBalances({ transactions }: AccountBalancesProps) {
  const accounts = getAccountBalances(transactions);
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Account Balances</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Total Net Worth</p>
          <p className="text-2xl font-bold">{formatCurrency(totalBalance)}</p>
        </div>
        <div className="space-y-3 max-h-[300px] overflow-y-auto">
          {accounts.map((account, idx) => (
            <div key={idx} className="flex items-center justify-between border-b pb-2 last:border-b-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {getAccountIcon(account.name)}
                </div>
                <div>
                  <p className="font-medium text-sm">{account.name}</p>
                  <p className="text-xs text-gray-500">
                    {((account.balance / totalBalance) * 100).toFixed(1)}% of total
                  </p>
                </div>
              </div>
              <p className={`font-semibold text-sm ${getAccountColor(account.balance)}`}>
                {formatCurrency(account.balance)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
