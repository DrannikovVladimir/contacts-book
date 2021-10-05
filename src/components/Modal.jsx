import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { modalClose } from '../slices/modalSlice.js';
import getForm from './Forms/index.jsx';
import { modalSelector } from '../slices/selectors.js';

const getFormTitle = (type) => {
  const { t } = useTranslation();
  const titles = {
    adding: t('modal.addingTitle'),
    renaming: t('modal.renamingTitle'),
    removing: t('modal.removingTitle'),
  };

  return titles[type];
};

const renderForm = (type, hideModal) => {
  if (!type) {
    return null;
  }

  const Form = getForm(type);
  return <Form onHide={hideModal} />;
};

const Modal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { modal } = useSelector(modalSelector);

  const hideModal = () => {
    dispatch(modalClose());
  };

  const modalClass = cn('modal', {
    show: modal.type,
  });

  return (
    <div className={modalClass}>
      <div className="modal__dialog">
        <div className="modal__content">
          <div className="modal__header">
            <h3 className="modal__title">{getFormTitle(modal.type)}</h3>
            <button onClick={hideModal} className="modal__close" type="button">
              <span className="visually-hidden">{t('modal.close')}</span>
            </button>
          </div>
          <div className="modal__body">
            {renderForm(modal.type, hideModal)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
