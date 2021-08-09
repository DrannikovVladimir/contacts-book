/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalOpen } from '../slices/modalSlice.js';
import contactsSelector from '../slices/selectors.js';

const ContactsList = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector(contactsSelector);

  const showModal = (type, target) => () => {
    dispatch(modalOpen({ type, target }));
  };

  return (
    <ul className="contacts-list">
      {contacts.map(({
        firstName,
        lastName,
        phoneNumber,
        id,
      }, index) => (
        <li key={id} className="contacts-list__item">
          <p className="contacts-list__number">
            {index + 1}
          </p>
          <div className="contacts-list__text-wrapper">
            <p className="contacts-list__text">
              {lastName} {firstName}
            </p>
            <p className="contacts-list__text">
              +
              {phoneNumber}
            </p>
          </div>
          <div className="contacts-list__button-wrapper">
            <button
              onClick={showModal('renaming', {
                lastName,
                firstName,
                phoneNumber,
                id,
              })}
              className="contacts-list__button contacts-list__button--edit"
              type="button"
            >
              Редактировать
            </button>
            <button
              onClick={showModal('removing', { lastName, firstName, id })}
              className="contacts-list__button contacts-list__button--remove"
              type="button"
            >
              Удалить
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ContactsList;
