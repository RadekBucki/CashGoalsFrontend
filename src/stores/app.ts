import { defineStore } from 'pinia';

import { LoginOutput } from '@/graphql';

export default defineStore('app', {
  state: () => ({
    isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    user: null as LoginOutput | null,
  }),
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    },
    setUser(user: LoginOutput) {
      this.user = user;
    },
    logout() {
      this.user = null;
    },
    isUserLoggedIn() {
      return !!this.user;
    },
  },
  persist: true,
});
