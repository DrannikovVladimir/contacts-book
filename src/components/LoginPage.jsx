/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import axios from 'axios';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import useUser from '../hooks/index.jsx';
import routes from '../routes.js';

const LoginPage = () => {
  const { t } = useTranslation();
  const user = useUser();
  const inputRef = useRef();
  const history = useHistory();
  const [help, setHelp] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required(t('loginPage.required')),
      password: Yup.string().required(t('loginPage.required')),
    }),
    onSubmit: async (values, actions) => {
      actions.setStatus(false);
      try {
        const { data } = await axios.post(routes.loginPath(), values, { timeout: 5000 });
        user.logIn(data);
        history.push('/');
        actions.resetForm();
      } catch (err) {
        if (err.response) {
          if (err.response.status === 401) {
            actions.setStatus(true);
          } else if (err.response.status === 404) {
            toast.error(t('toast.toastErrorRequest'));
          }
        } else {
          toast.error(t('toast.toastErrorNet'));
        }
        throw err;
      }
    },
  });

  const hanldeButtonHelp = () => {
    setHelp(!help);
  };

  const classInputUsername = cn('form-login__input', {
    'form-login__input--error': (formik.errors.username && formik.touched.username) || formik.status,
  });

  const classInputPassword = cn('form-login__input', {
    'form-login__input--error': (formik.errors.password && formik.touched.password) || formik.status,
  });

  const classHelp = cn('form-login__help', {
    'form-login__help--open': help,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="form-login__wrapper">
      <h3 className="visually-hidden">{t('loginPage.title')}</h3>
      <form className="form-login" onSubmit={formik.handleSubmit}>
        <div className="form-login__group">
          <label className="form-login__label" htmlFor="name">{t('loginPage.username')}</label>
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
          <label className="form-login__label" htmlFor="password">{t('loginPage.password')}</label>
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
        {(formik.status && (!formik.errors.username && !formik.errors.password)) && <div className="form-login__feedback">{t('loginPage.serverError')}</div>}
        <div className="form-login__button-wrapper">
          <button
            className="form-login__button"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {t('loginPage.button')}
          </button>
          <button
            onClick={hanldeButtonHelp}
            className="form-login__button-help"
            type="button"
          >
            ?
          </button>
        </div>
      </form>
      <div className={classHelp}>
        <p className="form-login__help-text">
          {t('loginPage.username')}
          {':'}
          {' '}
          <b>{t('loginPage.key')}</b>
        </p>
        <p className="form-login__help-text">
          {t('loginPage.password')}
          {':'}
          {' '}
          <b>{t('loginPage.key')}</b>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
