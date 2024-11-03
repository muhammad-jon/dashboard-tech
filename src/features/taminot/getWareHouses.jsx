import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'config';

const getWareHouses = createAsyncThunk(
  'getWareHousess',
  async (arg, { getState }) => {
    const token = getState().auth.token;

    let url = BASE_URL + 'supplier-warehouses/pagination/0';

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

export default getWareHouses;
