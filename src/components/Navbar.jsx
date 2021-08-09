import React from 'react';
import useUser from '../hooks/index.jsx';

const Navbar = () => {
  const { user, logOut } = useUser();

  return (
    <div className="contacts__navbar navbar">
      <h2 className="navbar__title">Contacts Page</h2>
      {user && <p>Пользователь: <b>{user.name}</b></p>}
      {user ? <button onClick={logOut} className="navbar__button btn btn--exit" type="button">Выход</button> : null}
    </div>
  );
};

export default Navbar;
