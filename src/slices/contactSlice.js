/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filteredContacts: [],
    status: 'default',
  },
  reducers: {
    setInitialState: (state, { payload }) => {
      const { contacts } = payload;
      state.contacts = contacts;
      state.status = 'default';
    },
    addContact: (state, { payload }) => {
      const { contact } = payload;
      state.contacts.unshift(contact);
      state.status = 'default';
    },
    removeContact: (state, { payload }) => {
      state.contacts = state.contacts.filter((item) => item.id !== payload.id);
      state.status = 'default';
    },
    renameContact: (state, { payload }) => {
      const { contacts } = payload;
      state.contacts = contacts;
      state.status = 'default';
    },
    searchContact: (state, { payload }) => {
      const { value } = payload;
      state.filteredContacts = [];
      state.status = 'filtered';
      state.filteredContacts = state.contacts.filter(({ firstName, lastName }) => (
        firstName.toLowerCase().includes(value.toLowerCase())
          || lastName.toLowerCase().includes(value.toLowerCase())));
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
