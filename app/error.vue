<script setup lang="ts">
import type { NuxtError } from "#app";

type NuxtErrorAndUrl = NuxtError & {
  url: string;
};

defineProps<{
  error: NuxtErrorAndUrl;
}>();

const router = useRouter();

const handleError = () => {
  clearError({ redirect: "/" });
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <u-app>
    <div class="min-h-screen flex items-center justify-center p-5">
      <div class="max-w-120 w-full text-center">
        <div class="relative mb-8">
          <h1
            class="text-[clamp(3rem,20vw,7rem)] font-black text-primary m-0 leading-none"
          >
            {{ error.statusCode || 404 }}
          </h1>
          <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-xl animate-[pulse_2s_ease-in-out_infinite]"
          ></div>
        </div>

        <div class="mb-12">
          <h2
            class="text-[clamp(1.5rem,4vw,2.5rem)] text-primary mb-4 font-bold"
          >
            {{
              error.statusCode === 404
                ? "Página no encontrada"
                : "Algo salió mal"
            }}
          </h2>
          <p class="text-lg text-white/70 leading-relaxed m-0">
            {{
              error.statusCode === 404
                ? "Lo sentimos, la página que estás buscando no existe"
                : "Hubo un error inesperado en el servidor."
            }}
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            class="px-8 py-3 bg-primary text-zinc-800 font-bold rounded-lg hover:-translate-y-0.5 transition-transform cursor-pointer duration-200"
            @click="handleError"
          >
            Volver al inicio
          </button>

          <button
            class="px-8 py-3 border-2 border-primary/30 text-primary font-bold rounded-lg hover:bg-primary/10 transition-colors cursor-pointer duration-200"
            @click="goBack"
          >
            Ir atrás
          </button>
        </div>
      </div>
    </div>
  </u-app>
</template>
