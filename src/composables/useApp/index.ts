import { useLocale, useTheme } from 'vuetify';

import useAuthorization from '@/composables/useApp/useAuthorization.ts';
import useAppStore from '@/configuration/appStore.ts';
import { AuthorizationOutput, User } from '@/graphql';

/**
 * appStore.ts adapter
 * @see @/configuration/appStore.ts
 */
export default function useApp() {
  const appStore = useAppStore();
  const { isUserLoggedIn, getUserName, logout, localeNames, locale } = appStore;

  const theme = useTheme();
  const { current } = useLocale();
  const { authorize } = useAuthorization();

  function setLocale(newLocale: string): void {
    appStore.setLocale(newLocale);
    current.value = appStore.locale;
  }

  function setAuthorizationOutput(authorizationOutput: AuthorizationOutput): void {
    appStore.setAuthorizationOutput(authorizationOutput);
    theme.global.name.value = appStore.isDarkMode ? 'dark' : 'light';
    current.value = appStore.locale;
  }

  function toggleDarkMode(): void {
    appStore.toggleDarkMode();
    theme.global.name.value = appStore.isDarkMode ? 'dark' : 'light';
  }

  function setUser(user: User): void {
    appStore.setUser(user);
    theme.global.name.value = appStore.isDarkMode ? 'dark' : 'light';
    current.value = appStore.locale;
  }

  function isDarkMode(): boolean {
    return appStore.isDarkMode;
  }

  return {
    authorize,
    setAuthorizationOutput,
    setLocale,
    localeNames,
    locale,
    isUserLoggedIn,
    isDarkMode,
    toggleDarkMode,
    getUserName,
    logout,
    setUser,
  };
}
