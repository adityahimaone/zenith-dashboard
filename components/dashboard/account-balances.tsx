"use client";

import { Transaction } from "@/lib/types";
import { formatCurrency, getAccountBalances } from "@/lib/utils/calculations";
import { Landmark, Wallet, TrendingUp, CircleDollarSign } from "lucide-react";

interface AccountBalancesProps {
  transactions: Transaction[];
}

function getAccountIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("bank") || lower.includes("bca") || lower.includes("bri") || lower.includes("mandiri"))
    return <Landmark className="h-4 w-4" />;
  if (lower.includes("gopay") || lower.includes("ovo") || lower.includes("shopeepay") || lower.includes("ewallet"))
    return <Wallet className="h-4 w-4" />;
  if (lower.includes("rdn") || lower.includes("stock") || lower.includes("emas") || lower.includes("gold"))
    return <TrendingUp className="h-4 w-4" />;
  return <CircleDollarSign className="h-4 w-4" />;
}

const DOT_COLORS = [
  "bg-indigo-500",
  "bg-violet-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-pink-500",
  "bg-teal-500",
];

function getAccountColor(balance: number): string {
  if (balance >= 10000000) return "text-emerald-600 dark:text-emerald-400";
  if (balance >= 1000000) return "text-indigo-600 dark:text-indigo-400";
  if (balance > 0) return "text-amber-600 dark:text-amber-400";
  return "text-muted-foreground";
}

export default function AccountBalances({ transactions }: AccountBalancesProps) {
  const accounts = getAccountBalances(transactions);
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  return (
    <div className="neu-raised bg-card rounded-2xl p-5 flex flex-col gap-4 animate-fade-in-up">
      <h3 className="text-base font-semibold tracking-tight text-foreground">Account Balances</h3>

      {/* Total Net Worth — animated gradient */}
      <div className="rounded-xl p-5 bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 text-white shadow-xl shadow-indigo-500/20 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer" />
        <p className="text-xs opacity-80 uppercase tracking-wider relative z-10">Total Net Worth</p>
        <p className="text-2xl font-bold mt-1 relative z-10">{formatCurrency(totalBalance)}</p>
      </div>

      {/* Account list */}
      <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
        {accounts.map((account, idx) => {
          const pct = totalBalance > 0 ? (account.balance / totalBalance) * 100 : 0;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-xl p-3 transition-all hover:bg-muted/50 group"
            >
              {/* Icon */}
              <div className="h-9 w-9 rounded-xl flex items-center justify-center neu-pressed bg-card text-foreground shrink-0">
                {getAccountIcon(account.name)}
              </div>

              {/* Info + progress */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full shrink-0 ${DOT_COLORS[idx % DOT_COLORS.length]}`} />
                  <p className="font-medium text-sm text-foreground truncate">{account.name}</p>
                </div>
                {/* Progress bar */}
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${DOT_COLORS[idx % DOT_COLORS.length]} transition-all duration-700`}
                    style={{ width: `${Math.max(pct, 2)}%` }}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {pct.toFixed(1)}% of total
                </p>
              </div>

              {/* Balance */}
              <p className={`font-semibold text-sm ${getAccountColor(account.balance)} shrink-0 ml-2`}>
                {formatCurrency(account.balance)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
