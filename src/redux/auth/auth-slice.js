import { createSlice } from "@reduxjs/toolkit";
import authOperations from "./auth-operations";

const initialState = {
  user: { name: null, email: null, password: null },
  error: null,
  token: null,
  isLoggedIn: false,
  isFetchingUser: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [authOperations.registration.pending]: (state, { payload }) => {
      state.isFetchingUser = true;
    },
    [authOperations.registration.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isFetchingUser = false;
      state.isLoggedIn = true;
    },
    [authOperations.registration.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isFetchingUser = false;
    },
    [authOperations.logIn.pending]: (state, { payload }) => {
      state.isFetchingUser = true;
    },
    [authOperations.logIn.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isFetchingUser = false;
      state.isLoggedIn = true;
    },
    [authOperations.logIn.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isFetchingUser = false;
    },
    [authOperations.logOut.fulfilled]: (state, { payload }) => initialState,
    [authOperations.logOut.rejected]: (state, { payload }) =>
      (state.error = payload),
    [authOperations.fetchCurrentUser.pending]: (state, action) => {
      state.isFetchingUser = true;
    },
    [authOperations.fetchCurrentUser.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isFetchingUser = false;
    },
    [authOperations.fetchCurrentUser.rejected]: (state, action) => {
      state.isFetchingUser = false;
    },
  },
});

export default authSlice.reducer;
