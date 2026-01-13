<script setup lang="ts">
const categoryInput = ref("");
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
  </div>
</template>
