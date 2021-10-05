import React from 'react';
import { useTranslation } from 'react-i18next';
import useUser from '../hooks/index.jsx';

const Navbar = () => {
  const { t } = useTranslation();
  const { user, logOut } = useUser();

  return (
    <div className="contacts__navbar navbar">
      <h2 className="navbar__title">{t('navbar.title')}</h2>
      {user && (
      <p className="navbar__user">
        {t('navbar.user')}
        {':'}
        {' '}
        <b>{user.username}</b>
      </p>
      )}
      {user ? <button type="button" onClick={logOut} className="navbar__button btn">{t('navbar.buttonExit')}</button> : null}
    </div>
  );
};

export default Navbar;
