import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modal: {
      type: null,
      target: null,
    },
  },reducers: {
    modalOpen: (state, { payload }) => {
      state.modal.type = payload.type;
      state.modal.target = payload.target;
    },
    modalClose: (state) => {
      state.modal.type = null;
      state.modal.target = null;
    },
  },
});

export const { modalOpen, modalClose } = modalSlice.actions;

export default modalSlice.reducer;
