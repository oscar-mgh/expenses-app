export default defineNuxtConfig({
  modules: ["@nuxt/ui"],
  devtools: {
    enabled: true,
  },
  devServer: {
    port: 5173,
  },
  css: ["~/assets/css/main.css"],
  routeRules: {
    "/": { prerender: false },
  },
  ssr: false,
  nitro: {
    preset: "netlify",
  },
  runtimeConfig: {
    public: {
      apiBase: "",
    },
  },
  compatibilityDate: "2025-01-15",
});
