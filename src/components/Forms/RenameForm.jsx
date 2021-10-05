/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import cn from 'classnames';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { renameContact } from '../../slices/contactSlice.js';
import routes from '../../routes.js';
import validationSchema from '../../validate.js';
import { modalSelector } from '../../slices/selectors.js';

const RenameForm = ({ onHide }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const {
    modal: {
      target: {
        id,
        firstName,
        lastName,
        phoneNumber,
      },
    },
  } = useSelector(modalSelector);
  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
      phoneNumber,
    },
    validationSchema,
    onSubmit: async (values, actions) => {
      actions.setStatus(false);
      const newContact = {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        id,
      };
      try {
        const { data } = await axios.patch(routes.renamePath(id), newContact);
        dispatch(renameContact({ contacts: data }));
        onHide();
      } catch (err) {
        actions.setStatus(true);
        toast.error(t('toast.toastErrorNet'));
        throw err;
      }
    },
  });

  const classFirstName = cn('form-add__input', {
    'form-add__input--error': formik.errors.firstName,
  });

  const classLastName = cn('form-add__input', {
    'form-add__input--error': formik.errors.lastName,
  });

  const classPhoneNumber = cn('form-add__input', {
    'form-add__input--error': formik.errors.phoneNumber,
  });

  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <form className="form-add" onSubmit={formik.handleSubmit}>
      <div className="form-add__group">
        <label className="form-add__label" htmlFor="firstName">{t('modal.firstName')}</label>
        <input
          className={classFirstName}
          type="text"
          id="firstName"
          name="firstName"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          ref={inputRef}
          disabled={formik.isSubmitting}
        />
        {formik.errors.firstName && formik.touched.firstName ? <div className="form-add__feedback">{formik.errors.firstName}</div> : null}
      </div>
      <div className="form-add__group">
        <label className="form-add__label" htmlFor="lastName">{t('modal.lastName')}</label>
        <input
          className={classLastName}
          type="text"
          id="lastName"
          name="lastName"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          disabled={formik.isSubmitting}
        />
        {formik.errors.firstName && formik.touched.lastName ? <div className="form-add__feedback">{formik.errors.lastName}</div> : null}
      </div>
      <div className="form-add__group">
        <label className="form-add__label" htmlFor="phoneNumber">{t('modal.phone')}</label>
        <InputMask
          mask="(999) 999 99 99"
          className={classPhoneNumber}
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          onChange={formik.handleChange}
          value={formik.values.phoneNumber}
          disabled={formik.isSubmitting}
        />
        {formik.errors.phoneNumber && formik.touched.phoneNumber ? <div className="form-add__feedback">{formik.errors.phoneNumber}</div> : null}
      </div>
      <div className="form-add__button-wrapper">
        <button
          onClick={onHide}
          className="btn form-add__button form-add__button--cancel"
          type="button"
          disabled={formik.isSubmitting}
        >
          {t('modal.buttonCancel')}
        </button>
        <button
          className="btn form-add__button form-add__button--success"
          type="submit"
          disabled={formik.isSubmitting}
        >
          {t('modal.buttonSave')}
        </button>
      </div>
    </form>
  );
};

export default RenameForm;
