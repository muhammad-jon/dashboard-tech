import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'config';

const getMainLaborantOrders = createAsyncThunk(
  'mainlaborantOrders/orders',
  async (arg, { getState }) => {
    const token = getState().auth.token;
    let url = BASE_URL + 'main-laboratorian-purchase-orders/';

    if (arg.cardName !== '') {
      url += `search-by-card-name/${arg.cardName}/`;
      url += `by-status/${arg.status}/`;
    } else if (arg.startDate && arg.endDate) {
      url += `search-by-between-doc-date/${arg.startDate}/${arg.endDate}/`;
      url += `by-status/${arg.status}`;
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

export default getMainLaborantOrders;
