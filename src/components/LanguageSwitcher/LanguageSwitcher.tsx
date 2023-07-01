import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation(['home', 'main']);

  const onClickLanguageChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value;
    await i18n.changeLanguage(language);
  };

  return (
    <select className="custom-select" style={{ width: 200 }} onChange={onClickLanguageChange}>
      <option value="en">English</option>
      <option value="pl">Polski</option>
    </select>
  );
}
