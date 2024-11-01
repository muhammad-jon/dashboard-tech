import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'config';

const fetchBalance = createAsyncThunk(
  'users/fetchUsers',
  async (_, { getState }) => {
    const token = getState().auth.token;

    const response = await axios({
      url: BASE_URL + 'supplier-business-partners/vendors/pagination/0',
      method: 'GET',
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.data;
    console.log(data);

    return data;
  },
);

export default fetchBalance;
