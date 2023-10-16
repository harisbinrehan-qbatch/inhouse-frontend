import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { page } = state.products;
      const limit = 10;
      const response = await axios.get(
        `http://localhost:5000/v1/products/fetchProducts?limit=${limit}&skip=${
          (page - 1) * limit
        }`,
      );
      if (response.data.products.length === 0) {
        return rejectWithValue(response.data);
      }
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/v1/products/addProduct',
        requestData,
      );
      console.log(response.data);
      return response.data; // Updated to return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (requestData, { rejectWithValue }) => {
    console.log(requestData);
    try {
      const response = await axios.get(
        `http://localhost:5000/v1/products/searchProducts?name=${requestData}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    show: false,
    data: [],
    isProductError: false,
    productErrorMessage: null,
    page: 1,
    loading: false,
  },
  reducers: {
    setShow(state) {
      state.show = !state.show;
    },
    incrementPage(state) {
      state.page += 1;
    },
    decrementPage(state) {
      state.page -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isProductError = false;
        state.loading = false;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.isProductError = false;
        state.loading = true;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.data = [];
        state.isProductError = true;
        state.loading = false;
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.productErrorMessage = action.payload.message || 'Product added Successfully';
      })
      .addCase(addProduct.pending, () => {}) // Removed extra parentheses
      .addCase(addProduct.rejected, (state) => {
        state.productErrorMessage = 'Error adding product';
      })

      .addCase(searchProducts.fulfilled, (state, action) => {
        console.log('In fulfilled', action.payload);
        state.data = action.payload.products;
        state.isProductError = false;
        state.loading = false;
      })
      .addCase(searchProducts.pending, (state) => {
        state.isProductError = false;
        state.loading = true;
      })
      .addCase(searchProducts.rejected, (state) => {
        state.data = [];
        state.isProductError = true;
        state.loading = false;
        console.log('In rejected');
      });
  },
});

export const { incrementPage, decrementPage, setShow } = productsSlice.actions;
export default productsSlice;
