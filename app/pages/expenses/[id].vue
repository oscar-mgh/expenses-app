<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useExpenses } from "~/composables/useExpenses";
import ExpenseForm from "~/components/expenses/ExpenseForm.vue";
import type { Expense } from "~~/types";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const { updateExpense, getExpenseById, deleteExpense } = useExpenses();

const expense = ref<Expense | null>(null);
const loading = ref(true);
const formLoading = ref(false);
const error = ref<string | null>(null);

const expenseId = computed(() => Number(route.params.id));

const loadExpense = async () => {
  loading.value = true;
  error.value = null;
  try {
    expense.value = await getExpenseById(expenseId.value);
  } catch (err: any) {
    error.value = err.message || "Error al cargar el gasto";
    toast.add({
      title: "Error",
      description: error.value || "Error al cargar el gasto",
      color: "error",
    });
    router.push("/");
  } finally {
    loading.value = false;
  }
};

const handleUpdateExpense = async (data: Omit<Expense, "id" | "date">) => {
  if (!expense.value) return;

  formLoading.value = true;
  try {
    await updateExpense(expense.value.id, data);
    toast.add({
      title: "Gasto actualizado",
      description: "Cambios guardados correctamente.",
      color: "success",
    });
    router.push("/");
  } catch (err: any) {
    toast.add({
      title: "Error",
      description: err.message || "Error al actualizar",
      color: "error",
    });
  } finally {
    formLoading.value = false;
  }
};

const handleDeleteExpense = async () => {
  if (!expense.value?.id) return;

  formLoading.value = true;
  try {
    await deleteExpense(expense.value.id);
    toast.add({
      title: "Gasto eliminado",
      color: "success",
    });
    router.push("/");
  } catch (err: any) {
    toast.add({
      title: "Error",
      color: "error",
    });
  } finally {
    formLoading.value = false;
  }
};

const handleCancel = () => {
  router.push("/");
};

onMounted(() => {
  if (isNaN(expenseId.value)) {
    router.push("/");
    return;
  }
  loadExpense();
});
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-3xl">
    <h1 class="text-3xl text-center mt-2 mb-6 font-bold">Editar Gasto</h1>

    <div v-if="loading" class="flex justify-center py-12">
      <UIcon
        name="i-heroicons-arrow-path"
        class="animate-spin text-2xl text-primary-500"
      />
    </div>

    <UAlert
      v-else-if="error"
      color="error"
      variant="soft"
      title="Error"
      :description="error"
      class="mb-4"
    />

    <UCard v-else-if="expense">
      <ExpenseForm
        :expense="expense"
        :loading="formLoading"
        @delete="handleDeleteExpense"
        @submit="handleUpdateExpense"
        @cancel="handleCancel"
      />
    </UCard>
  </div>
</template>
