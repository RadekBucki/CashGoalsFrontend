import type { App } from 'vue';

import { DefaultApolloClient } from '@vue/apollo-composable';

import useApolloClient from './apollo';
import pinia from './pinia.ts';
import router from './router.ts';
import { i18n, vuetify } from './vuetify';
import loadFonts from './webfontloader';

export default function registerPlugins(app: App) {
  // noinspection JSIgnoredPromiseFromCall
  loadFonts();
  app.use(i18n)
    .use(vuetify)
    .use(router)
    .use(pinia);
  const getApolloClient = useApolloClient(vuetify.locale);
  app.provide(DefaultApolloClient, getApolloClient());
}
