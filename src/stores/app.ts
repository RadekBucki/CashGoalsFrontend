import { defineStore } from 'pinia';

import { AuthorizationOutput, User } from '@/graphql';
import messages from '@/locales';

export default defineStore('app', {
  state: () => ({
    isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    authorizationOutput: null as AuthorizationOutput | null,
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
    setAuthorizationOutput(authorizationOutput: AuthorizationOutput) {
      this.authorizationOutput = authorizationOutput;
      this.locale = authorizationOutput.user?.locale ?? this.locale;
      this.isDarkMode = authorizationOutput.user?.theme === 'DARK'
        || (
          authorizationOutput.user?.theme === 'SYSTEM'
          && window.matchMedia('(prefers-color-scheme: dark)').matches
        );
    },
    setUser(user: User) {
      if (!this.authorizationOutput) {
        return;
      }
      this.authorizationOutput.user = user;
      this.locale = user?.locale ?? this.locale;
      this.isDarkMode = user?.theme === 'DARK'
        || (
          user?.theme === 'SYSTEM'
          && window.matchMedia('(prefers-color-scheme: dark)').matches
        );
    },
    getUserName(): string | undefined {
      return this.authorizationOutput?.user?.name;
    },
    getAccessToken(): string | undefined {
      return this.authorizationOutput?.accessToken;
    },
    getRefreshToken(): string | undefined {
      return this.authorizationOutput?.refreshToken;
    },
    logout(): void {
      this.authorizationOutput = null;
    },
    isUserLoggedIn(): boolean {
      return !!this.authorizationOutput;
    },
  },
  persist: true,
});
