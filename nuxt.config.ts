import manifest from "./contextManifest.json";
import { ManifestV2 } from "@uniformdev/context";

export default defineNuxtConfig({
  experimental: {
    noVueServer: true
  },
  nitro: {
    prerender: {
      routes: ["/"]
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },

  build: {
    transpile: ['vueticol']
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
    '@uniformdev/uniform-nuxt',
    '@nuxtjs/tailwindcss',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
    '@nuxtjs/supabase'
  ],

  uniform: {
    projectId: process.env.UNIFORM_PROJECT_ID,
    readOnlyApiKey: process.env.UNIFORM_API_KEY,
    apiHost: process.env.UNIFORM_CLI_BASE_URL,
    edgeApiHost: process.env.UNIFORM_CLI_BASE_EDGE_URL,
    manifest: manifest as ManifestV2,
    defaultConsent: true,
    outputType: "standard",
  },

  imports: {
    dirs: ['store'],
  },

  image: {
    provider: 'cloudinary',
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dwfcofnrd/image/upload',
    }
  },
})
