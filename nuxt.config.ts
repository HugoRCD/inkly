// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/scripts', '@vueuse/nuxt'],

  compatibilityDate: '2024-04-03',

  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1',
      charset: 'utf-8',
    },
  },

  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4
  },

  routeRules: {
    '/': { isr: true, prerender: true },
  },

  css: ['~/assets/style/main.css'],

  icon: {
    mode: 'svg',
    customCollections: [
      {
        prefix: 'custom',
        dir: './assets/icons',
      },
    ],
  }
})
