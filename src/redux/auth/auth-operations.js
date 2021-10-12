import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const registration = createAsyncThunk(
  "auth/registration",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/signup", {
        name,
        email,
        password,
      });
      token.set(data.token);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const logIn = createAsyncThunk(
  "auth/logIn",
  async ({ email, password }, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/login", { email, password });
      token.set(data.token);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const logOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    token.unset();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const savedToken = state.auth.token;
    console.log(state);

    if (savedToken === null) {
      return thunkAPI.rejectWithValue("we got no token here");
    }
    token.set(savedToken);
    try {
      const { data } = await axios.get("/users/current");
      return data;
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

const authOperations = {
  registration,
  logIn,
  logOut,
  fetchCurrentUser,
};

export default authOperations;
