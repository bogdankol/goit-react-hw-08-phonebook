import { createSlice } from "@reduxjs/toolkit";
import contactsOperations from "./contacts-operations";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  filter: "",
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: {
    [contactsOperations.fetchAllContacts.fulfilled]: (state, { payload }) => {
      state.items = payload;
    },
    [contactsOperations.addContact.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [contactsOperations.addContact.fulfilled]: (state, { payload }) => {
      state.items = [...state.items, payload];
      state.isLoading = false;
    },
    [contactsOperations.addContact.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    [contactsOperations.deleteContact.fulfilled]: (state, { payload }) => {
      state.items = state.items.filter(({ id }) => id !== payload);
    },
    [contactsOperations.deleteContact.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    [contactsOperations.filterContacts.fulfilled]: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

export default contactsSlice.reducer;
