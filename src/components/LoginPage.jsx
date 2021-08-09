/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import useUser from '../hooks/index.jsx';
import routes from '../routes.js';

const LoginPage = () => {
  const user = useUser();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, actions) => {
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        user.logIn(data);
        history.push('/');
        actions.resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="form-login__wrapper">
      <h3 className="form-login__title">Форма входа</h3>
      <form className="form-login" onSubmit={formik.handleSubmit}>
        <div className="form-login__group">
          <label className="form-login__label" htmlFor="name">Имя пользователя</label>
          <input
            className="form-login__input"
            id="name"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
        </div>
        <div className="form-login__group">
          <label className="form-login__label" htmlFor="password">Пароль</label>
          <input
            className="form-login__input"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <button className="form-login__button" type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginPage;
