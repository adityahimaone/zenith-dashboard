"use client";

import { Transaction } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils/calculations";
import { useState } from "react";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const FILTERS = [
  { key: "all" as const, label: "All" },
  { key: "income" as const, label: "Income" },
  { key: "expense" as const, label: "Expense" },
];

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");

  const filtered = transactions.filter((t) => {
    if (filter === "all") return true;
    return t.type.toLowerCase() === filter;
  });

  const recent = filtered.slice(-10).reverse();

  return (
    <div className="neu-raised bg-card rounded-2xl p-5 flex flex-col gap-4 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          Recent Transactions
        </h3>
        <div className="flex gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                filter === f.key
                  ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/25"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No transactions found
          </p>
        ) : (
          recent.map((t, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between rounded-xl p-3 transition-all hover:bg-muted/50 group
                border-l-2 ${
                  t.type === "Income"
                    ? "border-l-emerald-500 hover:shadow-[inset_0_0_0_1px_rgba(16,185,129,0.1)]"
                    : "border-l-rose-500 hover:shadow-[inset_0_0_0_1px_rgba(244,63,94,0.1)]"
                }`}
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground truncate">
                  {t.description}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {formatDate(t.timestamp)} · {t.category} · {t.source}
                </p>
              </div>
              <span
                className={`font-bold text-sm shrink-0 ml-3 ${
                  t.type === "Income"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {t.type === "Income" ? "+" : "−"}
                {formatCurrency(Math.abs(t.amount))}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
