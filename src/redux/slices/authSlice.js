import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  role: null, // 'customer' | 'vendor' | 'admin'
  user: null, // optional (for future use)
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.role = action.payload.role;
      state.user = action.payload.user || null;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.role = null;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;