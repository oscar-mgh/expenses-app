<template>
  <main>
    <UHeader>
      <template #left>
        <NuxtLink to="/" class="flex items-center gap-2">
          <UIcon name="i-heroicons-currency-dollar" class="text-xl" />
          <span class="font-semibold text-lg">Gestor de gastos</span>
        </NuxtLink>
      </template>

      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>
    <slot></slot>
  </main>
</template>

<style scoped>
:deep(.header-button-mobile),
:deep(button[aria-label="Open Menu"]),
:deep(button.lg\:hidden) {
  display: none !important;
}
</style>
