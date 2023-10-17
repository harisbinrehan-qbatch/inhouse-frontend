import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (name, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { page } = state.products;
      const limit = 10;
      let url = `http://localhost:5000/v1/products/fetchProducts?limit=${limit}&skip=${
        (page - 1) * limit
      }`;
      if (name) {
        url += `&name=${name}`;
      }
      const response = await axios.get(
        url,
      );
      console.log("Haris", response.data);
      if (response.data.message) {
        console.log("hhkjjhss");
        return rejectWithValue({ error: response.data.message });
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
    productMessage: null,
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
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productMessage = action.payload.error;
        state.data = [];
        state.isProductError = true;
        state.loading = false;
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.productMessage = action.payload.message || 'Product added Successfully';
      })
      .addCase(addProduct.pending, () => {}) // Removed extra parentheses
      .addCase(addProduct.rejected, (state) => {
        state.productMessage = 'Error adding product';
      });
  },
});

export const { incrementPage, decrementPage, setShow } = productsSlice.actions;
export default productsSlice;
