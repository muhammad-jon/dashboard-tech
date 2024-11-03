import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'config';

const payForPurchase = createAsyncThunk(
  'payForPurchase',
  async (
    { cardCode, docCurrency, branchId, docEntry, cash },
    { rejectWithValue, getState },
  ) => {
    const token = getState().auth.token;
    try {
      const response = await axios({
        method: 'POST',
        url: BASE_URL + 'finances/vendor-payment',
        data: {
          cardCode,
          cashAccount: '5020',
          docCurrency,
          cashSum: cash,
          branchId,
          paymentInvoices: [
            {
              docEntry,
              sumApplied: cash,
            },
          ],
        },
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

export default payForPurchase;
