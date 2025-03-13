// src/store/reducers/productsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  categories: [],
  selectedCategory: null,
  pagination: {
    limit: 15,
    skip: 0,
    hasMore: true,
  },
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    appendProducts: (state, action) => {
      state.products = [...state.products, ...action.payload];
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.pagination.skip = 0;
      state.pagination.hasMore = true;
    },
    incrementSkip: (state) => {
      state.pagination.skip += state.pagination.limit;
    },
    setHasMore: (state, action) => {
      state.pagination.hasMore = action.payload;
    },
  },
});

export const { 
  setProducts, 
  appendProducts, 
  setCategories, 
  setSelectedCategory,
  incrementSkip,
  setHasMore,
} = productsSlice.actions;

export default productsSlice.reducer;