import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ limit, skip }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async ({ category, limit, skip }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://dummyjson.com/products/categories');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://dummyjson.com/products/add', productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://dummyjson.com/products/${id}`, productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  products: [],
  total: 0,
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
  pagination: {
    limit: 15,
    skip: 0,
    hasMore: true,
  },
  modalOpen: false,
  currentProduct: null,
  isEditing: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.products = [];
      state.pagination.skip = 0;
      state.pagination.hasMore = true;
    },
    incrementSkip: (state) => {
      state.pagination.skip += state.pagination.limit;
    },
    setHasMore: (state, action) => {
      state.pagination.hasMore = action.payload;
    },
    openModal: (state, action) => {
      state.modalOpen = true;
      state.currentProduct = action.payload;
      state.isEditing = !!action.payload;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.currentProduct = null;
      state.isEditing = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        if (state.pagination.skip === 0) {
          state.products = action.payload.products;
        } else {
          state.products = [...state.products, ...action.payload.products];
        }
        state.total = action.payload.total;
        state.pagination.hasMore = state.products.length < action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (state.pagination.skip === 0) {
          state.products = action.payload.products;
        } else {
          state.products = [...state.products, ...action.payload.products];
        }
        state.total = action.payload.total;
        state.pagination.hasMore = state.products.length < action.payload.total;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })
      
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      });
  },
});

export const { 
  setSelectedCategory, 
  incrementSkip, 
  setHasMore,
  openModal,
  closeModal
} = productsSlice.actions;

export default productsSlice.reducer;
