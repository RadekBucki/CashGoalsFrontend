import type { App } from 'vue';

import { vuetify, i18n } from './vuetify';
import loadFonts from './webfontloader';
import router from '../router';
import pinia from '../store';

export default function registerPlugins(app: App) {
  // noinspection JSIgnoredPromiseFromCall
  loadFonts();
  // noinspection TypeScriptValidateTypes
  app.use(i18n)
    .use(vuetify)
    .use(router)
    .use(pinia);
}
