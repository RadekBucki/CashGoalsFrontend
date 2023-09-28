import { TextWithLink } from './types.ts';

export default function useLinksLibrary() {
  const LOGIN: TextWithLink = {
    textBefore: 'already.have.account',
    text: 'login',
    routeName: 'Login',
  };
  const FORGOT_PASSWORD: TextWithLink = {
    textBefore: 'forgot.password',
    text: 'reset.password',
    routeName: 'ForgotPassword',
  };
  const REGISTER: TextWithLink = {
    textBefore: 'dont.have.account',
    text: 'register',
    routeName: 'Register',
  };

  return { LOGIN, FORGOT_PASSWORD, REGISTER };
}
