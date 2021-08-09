import React from 'react';
import { useDispatch } from 'react-redux';
import { modalOpen } from '../slices/modalSlice.js';

const DeskFunction = () => {
  const dispatch = useDispatch();

  const showModal = (type) => () => {
    dispatch(modalOpen({ type }));
  };

  return (
    <div className="contacts__desc desc-function">
      <button
        onClick={showModal('adding')}
        className="desc-function__button btn btn--add"
        type="button"
      >
        Добавить новый контакт
      </button>
    </div>
  );
};

export default DeskFunction;
