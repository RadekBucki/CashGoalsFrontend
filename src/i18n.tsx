import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en_US from './locales/en_US.json';
import pl_PL from './locales/pl_PL.json';

// noinspection JSIgnoredPromiseFromCall
i18n.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      pl: { translation: pl_PL },
      en: { translation: en_US },
    },
  });
