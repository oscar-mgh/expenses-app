<script setup lang="ts">
import { ref } from "vue";
import { useExpenses } from "~/composables/useExpenses";
import ExpenseForm from "~/components/expenses/ExpenseForm.vue";
import type { Expense } from "~~/types";

const router = useRouter();
const toast = useToast();
const { createExpense } = useExpenses();

const formLoading = ref(false);

const handleCreateExpense = async (data: Omit<Expense, "id" | "date">) => {
  formLoading.value = true;
  try {
    await createExpense(data);
    toast.add({
      title: "Gasto creado",
      description: "El gasto se ha registrado exitosamente.",
      color: "success",
    });
    router.push("/");
  } catch (err: any) {
    toast.add({
      title: "Error",
      description:
        err.message ||
        "Error al crear el gasto, revisa que los datos sean correctos",
      color: "error",
    });
  } finally {
    formLoading.value = false;
  }
};

const handleCancel = () => {
  router.push("/");
};
</script>

<template>
  <div class="container mx-auto px-4 py-6 max-w-3xl">
    <h1 class="text-3xl text-center mt-2 mb-6 font-bold">Nuevo Gasto</h1>

    <UCard>
      <ExpenseForm
        :loading="formLoading"
        @submit="handleCreateExpense"
        @cancel="handleCancel"
      />
    </UCard>
  </div>
</template>
