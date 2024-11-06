import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'config';

const startFinishThunk = createAsyncThunk(
  'addItemToTaminot',
  async (arg, { rejectWithValue, getState }) => {
    const token = getState().auth.token;

    let url = BASE_URL;
    switch (arg.type) {
      case 1:
        url += `laboratorian-purchase-orders/to-first-under-review-process/${arg.docEntry}/docnum/${arg.docNum}`;
        break;
      case 2:
        url += `laboratorian-purchase-orders/to-chief-under-review-process/${arg.docEntry}/docnum/${arg.docNum}`;
        break;
      case 3:
        url += `laboratorian-purchase-orders/started-re-checking-process/docentry/${arg.docEntry}`;
        break;
      case 4:
        url += `laboratorian-purchase-orders/from-retest-to-chief-under-review-process/${arg.docEntry}/docnum/${arg.docNum}`;
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

export default startFinishThunk;
