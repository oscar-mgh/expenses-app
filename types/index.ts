export interface Expense {
  id: number;
  description: string;
  amount: string;
  category?: string | null;
}

export interface PaginationMeta {
  total: number;
  page: number;
  lastPage: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ExpenseFormValues {
  description: string;
  category: string;
  amount: string;
}
