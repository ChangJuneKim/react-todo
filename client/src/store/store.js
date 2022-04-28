import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import snackReducer from './snack-slice';
import todoReducer from './todo-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
    snackBar: snackReducer,
  },
});
