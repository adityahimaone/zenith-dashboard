import { Transaction, CategoryBreakdown, MonthlyData } from '../types';

export function calculateCategoryBreakdown(transactions: Transaction[]): CategoryBreakdown[] {
  const expenses = transactions.filter((t) => t.type === 'Expense');
  const categoryMap = new Map<string, number>();

  expenses.forEach((t) => {
    const current = categoryMap.get(t.category) || 0;
    categoryMap.set(t.category, current + Math.abs(t.amount));
  });

  const total = Array.from(categoryMap.values()).reduce((a, b) => a + b, 0);

  return Array.from(categoryMap.entries())
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function calculateMonthlyData(transactions: Transaction[]): MonthlyData[] {
  const monthMap = new Map<string, { income: number; expense: number }>();

  transactions.forEach((t) => {
    const date = new Date(t.timestamp);
    const month = date.toLocaleString('en-US', { year: 'numeric', month: 'short' });

    const current = monthMap.get(month) || { income: 0, expense: 0 };

    if (t.type === 'Income') {
      current.income += t.amount;
    } else {
      current.expense += Math.abs(t.amount);
    }

    monthMap.set(month, current);
  });

  return Array.from(monthMap.entries())
    .map(([month, data]) => ({
      month,
      income: data.income,
      expense: data.expense,
      savings: data.income - data.expense,
    }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
}

export function getAccountBalances(transactions: Transaction[]) {
  const accountMap = new Map<string, number>();

  transactions.forEach((t) => {
    accountMap.set(t.source, t.balance);
  });

  return Array.from(accountMap.entries())
    .map(([name, balance]) => ({ name, balance }))
    .sort((a, b) => b.balance - a.balance);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
