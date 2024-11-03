import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'config';

const login = createAsyncThunk(
  'auth/login',
  async (
    { login, password, deviceId, token, language },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(BASE_URL + 'accounts/log-in', {
        login,
        password,
        deviceId,
        token,
        language,
      });

      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.employee));

      localStorage.setItem('userInfo', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export default login;
