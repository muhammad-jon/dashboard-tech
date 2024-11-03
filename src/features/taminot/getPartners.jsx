import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'config';

const getPartners = createAsyncThunk(
  'supplier-business-partners',
  async (arg, { getState }) => {
    const token = getState().auth.token;
    console.log('arg', getState().auth);

    let url = BASE_URL + 'supplier-business-partners/vendors/pagination/0';

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

export default getPartners;
