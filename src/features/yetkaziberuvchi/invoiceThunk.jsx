import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'config';

const fetchPurchaseInvoices = createAsyncThunk(
  'yetkaziberuvchi/invoice',
  async (arg, { getState }) => {
    const token = getState().auth.token;
    console.log('arg', arg);

    let url = BASE_URL + 'supplier-purchase-invoices/';

    if (arg.cardName !== '') {
      url += `search-by-card-name/${arg.cardName}/`;
    } else if (arg.startDate && arg.endDate) {
      url += `search-by-between-doc-date/${arg.startDate}/${arg.endDate}/`;
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

export default fetchPurchaseInvoices;
