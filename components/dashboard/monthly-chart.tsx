'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MonthlyData } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/calculations';

interface MonthlyChartProps {
  data: MonthlyData[];
}

export default function MonthlyChart({ data }: MonthlyChartProps) {
  return (
    <div className="neu-raised bg-card rounded-2xl p-5 flex flex-col gap-4">
      <h3 className="text-lg font-semibold tracking-tight text-foreground">Income vs Expense (Monthly)</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#707070" />
            <YAxis
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              tick={{ fontSize: 12 }}
              stroke="#707070"
            />
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
            <Bar dataKey="income" fill="#10b981" name="Income" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expense" fill="#ef4444" name="Expense" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
