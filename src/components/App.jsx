import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import UserContext from '../contexts/index.jsx';
import useUser from '../hooks/index.jsx';
import Navbar from './Navbar.jsx';
import ContactsPage from './ContactsPage.jsx';
import LoginPage from './LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import Modal from './Modal.jsx';
import Footer from './Footer.jsx';

const getUserData = (data) => {
  if (!data) {
    return null;
  }

  return {
    token: data.token,
    username: data.username,
  };
};

const UserProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('userId'));

  const getAuthHeader = () => {
    if (currentUser?.token) {
      return { Authorization: `Bearer ${currentUser?.token}` };
    }

    return {};
  };

  const [user, setUser] = useState(() => getUserData(currentUser));

  const logIn = useCallback((userdata) => {
    localStorage.setItem('userId', JSON.stringify(userdata));
    setUser(userdata);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userId');
    setUser(null);
  }, []);

  return (
    <UserContext.Provider value={{
      user, logIn, logOut, getAuthHeader,
    }}
    >
      {children}
    </UserContext.Provider>
  );
};

const ContactsRoute = ({ children, path, exact }) => {
  const auth = useUser();

  return (
    <Route exact={exact} path={path}>
      {auth.user ? children : <Redirect to="/login" />}
    </Route>
  );
};

const App = () => (
  <section className="contacts">
    <div className="contacts__container">
      <UserProvider>
        <Navbar />
        <Router>
          <Switch>
            <ContactsRoute exact path="/">
              <ContactsPage />
            </ContactsRoute>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
        <Footer />
        <Modal />
      </UserProvider>
    </div>
  </section>
);

export default App;
