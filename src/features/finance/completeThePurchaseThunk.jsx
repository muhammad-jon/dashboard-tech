import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'config';

const completeThePurchase = createAsyncThunk(
  'completeThePurchase',
  async ({ cardCode, branchId }, { rejectWithValue, getState }) => {
    console.log(cardCode, branchId);
    const token = getState().auth.token;
    try {
      const response = await axios({
        url: BASE_URL + 'finances/invoice-payment',
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
        data: {
          cardCode: cardCode,
          branchId: branchId,

          documentLines: [
            {
              baseType: 0,
              baseEntry: 0,
              baseLine: 0,
            },
          ],
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export default completeThePurchase;
