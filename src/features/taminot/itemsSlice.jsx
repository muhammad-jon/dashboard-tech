import { createSlice } from '@reduxjs/toolkit';
import fetchTaminotItems from './itemsThunk';
import addItemToTaminot from './addItemThunk';
import editItemTaminot from './editItemThunk';
import markAsDelevered from './markAsDeleveredThunk';
import addOrderToTaminot from './addOrderThunk';
import getDepartments from './getDepartments';
import getPartners from './getPartners';
import getItemsByWarehouseAndPrice from './getItemsByWarehouseAndPrice';
import getWareHouses from './getWareHouses';

const taminotItemsSlice = createSlice({
  name: 'financeorders',
  initialState: {
    data: null,
    loading: false,
    error: null,
    order: null,
    departments: null,
    partners: null,
    warehouse: null,
    warehouses: null,
  },
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaminotItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaminotItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTaminotItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addItemToTaminot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToTaminot.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addItemToTaminot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editItemTaminot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editItemTaminot.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editItemTaminot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(markAsDelevered.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAsDelevered.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(markAsDelevered.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addOrderToTaminot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrderToTaminot.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addOrderToTaminot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.partners = action.payload;
      })
      .addCase(getPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getItemsByWarehouseAndPrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getItemsByWarehouseAndPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.warehouse = action.payload;
      })
      .addCase(getItemsByWarehouseAndPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getWareHouses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWareHouses.fulfilled, (state, action) => {
        state.loading = false;
        state.warehouses = action.payload;
      })
      .addCase(getWareHouses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setOrder } = taminotItemsSlice.actions;

export default taminotItemsSlice.reducer;
