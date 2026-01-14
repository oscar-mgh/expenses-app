<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { onUnmounted, ref, watch } from "vue";
import * as zod from "zod";
import type { Expense, ExpenseFormValues } from "~~/types";

const props = defineProps<{
  expense?: Expense;
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: "submit", data: Omit<Expense, "id" | "date">): void;
  (e: "cancel"): void;
  (e: "delete"): void;
}>();

const schema = toTypedSchema(
  zod.object({
    description: zod
      .string()
      .min(1, "Este campo es obligatorio")
      .min(5, "Mínimo 5 caracteres"),
    category: zod
      .string()
      .min(1, "Este campo es obligatorio")
      .max(50, "Máximo 50 caracteres"),
    amount: zod.coerce
      .string()
      .refine(
        (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
        "Máximo 2 decimales"
      ),
  })
);

const { values, errors, defineField, handleSubmit, setValues, meta } =
  useForm<ExpenseFormValues>({
    validationSchema: schema,
    initialValues: {
      description: "",
      category: "",
      amount: "0",
    },
  });

const [description, descriptionProps] = defineField("description");
const [category, categoryProps] = defineField("category");
const [amount, amountProps] = defineField("amount");

watch(
  () => props.expense,
  (newExpense) => {
    if (newExpense) {
      setValues({
        description: newExpense.description,
        category: newExpense.category ?? "",
        amount: newExpense.amount,
      });
    }
  },
  { immediate: true }
);

const isConfirming = ref(false);
let timer: ReturnType<typeof setTimeout> | null = null;

const onFormSubmit = handleSubmit((values) => {
  emit("submit", {
    description: values.description.trim(),
    category: values.category || null,
    amount: values.amount as string,
  });
});

const handleDeleteClick = () => {
  if (!isConfirming.value) {
    isConfirming.value = true;
    timer = setTimeout(() => (isConfirming.value = false), 3000);
  } else {
    if (timer) clearTimeout(timer);
    isConfirming.value = false;
    emit("delete");
  }
};

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <UForm class="space-y-6" @submit="onFormSubmit">
    <div class="flex flex-wrap gap-4">
      <UFormField
        label="Descripcion"
        required
        :error="errors.description"
        class="w-full"
      >
        <UTextarea
          v-model="description"
          v-bind="descriptionProps"
          placeholder="Ej. Comida en restaurante"
          :disabled="loading"
          class="w-full"
        />
      </UFormField>

      <UFormField
        label="Categoria"
        required
        :error="errors.category"
        class="flex-1"
      >
        <UInput
          v-model="category"
          v-bind="categoryProps"
          placeholder="Ej. Comida"
          :disabled="loading"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Monto" required :error="errors.amount" class="flex-1">
        <UInput
          v-model="amount"
          v-bind="amountProps"
          type="number"
          step="0.01"
          placeholder="0.00"
          :disabled="loading"
          class="w-full"
        />
      </UFormField>
    </div>

    <div
      class="flex items-center justify-between gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800"
    >
      <UButton variant="subtle" color="neutral" @click="emit('cancel')">
        Cancelar
      </UButton>

      <div class="flex items-center gap-3 ml-auto">
        <UButton
          v-if="expense"
          color="error"
          :variant="isConfirming ? 'solid' : 'soft'"
          :disabled="loading"
          icon="i-heroicons-trash"
          @click="handleDeleteClick"
        >
          <b>{{ isConfirming ? "Confirmar" : "Eliminar" }}</b>
        </UButton>

        <UButton
          type="submit"
          color="success"
          :loading="loading"
          icon="i-heroicons-check"
        >
          Guardar
        </UButton>
      </div>
    </div>
  </UForm>
</template>
