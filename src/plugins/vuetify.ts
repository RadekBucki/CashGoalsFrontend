import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createI18n, useI18n } from 'vue-i18n';
import { createVuetify } from 'vuetify';

import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';

import en from '@/locales/en.json';
import pl from '@/locales/pl.json';

export const i18n = createI18n({
  legacy: false,
  locale: navigator.language ?? import.meta.env.VITE_I18N_LOCALE,
  fallbackLocale: navigator.language ?? import.meta.env.VITE_I18N_FALLBACK_LOCALE,
  messages: {
    en,
    pl,
  },
});

// noinspection TypeScriptValidateTypes
export const vuetify = createVuetify({
  ssr: true,
  locale: {
    adapter: createVueI18nAdapter({
      i18n,
      useI18n,
    }),
  },
  theme: {
    defaultTheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          accent: '#FFC107',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          background: '#FFFFFF',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          accent: '#FFC107',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          background: '#121212',
        },
      },
    },
  },
});
