import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from '../slices/contactSlice.js';
import modalReducer from '../slices/modalSlice.js';

export default configureStore({
  reducer: {
    contacts: contactsReducer,
    modal: modalReducer,
  },
});
