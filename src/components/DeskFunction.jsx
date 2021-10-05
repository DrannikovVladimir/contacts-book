import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { modalOpen } from '../slices/modalSlice.js';

const DeskFunction = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const showModal = (type) => () => {
    dispatch(modalOpen({ type }));
  };

  return (
    <div className="desc-function">
      <button
        onClick={showModal('adding')}
        className="desc-function__button btn"
        type="button"
      >
        {t('navbar.buttonNewContact')}
      </button>
    </div>
  );
};

export default DeskFunction;
