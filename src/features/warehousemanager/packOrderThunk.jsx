import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'config';

const packOrderWarehouse = createAsyncThunk(
  'addItemToTaminot',
  async (arg, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    try {
      const response = await axios({
        method: 'POST',
        url:
          BASE_URL + 'warehouse-manager-purchase-delivery-notes/' + arg.docNum,
        data: arg.data,
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

export default packOrderWarehouse;
