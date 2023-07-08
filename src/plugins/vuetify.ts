import '@mdi/font/css/materialdesignicons.css';
// eslint-disable-next-line import/extensions
import 'vuetify/styles';
import { createVuetify } from 'vuetify';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-unused-vars
import en from '@/locales/en.json';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-unused-vars
import pl from '@/locales/pl.json';

export default createVuetify({
  locale: {
    locale: 'en',
    fallback: 'en',
    messages: { en, pl },
  },
});
