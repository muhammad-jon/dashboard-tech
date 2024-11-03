import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'config';

const addOrderToTaminot = createAsyncThunk(
  'addOrderToTaminot',
  async (arg, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    try {
      const response = await axios({
        method: 'POST',
        url: BASE_URL + 'supplier-purchase-orders',
        data: arg,
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export default addOrderToTaminot;
