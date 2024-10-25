import { configureStore } from '@reduxjs/toolkit';
import authReducer from './../views/auth/signIn/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
