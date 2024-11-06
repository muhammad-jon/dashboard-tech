import { createSlice } from '@reduxjs/toolkit';
import fetchPurchaseOrders from './ordersThunk';
import packOrderWarehouse from './packOrderThunk';
import warehouseDeleveryOrders from './deleveryOrdersThunk';

const ordersSlice = createSlice({
  name: 'warehouse/orders',
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
      .addCase(packOrderWarehouse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(packOrderWarehouse.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(packOrderWarehouse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(warehouseDeleveryOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(warehouseDeleveryOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(warehouseDeleveryOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
