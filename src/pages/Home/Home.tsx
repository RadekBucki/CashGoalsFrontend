import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';
import { t } from '../../utils/Internationalization';

function Home() {
  return (
    <>
      <LanguageSwitcher />
      <h1>{t('helloWorld')}</h1>
    </>
  );
}

export default Home;
