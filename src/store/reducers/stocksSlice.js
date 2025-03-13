// src/store/reducers/stocksSlice.js
import { createSlice } from '@reduxjs/toolkit';
import stockData from '../../data/gainers.json';

const initialState = {
  topGainers: stockData.top_gainers || [],
  topLosers: stockData.top_losers || [],
};

export const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    setTopGainers: (state, action) => {
      state.topGainers = action.payload;
    },
    setTopLosers: (state, action) => {
      state.topLosers = action.payload;
    },
  },
});

export const { setTopGainers, setTopLosers } = stocksSlice.actions;

export default stocksSlice.reducer;