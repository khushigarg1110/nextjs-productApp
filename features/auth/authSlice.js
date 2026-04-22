import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
let storedAuth = null;

if (typeof window !== "undefined") {
  const data = localStorage.getItem("auth");
  storedAuth = data ? JSON.parse(data) : null;
}

const initialState = {
  isAuthenticated: storedAuth?.isAuthenticated || false,
  user: storedAuth?.user || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload || null;

      // Save to localStorage
      localStorage.setItem(
        "auth",
        JSON.stringify({
          isAuthenticated: true,
          user: state.user,
        })
      );
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;

      // Remove from localStorage
      localStorage.removeItem("auth");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;