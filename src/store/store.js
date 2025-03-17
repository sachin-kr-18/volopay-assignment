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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
