import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import { createI18n, useI18n } from 'vue-i18n';
import { createVuetify } from 'vuetify';

import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';

import messages from '@/locales';
import useAppStore from '@/stores/app.ts';

export default function useVuetify() {
  const appStore = useAppStore();

  const i18n = createI18n({
    legacy: false,
    locale: appStore.locale,
    fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE ?? 'en',
    messages,
  });

  const vuetify = createVuetify({
    ssr: true,
    locale: {
      adapter: createVueI18nAdapter({
        i18n,
        useI18n,
      }),
    },
    theme: {
      defaultTheme: appStore.isDarkMode ? 'dark' : 'light',
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#FFFFFF',
            secondary: '#F2F2F2',
            accent: '#FFC107',
            error: '#FF5722',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FF9800',
            background: '#F9F9F9',
          },
        },
        dark: {
          dark: true,
          colors: {
            primary: '#212121',
            secondary: '#303030',
            accent: '#FFC107',
            error: '#FF5722',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FF9800',
            background: '#121212',
          },
        },
      },
    },
  });

  return { vuetify, i18n };
}
