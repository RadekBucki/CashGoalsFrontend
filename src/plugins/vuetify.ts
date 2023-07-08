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
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
});
