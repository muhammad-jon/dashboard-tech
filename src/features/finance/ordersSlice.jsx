import { createSlice } from '@reduxjs/toolkit';
import fetchFinanceOrders from './ordersThunk';

const financeOrdersSlice = createSlice({
  name: 'ceoorders',
  initialState: {
    data: null,
    loading: false,
    error: null,
    order: null,
  },
  reducers: {
    setCeoOrder: (state, action) => {
      state.order = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFinanceOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFinanceOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFinanceOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCeoOrder } = financeOrdersSlice.actions;

export default financeOrdersSlice.reducer;
