import { Link } from './types.ts';

export default function useLinksLibrary() {
  const LOGIN: Link = {
    textBefore: 'already.have.account',
    text: 'login',
    routeName: 'Login',
  };
  const FORGOT_PASSWORD: Link = {
    textBefore: 'forgot.password',
    text: 'reset.password',
    routeName: 'ForgotPassword',
  };
  const REGISTER: Link = {
    textBefore: 'dont.have.account',
    text: 'register',
    routeName: 'Register',
  };

  return { LOGIN, FORGOT_PASSWORD, REGISTER };
}
