import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setInitialState } from '../slices/contactSlice.js';

import useUser from '../hooks/index.jsx';
import ContactsList from './ContactsList.jsx';
import DeskFunction from './DeskFunction.jsx';
import SearchForm from './Forms/SearchForm.jsx';
import routes from '../routes.js';

const ContactsPage = () => {
  const auth = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(routes.contactsPath(), { headers: auth.getAuthHeader() });
        dispatch(setInitialState(data));
      } catch (err) {
        auth.logOut();
        throw new Error(err);
      }
    };

    fetchData();
  }, [auth, dispatch]);

  return (
    <div className="contacts__content">
      <SearchForm />
      <div className="contacts__wrapper">
        <ContactsList />
        <DeskFunction />
      </div>
    </div>
  );
};

export default ContactsPage;