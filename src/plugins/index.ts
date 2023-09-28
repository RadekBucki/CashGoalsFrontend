import type { App } from 'vue';

import { DefaultApolloClient } from '@vue/apollo-composable';

import useApolloClient from './apollo';
import pinia from './pinia.ts';
import router from './router.ts';
import useVuetify from './vuetify';
import loadFonts from './webfontloader';

export default function registerPlugins(app: App) {
  // noinspection JSIgnoredPromiseFromCall
  loadFonts();
  app.use(pinia)
    .use(router);

  const { vuetify, i18n } = useVuetify();
  app.use(vuetify)
    .use(i18n);

  const getApolloClient = useApolloClient(vuetify.locale);
  app.provide(DefaultApolloClient, getApolloClient());
}
