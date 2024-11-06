import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'config';

const acceptRejectThunk = createAsyncThunk(
  'addItemToTaminot',
  async (arg, { rejectWithValue, getState }) => {
    const token = getState().auth.token;

    let url = BASE_URL;
    switch (arg.type) {
      case 1:
        url += `main-laboratorian-purchase-orders/set-status-to-verified/${arg.docEntry}/by-docnum/${arg.docNum}`;
        break;
      case 2:
        url += `main-laboratorian-purchase-orders/set-status-rejected/${arg.docEntry}/by-docnum/${arg.docNum}`;
        break;
      case 3:
        url += `main-laboratorian-purchase-orders/set-status-re-checking/${arg.docEntry}/by-docnum/${arg.docNum}`;
        break;
      default:
        break;
    }

    try {
      const response = await axios({
        method: 'PATCH',
        url,

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

export default acceptRejectThunk;
