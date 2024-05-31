// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-primevue"],
  imports: {
    autoImport: false,
  },
  css: [
    "primevue/resources/themes/aura-dark-green/theme.css",
    "primeicons/primeicons.css",
  ],
});
