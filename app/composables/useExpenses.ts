import { ref } from "vue";
import type { Expense, PaginatedResponse } from "~~/types";

interface FetchOptions {
  page?: number;
  limit?: number;
  category?: string;
}

export const useExpenses = () => {
  const { api } = useApi();

  const expenses = ref<Expense[]>([]);
  const meta = ref({
    total: 0,
    page: 1,
    lastPage: 1,
  });
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchExpenses = async (options: FetchOptions = {}) => {
    loading.value = true;
    error.value = null;

    try {
      const params = new URLSearchParams();
      if (options.page) params.append("page", options.page.toString());
      if (options.limit) params.append("limit", options.limit.toString());
      if (options.category) params.append("category", options.category);

      const queryString = params.toString();
      const url = `/expenses${queryString ? `?${queryString}` : ""}`;
      const res = await api.get<PaginatedResponse<Expense>>(url);
      expenses.value = res.data;
      meta.value = res.meta;
    } catch (err) {
      error.value = "Error al cargar los gastos";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const createExpense = async (expense: Omit<Expense, "id" | "date">) => {
    try {
      const newExpense = await api.post<Expense>("/expenses", expense);
      return newExpense;
    } catch (err) {
      throw new Error("Error al crear el gasto");
    }
  };

  const updateExpense = async (
    id: number,
    updates: Partial<Omit<Expense, "id" | "date">>
  ) => {
    try {
      const updated = await api.patch<Expense>(`/expenses/${id}`, updates);
      return updated;
    } catch (err) {
      throw new Error("Error al actualizar el gasto");
    }
  };

  const deleteExpense = async (id: number) => {
    try {
      await api.delete(`/expenses/${id}`);
    } catch (err) {
      throw new Error("Error al eliminar el gasto");
    }
  };

  const getExpenseById = async (id: number) => {
    try {
      const expense = await api.get<Expense>(`/expenses/${id}`);
      return expense;
    } catch (err) {
      throw new Error("No se encontro el gasto");
    }
  };

  return {
    expenses,
    meta,
    loading,
    error,
    fetchExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
    getExpenseById,
  };
};
