import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'config';

const fetchCeoOrders = createAsyncThunk(
  'ceo/orders',
  async (arg, { getState }) => {
    const token = getState().auth.token;
    console.log('arg', getState().auth);

    let url = BASE_URL;

    switch (arg.status) {
      case 1:
        url += `production-manager-order/new/pagination/${arg.page}`;
        break;
      case 2:
        url += `production-manager-order/delivered/pagination/${arg.page}`;
        break;
      case 3:
        url += `production-manager-order/under-review/pagination/${arg.page}`;
        break;
      case 4:
        url += `production-manager-order/completed/pagination/${arg.page}`;
        break;
      default:
        url += `production-manager-order/new/pagination/${arg.page}`;
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

export default fetchCeoOrders;
