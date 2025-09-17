// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user"));
const storedAuth = JSON.parse(localStorage.getItem("isAuthenticated"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: storedAuth || false,
    user: storedUser || null,
  },
  reducers: {
    signup: (state, action) => {
      // save user to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    login: (state, action) => {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (
        savedUser &&
        savedUser.email === action.payload.email &&
        savedUser.password === action.payload.password
      ) {
        state.isAuthenticated = true;
        state.user = savedUser;
        localStorage.setItem("isAuthenticated", true);
      } else {
        alert("Invalid email or password!");
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.setItem("isAuthenticated", false);
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
