// eslint-disable-next-line import/no-extraneous-dependencies
import jwtDecode from 'jwt-decode';

import { useRefreshTokenMutation } from '@/graphql';
import useAppStore from '@/stores/app.ts';

export default function authorization() {
  const appStore = useAppStore();
  function verifyToken(token: string|undefined): boolean {
    if (!token || token === '') {
      return false;
    }
    const decodedToken = jwtDecode<{ exp: number }>(token);
    return decodedToken.exp * 1000 > Date.now();
  }
  async function tryRefreshToken(): Promise<boolean> {
    const refreshToken: string = appStore.getRefreshToken() ?? '';
    if (!verifyToken(appStore.getAccessToken()) && !verifyToken(refreshToken)) {
      return false;
    }
    const { mutate } = useRefreshTokenMutation();
    const result = await mutate({ refreshToken });

    if (!result?.data?.refreshToken?.accessToken) {
      appStore.logout();
      return false;
    }
    appStore.setLoginOutput(result.data.refreshToken);
    return true;
  }
  async function authorize(): Promise<boolean> {
    if (appStore.isUserLoggedIn() && verifyToken(appStore.getAccessToken())) {
      return true;
    }
    return tryRefreshToken();
  }
  return { authorize };
}
