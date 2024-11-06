import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

//yetkazib beruvchi
import balanceReducer from '../features/yetkaziberuvchi/balanceSlice';
import purchaseInvoicesReducer from '../features/yetkaziberuvchi/invoiceSlice';
import purchaseOrdersReducer from '../features/yetkaziberuvchi/ordersSlice';

//ceo
import CEOordersReducer from '../features/ceo/ordersSlice';

//finance
import financeOrdersReducer from '../features/finance/ordersSlice';

//taminot
import taminotItemsReducer from '../features/taminot/itemsSlice';

//warehouse manager
import warehouseOrdersReducer from '../features/warehousemanager/ordersSlice';

// laborant
import laborantOrdersReducer from '../features/laborant/ordersSlice';

// main laborant
import mainLaborantOrdersReducer from '../features/mainlaborant/ordersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    balance: balanceReducer,
    purchaseInvoices: purchaseInvoicesReducer,
    purchaseOrders: purchaseOrdersReducer,
    ceoOrders: CEOordersReducer,
    financeOrders: financeOrdersReducer,
    taminotItems: taminotItemsReducer,
    warehouseOrders: warehouseOrdersReducer,
    laborantOrders: laborantOrdersReducer,
    mainLaborantOrders: mainLaborantOrdersReducer,
  },
});
