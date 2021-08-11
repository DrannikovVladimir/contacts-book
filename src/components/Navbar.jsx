import React from 'react';
import useUser from '../hooks/index.jsx';

const Navbar = () => {
  const { user, logOut } = useUser();

  return (
    <div className="contacts__navbar navbar">
      <h2 className="navbar__title">Книга контактов</h2>
      {user && (
      <p>
        Пользователь:
        {' '}
        <b>{user.username}</b>
      </p>
      )}
      {user ? <button type="button" onClick={logOut} className="navbar__button btn">Выход</button> : null}
    </div>
  );
};

export default Navbar;
