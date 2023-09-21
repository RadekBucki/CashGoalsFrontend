import { createPinia } from 'pinia';
// eslint-disable-next-line import/no-extraneous-dependencies
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
export default pinia;
