import { defineStore } from 'pinia';

export default defineStore('app', {
  state: () => ({
    isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  }),
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    },
  },
  persist: true,
});
