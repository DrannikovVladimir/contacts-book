/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { addContact } from '../../slices/contactSlice.js';
import router from '../../routes.js';

const AddForm = ({ onHide }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
    },
    onSubmit: async (values, actions) => {
      const contact = {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
      };
      try {
        const { data } = await axios.post(router.addPath(), contact);
        dispatch(addContact({ contact: data }));
        actions.resetForm();
        onHide();
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form className="form-add" onSubmit={formik.handleSubmit}>
      <div className="form-add__group">
        <label className="form-add__label" htmlFor="firstName">Имя</label>
        <input
          className="form-add__input"
          type="text"
          id="firstName"
          name="firstName"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          ref={inputRef}
        />
      </div>
      <div className="form-add__group">
        <label className="form-add__label" htmlFor="lastName">Фамилия</label>
        <input
          className="form-add__input"
          type="text"
          id="lastName"
          name="lastName"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
      </div>
      <div className="form-add__group">
        <label className="form-add__label" htmlFor="phoneNumber">Телефон</label>
        <input
          className="form-add__input"
          type="number"
          id="phoneNumber"
          name="phoneNumber"
          onChange={formik.handleChange}
          value={formik.values.phoneNumber}
        />
      </div>
      <div className="form-add__button-wrapper">
        <button onClick={onHide} className="btn form-add__button form-add__button--cancel" type="button">Отменить</button>
        <button className="btn form-add__button form-add__button--success" type="submit">Добавить</button>
      </div>
    </form>
  );
};

export default AddForm;
