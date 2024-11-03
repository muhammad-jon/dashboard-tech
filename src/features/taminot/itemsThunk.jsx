import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'config';

const fetchTaminotItems = createAsyncThunk(
  'taminot/items',
  async (arg, { getState }) => {
    const token = getState().auth.token;
    console.log('arg', getState().auth);

    let url = BASE_URL;

    switch (arg.status) {
      case 1:
        url += `supplier-items/pagination/${arg.page}`;
        break;
      case 2:
        url += `finances/delivered/pagination/${arg.page}`;
        break;
      case 3:
        url += `finances/under-review/pagination/${arg.page}`;
        break;
      case 4:
        url += `finances/verified/pagination/${arg.page}`;
        break;
      case 5:
        url += `finances/shipped/pagination/${arg.page}`;
        break;
      case 6:
        url += `finances/completed/pagination/${arg.page}`;
        break;
      default:
        url += `finances/new/pagination/${arg.page}`;
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

export default fetchTaminotItems;
