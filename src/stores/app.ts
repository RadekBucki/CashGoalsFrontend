import { defineStore } from 'pinia';

import { LoginOutput } from '@/graphql';
import messages from '@/locales';

export default defineStore('app', {
  state: () => ({
    isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    loginOutput: null as LoginOutput | null,
    locale: navigator.language ?? import.meta.env.VITE_I18N_LOCALE,
    localeNames: Object.keys(messages),
  }),
  actions: {
    toggleDarkMode(): void {
      this.isDarkMode = !this.isDarkMode;
    },
    setLocale(locale: string): void {
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
    logout(): void {
      this.loginOutput = null;
    },
    isUserLoggedIn(): boolean {
      return !!this.loginOutput;
    },
  },
  persist: true,
});
