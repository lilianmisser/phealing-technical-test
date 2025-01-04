// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },

  runtimeConfig: {
    openFdaApiKey: process.env.OPEN_FDA_API_KEY,
    public: {
      openFdaApiUrl: "https://api.fda.gov/drug/ndc.json",
    },
  },

  modules: ["@nuxt/ui"],
});
