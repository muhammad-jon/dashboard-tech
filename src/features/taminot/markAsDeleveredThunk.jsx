import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'config';

const markAsDelevered = createAsyncThunk(
  'markAsDelevered',
  async ({ docEntry, docNum }, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    try {
      const response = await axios({
        method: 'PATCH',
        url:
          BASE_URL +
          `supplier-purchase-orders/change-status-to-delivered/doc-entry/${docEntry}/docnum/${docNum}/`,
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

export default markAsDelevered;
