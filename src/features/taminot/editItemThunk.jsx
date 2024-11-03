import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'config';

const editItemTaminot = createAsyncThunk(
  'editItemTaminot',
  async (
    { itemCode, itemName, itemsGroupCode, category, valid },
    { rejectWithValue, getState },
  ) => {
    const token = getState().auth.token;
    try {
      const response = await axios({
        method: 'PATCH',
        url: BASE_URL + 'supplier-items/' + itemCode,
        data: {
          itemName,
          itemsGroupCode,
          category,
          valid,
        },
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export default editItemTaminot;
