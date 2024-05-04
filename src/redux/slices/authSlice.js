// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      console.log(state.users);
      const user = state.users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        state.isAuthenticated = true;
      }
    },
    register: (state, action) => {
      const newUser = action.payload;
      console.log(newUser);
      const existingUser = state.users.find(
        (user) => user.email === newUser.email
      );
      if (existingUser) {
        return;
      }
      else{
        const users = state.users;
        users.push(newUser)
        state.users = users;
      }

      
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { login, register, logout } = authSlice.actions;

export default authSlice.reducer;
