import { Link } from 'react-router-dom';

import { t } from '../../utils/Internationalization';

function NotFound() {
  return (
    <>
      <h1>{t('notFound')}</h1>
      <Link to="/">{t('goHome')}</Link>
    </>
  );
}

export default NotFound;
