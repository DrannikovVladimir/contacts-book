import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { modalClose } from '../slices/modalSlice.js';
import getForm from './Forms/index.jsx';
import { modalSelector } from '../slices/selectors.js';

const getFormTitle = (type) => {
  const titles = {
    adding: 'Новая запись',
    renaming: 'Редактировать',
    removing: 'Удалить',
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
              <span className="visually-hidden">Закрыть</span>
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
