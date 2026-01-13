<template>
  <div class="text-center py-12">
    <UIcon name="i-heroicons-inbox-arrow-down" class="text-4xl mx-auto mb-4" />
    <h3 class="text-lg font-semibold">{{ title }}</h3>
    <p class="mt-5">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>
