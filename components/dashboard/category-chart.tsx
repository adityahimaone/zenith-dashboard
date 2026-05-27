"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { CategoryBreakdown } from "@/lib/types";
import { formatCurrency } from "@/lib/utils/calculations";

interface CategoryChartProps {
  data: CategoryBreakdown[];
}

const COLORS = [
  "#5266eb",
  "#7c5cfc",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#ec4899",
  "#f97316",
];

const DARK_COLORS = [
  "#6d7dff",
  "#9b7dff",
  "#34d399",
  "#fbbf24",
  "#f87171",
  "#22d3ee",
  "#f472b6",
  "#fb923c",
];

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="glass rounded-xl px-4 py-3 shadow-xl border-0">
      <p className="text-sm font-semibold text-foreground">{d.category}</p>
      <p className="text-lg font-bold text-foreground mt-0.5">
        {formatCurrency(d.amount)}
      </p>
      <p className="text-xs text-muted-foreground">{d.percentage.toFixed(1)}% of total</p>
    </div>
  );
}

export default function CategoryChart({ data }: CategoryChartProps) {
  const total = data.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="neu-raised bg-card rounded-2xl p-5 flex flex-col gap-4 animate-fade-in-up">
      <h3 className="text-base font-semibold tracking-tight text-foreground">
        Expense by Category
      </h3>
      <div className="h-[300px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={3}
              dataKey="amount"
              nameKey="category"
              strokeWidth={0}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value: string) => (
                <span className="text-xs text-muted-foreground">{value}</span>
              )}
              iconType="circle"
              iconSize={8}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center total */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Total</p>
          <p className="text-base font-bold text-foreground">{formatCurrency(total)}</p>
        </div>
      </div>
    </div>
  );
}
