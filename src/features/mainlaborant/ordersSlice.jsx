import { createSlice } from '@reduxjs/toolkit';
import getMainLaborantOrders from './mainLaborantOrdersThunk';
import acceptReject from './acceptRejectThunk';

const ordersSlice = createSlice({
  name: 'mainlaborant/orders',
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
      .addCase(getMainLaborantOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMainLaborantOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getMainLaborantOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(acceptReject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptReject.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(acceptReject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
