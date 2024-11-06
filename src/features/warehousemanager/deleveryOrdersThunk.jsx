import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'config';

const warehouseDeleveryOrders = createAsyncThunk(
  'deleveryOrdersThunk/orders',
  async (arg, { getState }) => {
    const token = getState().auth.token;
    let url = '';

    if (arg.status === 1) {
      url += BASE_URL + 'warehouse-manager-purchase-delivery-notes/';
    }
    if (arg.status === 2) {
      url += BASE_URL + 'warehouse-manager-purchase-invoices/';
    }

    if (arg.cardName !== '') {
      url += `search/${arg.cardName}/`;
      url += `pagination/${arg.page}`;
    } else if (arg.startDate && arg.endDate) {
      url += `search/${arg.startDate}/${arg.endDate}/`;
      url += `pagination/${arg.page}`;
    } else {
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

export default warehouseDeleveryOrders;
