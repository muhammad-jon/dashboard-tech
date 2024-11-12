import { createSlice } from '@reduxjs/toolkit';
import fetchPurchaseOrders from './ordersThunk';
import addCarNumberThunk from './addCarNumberThunk';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    data: null,
    loading: false,
    error: null,
    order: null,
  },
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchaseOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPurchaseOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPurchaseOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCarNumberThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCarNumberThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addCarNumberThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
