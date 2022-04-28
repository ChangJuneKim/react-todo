import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import snackReducer from './snack-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    snackBar: snackReducer,
  },
});
