/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { searchContact } from '../../slices/contactSlice.js';

const SearchForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const handleFormSearch = (e) => {
    setValue(e.target.value);
    dispatch(searchContact({ value: e.target.value }));
  };

  const handleForm = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleForm} className="form-search">
      <div className="form-search__group">
        <label htmlFor="search" className="visually-hidden">{t('navbar.search')}</label>
        <input
          type="text"
          id="search"
          name="searchName"
          className="form-search__input"
          onChange={handleFormSearch}
          value={value}
          placeholder="Поиск"
        />
      </div>
    </form>
  );
};

export default SearchForm;
