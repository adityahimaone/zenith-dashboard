"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Defs,
  LinearGradient,
  Stop,
} from "recharts";
import { MonthlyData } from "@/lib/types";
import { formatCurrency } from "@/lib/utils/calculations";

interface MonthlyChartProps {
  data: MonthlyData[];
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl px-4 py-3 shadow-xl border-0">
      <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center justify-between gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-muted-foreground capitalize">{p.dataKey}</span>
          </div>
          <span className="font-semibold text-foreground">{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function MonthlyChart({ data }: MonthlyChartProps) {
  return (
    <div className="neu-raised bg-card rounded-2xl p-5 flex flex-col gap-4 animate-fade-in-up">
      <h3 className="text-base font-semibold tracking-tight text-foreground">
        Income vs Expense
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5266eb" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#7c5cfc" stopOpacity={0.9} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f87171" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.9} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted) / 0.3)" }} />
            <Legend
              formatter={(value: string) => (
                <span className="text-xs text-muted-foreground capitalize">{value}</span>
              )}
              iconType="circle"
              iconSize={8}
            />
            <Bar dataKey="income" fill="url(#incomeGradient)" name="Income" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expense" fill="url(#expenseGradient)" name="Expense" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
