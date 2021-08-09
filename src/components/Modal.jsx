import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { modalClose } from '../slices/modalSlice.js';
import getForm from './Forms/index.jsx';

const Modal = () => {
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state.modal);

  const hideModal = () => {
    dispatch(modalClose());
  }

  const renderForm = (type) => {
    if (!type) {
      return;
    }

    const Form = getForm(type);
    return <Form onHide={hideModal} />;
  };

  const getFormTitle = (type) => {
    const titles = {
      adding: 'Новая запись',
      renaming: 'Редактировать',
      removing: 'Удалить',
    };

    return titles[type];
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
            {renderForm(modal.type)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
