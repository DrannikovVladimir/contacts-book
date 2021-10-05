/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { modalOpen } from '../slices/modalSlice.js';
import { contactsSelector } from '../slices/selectors.js';

const getFeedback = (status) => {
  const { t } = useTranslation();
  switch (status) {
    case 'default':
      return <p className="contacts-list__feedback">{t('contactsList.emptyList')}</p>;
    case 'filtered':
      return <p className="contacts-list__feedback">{t('contactsList.emptySearch')}</p>;
    default:
      throw new Error(`Unknown status ${status}`);
  }
};

const ContactsList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { contacts, filteredContacts, status } = useSelector(contactsSelector);

  const showModal = (type, target) => (e) => {
    e.preventDefault();
    dispatch(modalOpen({ type, target }));
  };

  const contactsList = status === 'default' ? contacts : filteredContacts;

  const feedback = getFeedback(status);

  return (
    <ul className="contacts-list">
      {contactsList.length === 0
        ? feedback
        : contactsList.slice().sort((a, b) => {
          if (a.lastName < b.lastName) {
            return -1;
          }
          if (a.lastName > b.lastName) {
            return 1;
          }
          return 0;
        }).map(({
          firstName,
          lastName,
          phoneNumber,
          id,
        }, index) => (
          <li key={id} className="contacts-list__item">
            <p className="contacts-list__number">
              {index + 1}{'.'}
            </p>
            <div className="contacts-list__text-wrapper">
              <p className="contacts-list__text">
                {lastName}{' '}{firstName}
              </p>
              <p className="contacts-list__text contacts-list__text--phone">
                +7{' '}
                {phoneNumber}
              </p>
            </div>
            <div className="contacts-list__link-wrapper">
              <a
                href="/edit"
                onClick={showModal('renaming', {
                  lastName,
                  firstName,
                  phoneNumber,
                  id,
                })}
                className="contacts-list__link contacts-list__link--edit"
              >
                {t('contactsList.buttonEdit')}
              </a>
              <a
                href="/remove"
                onClick={showModal('removing', { lastName, firstName, id })}
                className="contacts-list__link contacts-list__link--remove"
              >
                {t('contactsList.buttonRemove')}
              </a>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default ContactsList;
