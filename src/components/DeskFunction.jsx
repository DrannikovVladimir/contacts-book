import React from 'react';
import { useDispatch } from 'react-redux';
import { modalOpen } from '../slices/modalSlice.js';

const DeskFunction = () => {
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
        Добавить новый контакт
      </button>
    </div>
  );
};

export default DeskFunction;
