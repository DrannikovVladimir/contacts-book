import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { removeContact } from '../../slices/contactSlice';
import routes from '../../routes';
import { modalSelector } from '../../slices/selectors.js';

const RemoveForm = ({ onHide }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { modal: { target } } = useSelector(modalSelector);
  const { firstName, lastName, id } = target;

  const handleRemove = (contactId) => async () => {
    try {
      await axios.delete(routes.removePath(contactId));
      dispatch(removeContact({ id: contactId }));
      onHide();
    } catch (err) {
      console.log(err);
      toast.error(t('toast.toastErrorNet'));
      throw err;
    }
  };

  return (
    <div className="form-remove">
      <p className="form-remove__text">
        {t('modal.confirmRemove1')}
        {' '}
        <b>
          {firstName}
          {' '}
          {lastName}
        </b>
        {' '}
        {t('modal.confirmRemove2')}
      </p>
      <div className="form-remove__button-wrapper">
        <button
          onClick={onHide}
          className="btn form-remove__button form form-remove__button--cancel"
          type="button"
        >
          {t('modal.buttonCancel')}
        </button>
        <button
          onClick={handleRemove(id)}
          className="btn form-remove__button form-remove__button--remove"
          type="button"
        >
          {t('modal.buttonRemove')}
        </button>
      </div>
    </div>
  );
};

export default RemoveForm;
