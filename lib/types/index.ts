export interface Transaction {
  timestamp: string;
  description: string;
  amount: number;
  type: 'Income' | 'Expense';
  category: string;
  source: string;
  balance: number;
}

export interface AccountBalance {
  name: string;
  balance: number;
}

export interface DashboardMetrics {
  totalIncome: number;
  totalExpense: number;
  netSavings: number;
  netWorth: number;
  lastUpdated: string;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

export interface MonthlyData {
  month: string;
  income: number;
  expense: number;
  savings: number;
}
