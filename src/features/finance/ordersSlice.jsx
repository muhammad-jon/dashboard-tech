import { createSlice } from '@reduxjs/toolkit';
import fetchFinanceOrders from './ordersThunk';
import completeThePurchase from './completeThePurchaseThunk';
import payForPurchase from './payForPurchaseThunk';

const financeOrdersSlice = createSlice({
  name: 'financeorders',
  initialState: {
    data: null,
    loading: false,
    error: null,
    order: null,
    payment: null,
    complete: null,
  },
  reducers: {
    setOrder: (state, action) => {
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
      })
      .addCase(completeThePurchase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeThePurchase.fulfilled, (state, action) => {
        state.loading = false;
        state.complete = action.payload;
      })
      .addCase(completeThePurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(payForPurchase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(payForPurchase.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(payForPurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setOrder } = financeOrdersSlice.actions;

export default financeOrdersSlice.reducer;
