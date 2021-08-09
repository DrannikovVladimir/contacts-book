import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { removeContact } from '../../slices/contactSlice';
import routes from '../../routes';

const RemoveForm = ({ onHide }) => {
  const dispatch = useDispatch();
  const { modal: { target } } = useSelector((state) => state.modal);
  const { firstName, lastName, id } = target;

  const handleRemove = (contactId) => async () => {
    try {
      await axios.delete(routes.removePath(contactId));
      dispatch(removeContact({ id: contactId }));
      onHide();
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };

  return (
    <div className="form-remove">
      <p className="form-remove__text">
        Вы хотите удалить
        <b>
          {firstName}
          {lastName}
        </b>
        из списка конатктов?
      </p>
      <div className="form-remove__button-wrapper">
        <button
          onClick={onHide}
          className="btn form-remove__button form form-remove__button--cancel"
          type="button"
        >
          Отменить
        </button>
        <button
          onClick={handleRemove(id)}
          className="btn form-remove__button form-remove__button--remove"
          type="button"
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default RemoveForm;
