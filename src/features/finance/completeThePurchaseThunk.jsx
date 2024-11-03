import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'config';

const completeThePurchase = createAsyncThunk(
  'completeThePurchase',
  async ({ cardCode, branchId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(BASE_URL + 'finances/invoice-payment', {
        cardCode: cardCode,
        branchId: branchId,
        documentLines: [
          {
            baseType: 0,
            baseEntry: 0,
            baseLine: 0,
          },
        ],
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export default completeThePurchase;
