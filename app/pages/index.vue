<script setup lang="ts">
import { onMounted, ref } from "vue";
import ExpenseTable from "~/components/expenses/ExpenseTable.vue";
import { useExpenses } from "~/composables/useExpenses";

const { expenses, meta, loading, fetchExpenses } = useExpenses();

const currentPage = ref(1);
const selectedCategory = ref("");

const loadExpenses = async () => {
  await fetchExpenses({
    page: currentPage.value,
    limit: 10,
    category: selectedCategory.value || undefined,
  });
};

const categoryInput = ref("");

const handlePageChange = (page: number) => {
  currentPage.value = page;
  loadExpenses();
};

onMounted(() => {
  loadExpenses();
});
</script>

<template>
  <div class="container m-auto px-4 py-8 max-w-7xl">
    <div class="flex flex-col sm:flex-row justify-between gap-4 mb-6">
      <UInput
        v-model="categoryInput"
        placeholder="Filtrar por categoría..."
        icon="i-heroicons-tag"
        class="w-full sm:max-w-sm"
      />

      <UButton
        to="/expenses/create"
        color="primary"
        icon="i-heroicons-plus"
        class="flex justify-center"
      >
        <b>Nuevo Gasto</b>
      </UButton>
    </div>

    <ExpenseTable
      :expenses="expenses"
      :meta="meta"
      :loading="loading"
      @page-change="handlePageChange"
      @select="(expense) => navigateTo(`/expenses/${expense.id}`)"
    />
  </div>
</template>
