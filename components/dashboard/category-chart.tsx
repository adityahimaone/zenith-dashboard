'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CategoryBreakdown } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/calculations';

interface CategoryChartProps {
  data: CategoryBreakdown[];
}

const COLORS = [
  '#0ea5e9', // Sky
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444', // Rose
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#14b8a6', // Teal
  '#f97316', // Orange
];

export default function CategoryChart({ data }: CategoryChartProps) {
  return (
    <div className="neu-raised bg-card rounded-2xl p-5 flex flex-col gap-4">
      <h3 className="text-lg font-semibold tracking-tight text-foreground">Expense by Category</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="amount"
              nameKey="category"
              label={({ category, percentage }) => `${category} (${percentage.toFixed(0)}%)`}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(label) => label}
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                border: 'none',
                padding: '0.75rem',
              }}
            />
            <Legend
              formatter={(value: string) => (
                <span className="text-xs text-muted-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
