/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
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
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Обязательное поле'),
      password: Yup.string().required('Обязательное поле'),
    }),
    onSubmit: async (values, actions) => {
      actions.setStatus(false);
      try {
        const { data } = await axios.post(routes.loginPath(), values, { timeout: 5000 });
        user.logIn(data);
        history.push('/');
        actions.resetForm();
      } catch (err) {
        console.log(err.response);
        if (err.response) {
          if (err.response.status === 401) {
            actions.setStatus(true);
          } else if (err.response.status === 404) {
            toast.error('Ошибка запроса');
          }
        } else {
          toast.error('Ошибка сети');
        }
        throw err;
      }
    },
  });

  const classInputUsername = cn('form-login__input', {
    'form-login__input--error': (formik.errors.username && formik.touched.username) || formik.status,
  });

  const classInputPassword = cn('form-login__input', {
    'form-login__input--error': (formik.errors.password && formik.touched.password) || formik.status,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="form-login__wrapper">
      <h3 className="visually-hidden">Войти</h3>
      <form className="form-login" onSubmit={formik.handleSubmit}>
        <div className="form-login__group">
          <label className="form-login__label" htmlFor="name">Имя пользователя</label>
          <input
            className={classInputUsername}
            id="name"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
            ref={inputRef}
            disabled={formik.isSubmitting}
          />
          {formik.errors.username && formik.touched.username && <div className="form-login__feedback">{formik.errors.username}</div>}
        </div>
        <div className="form-login__group">
          <label className="form-login__label" htmlFor="password">Пароль</label>
          <input
            className={classInputPassword}
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            disabled={formik.isSubmitting}
          />
          {formik.errors.password && formik.touched.password && <div className="form-login__feedback">{formik.errors.password}</div>}
        </div>
        {(formik.status && (!formik.errors.username && !formik.errors.password)) && <div className="form-login__feedback">Неправильные имя пользователя или пароль</div>}
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
