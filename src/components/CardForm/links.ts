import { useLocale } from 'vuetify';

import { TextWithLink } from './types.ts';

export default function links() {
  const { t } = useLocale();

  const LOGIN: TextWithLink = {
    textBefore: t('already.have.account'),
    text: t('login'),
    routeName: 'Login',
  };
  const FORGOT_PASSWORD: TextWithLink = {
    textBefore: t('forgot.password'),
    text: t('reset.password'),
    routeName: 'ForgotPassword',
  };
  const REGISTER: TextWithLink = {
    textBefore: t('dont.have.account'),
    text: t('register'),
    routeName: 'Register',
  };

  return { LOGIN, FORGOT_PASSWORD, REGISTER };
}
