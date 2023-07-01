import { useTranslation } from 'react-i18next';

function translate(key: string): string {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();
  // noinspection TypeScriptValidateTypes
  return t(key);
}

// eslint-disable-next-line import/prefer-default-export
export { translate as t };
