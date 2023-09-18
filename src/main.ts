import { createApp } from 'vue';

import App from './App.vue';
import registerPlugins from '@/plugins';

const app = createApp(App);

app.runWithContext(() => {
  registerPlugins(app);
  app.mount('#app');
});
