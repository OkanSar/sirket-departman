if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  css: ['vuetify/styles/main.sass'],

  build: {
    transpile: ['vuetify'],
  },

  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBase: 'https://localhost:7229'
    }
  },
  modules: [
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: [
      { code: 'tr', file: 'tr.ts' },
      { code: 'en', file: 'en.ts' }
    ],
    langDir: 'locales/',
    defaultLocale: 'tr',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'locale',
      alwaysRedirect: false,
      fallbackLocale: 'tr'
    }
  }
})