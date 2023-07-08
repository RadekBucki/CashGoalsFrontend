import { createI18n } from 'vue-i18n';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import en from './locales/en.json';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pl from './locales/pl.json';

export default createI18n({
  legacy: false,
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: {
    en,
    pl,
  },
});
