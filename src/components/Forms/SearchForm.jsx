/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { setInitialState, searchContact } from '../../slices/contactSlice.js';
import routes from '../../routes.js';
import contactsSelector from '../../slices/selectors.js';

const SearchForm = () => {
  const dispatch = useDispatch();
  const { contacts, filteredContacts } = useSelector(contactsSelector);
  const [value, setValue] = useState('');

  const handleFormSearch = (e) => {
    console.log(contacts);
    console.log(filteredContacts);
    setValue(e.target.value);
    dispatch(searchContact({ value }));
  };

  return (
    <form className="form-search">
      <div className="form-search__group">
        <label htmlFor="search" className="visually-hidden">Искать</label>
        <input
          type="text"
          id="search"
          name="searchName"
          className="form-search__input"
          onChange={handleFormSearch}
          value={value}
        />
      </div>
    </form>
  );
};

export default SearchForm;
