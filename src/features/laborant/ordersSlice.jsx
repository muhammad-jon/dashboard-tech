import { createSlice } from '@reduxjs/toolkit';
import getLaborantOrders from './laborantOrdersThunk';
import startRewiew from './startFinishThunk';

const ordersSlice = createSlice({
  name: 'laborant/orders',
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
      .addCase(getLaborantOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLaborantOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getLaborantOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(startRewiew.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startRewiew.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(startRewiew.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
