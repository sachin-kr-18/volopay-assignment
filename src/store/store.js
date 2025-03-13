// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import stocksReducer from './reducers/stocksSlice';
import companyReducer from './reducers/companySlice';
import productsReducer from './reducers/productsSlice';

export const store = configureStore({
  reducer: {
    stocks: stocksReducer,
    company: companyReducer,
    products: productsReducer,
  },
});

export default store;