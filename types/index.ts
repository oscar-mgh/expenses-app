export interface Expense {
  id: number;
  description: string;
  amount: string;
  category?: string | null;
}
