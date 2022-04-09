import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  username: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.username = action.payload;
    },
    logout: state => {
      state.isAuth = false;
      state.username = '';
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
