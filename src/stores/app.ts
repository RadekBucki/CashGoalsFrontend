import { defineStore } from 'pinia';

import { LoginOutput } from '@/graphql';

export default defineStore('app', {
  state: () => ({
    isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    loginOutput: null as LoginOutput | null,
    locale: navigator.language ?? import.meta.env.VITE_I18N_LOCALE,
  }),
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    },
    setLocale(locale: string) {
      this.locale = locale;
    },
    setLoginOutput(loginOutput: LoginOutput) {
      this.loginOutput = loginOutput;
    },
    getUserName(): string | undefined {
      return this.loginOutput?.user?.name;
    },
    getAccessToken(): string | undefined {
      return this.loginOutput?.accessToken;
    },
    getRefreshToken(): string | undefined {
      return this.loginOutput?.refreshToken;
    },
    logout() {
      this.loginOutput = null;
    },
    isUserLoggedIn() {
      return !!this.loginOutput;
    },
  },
  persist: true,
});
