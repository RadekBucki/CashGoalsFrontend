import { Field } from './types.ts';
import useApp from '@/composables/useApp';

export default function useFieldsLibrary() {
  const app = useApp();

  const EMAIL: Field = {
    name: 'email',
    rules: [(v: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || 'email.format.validation.error'],
    required: true,
  };
  const NAME: Field = {
    name: 'name',
    rules: [(v: string) => /^.{2,100}$/.test(v) || 'name.length.validation.error'],
    required: true,
  };
  const PASSWORD: Field = {
    name: 'password',
    rules: [(v: string) => /^(?=.*[A-Z])(?=.*[\W_]).{5,}$/.test(v) || 'password.format.validation.error'],
    required: true,
    type: 'password',
  };
  const PASSWORD_WITHOUT_VALIDATION: Field = {
    name: 'password',
    required: true,
    type: 'password',
  };
  const TOKEN: Field = {
    name: 'token',
    required: true,
  };
  const THEME: Field = {
    name: 'theme',
    type: 'select',
    items: ['LIGHT', 'DARK', 'SYSTEM'],
    required: true,
  };
  const LOCALE: Field = {
    name: 'locale',
    type: 'select',
    items: app.localeNames,
  };
  const BUDGET_NAME: Field = {
    name: 'name',
    displayName: 'budget.name',
    rules: [(v: string) => /^.{1,100}$/.test(v) || 'budget.name.length.validation.error'],
    required: true,
  };

  function getWithNewName(field: Field, name: string): Field {
    const newField: Field = { ...field };
    newField.name = name;
    return newField;
  }

  return {
    EMAIL,
    NAME,
    PASSWORD,
    PASSWORD_WITHOUT_VALIDATION,
    TOKEN,
    THEME,
    LOCALE,
    BUDGET_NAME,
    getWithNewName,
  };
}
