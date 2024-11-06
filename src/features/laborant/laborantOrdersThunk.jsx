import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'config';

const getLaborantOrders = createAsyncThunk(
  'laborantOrders/orders',
  async (arg, { getState }) => {
    const token = getState().auth.token;
    let url = BASE_URL + 'laboratorian-purchase-orders/';

    if (arg.cardName !== '') {
      url += `search-by-card-name/${arg.cardName}/`;
      url += `status/${arg.status}/`;
    } else if (arg.startDate && arg.endDate) {
      url += `search-between-docdate/${arg.startDate}/${arg.endDate}/`;
      url += `status/${arg.status}`;
    } else {
      url += `by-status/${arg.status}/`;
    }
    url += `pagination/${arg.page}`;

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

export default getLaborantOrders;
