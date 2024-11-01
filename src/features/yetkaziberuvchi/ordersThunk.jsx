import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'config';

const fetchPurchaseOrders = createAsyncThunk(
  'yetkaziberuvchi/orders',
  async (arg, { getState }) => {
    const token = getState().auth.token;
    console.log('arg', getState().auth);

    let url = BASE_URL + 'supplier-purchase-orders/';

    // by-status/{status}/
    // by-card-name-and-status/{cardName}/{status}/
    // by-between-doc-date/{startDate}/{endDate}/status/{status}/

    if (arg.cardName !== '') {
      url += `by-card-name-and-status/${arg.cardName}/${arg.status}/`;

      url += `pagination/${arg.page}`;
    } else if (arg.startDate && arg.endDate) {
      url += `by-between-doc-date/${arg.startDate}/${arg.endDate}/status/${arg.status}/`;

      url += `pagination/${arg.page}`;
    } else {
      url += `by-status/${arg.status}/`;
      url += `pagination/${arg.page}`;
    }

    const response = await axios({
      url,
      method: 'GET',
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

export default fetchPurchaseOrders;
