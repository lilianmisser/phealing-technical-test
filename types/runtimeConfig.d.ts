declare module "nuxt/schema" {
  interface RuntimeConfig {
    openFdaApiKey: string;
  }
  interface PublicRuntimeConfig {
    openFdaApiUrl: string;
  }
}

export {};
