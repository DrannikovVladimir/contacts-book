/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
  },
  reducers: {
    setInitialState: (state, { payload }) => {
      const { contacts } = payload;
      state.contacts = contacts;
    },
    addContact: (state, { payload }) => {
      const { contact } = payload;
      state.contacts.unshift(contact);
    },
    removeContact: (state, { payload }) => {
      state.contacts = state.contacts.filter((item) => item.id !== payload.id);
    },
    renameContact: (state, { payload }) => {
      const { contacts } = payload;
      state.contacts = contacts;
    },
    searchContact: (state, { payload }) => {
      const { contacts } = payload;
      state.contacts = contacts;
    },
  },
});

export const {
  setInitialState,
  addContact,
  removeContact,
  renameContact,
  searchContact,
} = contactsSlice.actions;

export default contactsSlice.reducer;
