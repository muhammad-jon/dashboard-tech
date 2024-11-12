import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'config';

const addCarNumberThunk = createAsyncThunk(
  'yetkaziberuvchi/add car orders',
  async (arg, { getState }) => {
    const token = getState().auth.token;
    console.log('arg', getState().auth);

    let url =
      BASE_URL +
      'courier-purchase-order/' +
      arg.docEntry +
      `?number=${arg.number}'`;

    const response = await axios({
      url,
      method: 'PATCH',
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = await response.data;
    console.log(data);

    return data;
  },
);

export default addCarNumberThunk;
