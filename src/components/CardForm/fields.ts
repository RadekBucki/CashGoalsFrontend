import { useLocale } from 'vuetify';

import { Field } from './types.ts';

export default function fields() {
  const { t } = useLocale();

  const EMAIL: Field = {
    label: t('email'),
    name: 'email',
    rules: [(v: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || t('email.format.validation.error')],
    required: true,
  };
  const NAME: Field = {
    label: t('name'),
    name: 'name',
    rules: [(v: string) => /^.{2,100}$/.test(v) || t('name.length.validation.error')],
    required: true,
  };
  const PASSWORD: Field = {
    label: t('password'),
    name: 'password',
    rules: [(v: string) => /^(?=.*[A-Z])(?=.*[\W_]).{5,}$/.test(v) || t('password.format.validation.error')],
    required: true,
    type: 'password',
  };
  const TOKEN: Field = {
    label: t('token'),
    name: 'token',
    required: true,
  };

  return { EMAIL, NAME, PASSWORD, TOKEN };
}
