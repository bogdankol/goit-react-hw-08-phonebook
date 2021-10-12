import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchAllContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/contacts");
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contactData, thunkAPI) => {
    try {
      const { data } = await axios.post("/contacts", contactData);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const deleteContact = createAsyncThunk(
  "contacts/deleteContacts",
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const filterContacts = createAsyncThunk("contacts/filterContacts", (string) => {
  console.log(string);
  return string;
});

const contactsOperations = {
  fetchAllContacts,
  addContact,
  deleteContact,
  filterContacts,
};

export default contactsOperations;
