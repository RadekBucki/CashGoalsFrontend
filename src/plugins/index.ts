import type { App } from 'vue';

// eslint-disable-next-line import/no-extraneous-dependencies
import { DefaultApolloClient } from '@vue/apollo-composable';

import ApolloClient from './apollo';
import { i18n, vuetify } from './vuetify';
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
    .use(pinia)
    .provide(DefaultApolloClient, ApolloClient);
}
