<script setup lang="ts">
import type { TableColumn, TableRow } from "@nuxt/ui";
import type { Expense } from "~~/types";
import EmptyState from "./EmptyState.vue";

const table = useTemplateRef("table");

const { meta } = defineProps<{
  expenses: Expense[];
  loading: boolean;
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}>();

const emit = defineEmits<{
  (e: "page-change", page: number): void;
  (e: "select", expense: Expense): void;
}>();

const columns: TableColumn<Expense>[] = [
  {
    accessorKey: "updatedAt",
    header: "Última Modificación",
    cell: ({ row }) => {
      const dateValue = row.getValue<string>("updatedAt");
      if (!dateValue) return "Sin modificar";

      const date = new Date(dateValue);
      if (isNaN(date.getTime())) return "Fecha inválida";

      return new Intl.DateTimeFormat("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
        .format(date)
        .replace(",", " -");
    },
  },
  {
    accessorKey: "description",
    header: "Descripcion",
    cell: ({ row }) => {
      const description = row.getValue<string>("description");
      return description?.trim() || "Sin descripcion";
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => {
      const category = row.getValue<string | null>("category");
      return category ?? "Sin categoria";
    },
  },
  {
    accessorKey: "amount",
    header: "Cantidad",
    cell: ({ row }) => {
      const amount = row.getValue<string>("amount");
      return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(Number(amount) || 0);
    },
  },
];

const pagination = ref({
  pageIndex: meta.page - 1,
  pageSize: meta.lastPage,
});

const onSelect = (_e: any, row: TableRow<Expense>) => {
  if (row?.original) {
    emit("select", row.original);
  }
};
</script>

<template>
  <div v-if="loading" class="min-h-120 flex justify-center items-center py-10">
    <UIcon
      name="i-heroicons-arrow-path"
      class="animate-spin text-3xl text-primary"
    />
  </div>

  <div
    v-else-if="Array.isArray(expenses) && expenses.length === 0"
    class="py-10"
  >
    <EmptyState
      title="No hay gastos"
      description="Agrega nuevos gastos para verlos aquí."
    />
  </div>

  <div
    v-else
    class="space-y-4 pb-4 border border-default rounded-xl overflow-hidden"
  >
    <UTable
      :data="expenses"
      :columns="columns"
      :pagination="pagination"
      class="flex-1 cursor-pointer"
      @select="onSelect"
    />

    <div class="flex justify-end border-t border-default pt-4 px-4">
      <UPagination
        :page="meta.page"
        :items-per-page="10"
        :total="meta.total"
        @update:page="(p) => emit('page-change', p)"
      />
    </div>
  </div>
</template>
