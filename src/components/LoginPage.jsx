/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import cn from 'classnames';
import useUser from '../hooks/index.jsx';
import routes from '../routes.js';

const LoginPage = () => {
  const user = useUser();
  const inputRef = useRef();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, actions) => {
      actions.setStatus(false);
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        user.logIn(data);
        history.push('/');
        actions.resetForm();
      } catch (err) {
        if (err.response.status === 401) {
          actions.setStatus(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  const classFeedback = cn('form-login__feedback', {
    'form-login__feedback--show': formik.status,
  });

  const classInput = cn('form-login__input', {
    'form-login__input--error': formik.status,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="form-login__wrapper">
      <h3 className="form-login__title">Форма входа</h3>
      <form className="form-login" onSubmit={formik.handleSubmit}>
        <div className="form-login__group">
          <label className="form-login__label" htmlFor="name">Имя пользователя</label>
          <input
            className={classInput}
            id="name"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
            ref={inputRef}
            disabled={formik.isSubmitting}
          />
        </div>
        <div className="form-login__group">
          <label className="form-login__label" htmlFor="password">Пароль</label>
          <input
            className={classInput}
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            disabled={formik.isSubmitting}
          />
        </div>
        <div className={classFeedback}>Неправильные имя пользователя или пароль</div>
        <button
          className="form-login__button"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
