import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (name, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { page } = state.products;
      const limit = 7;
      let url = `http://localhost:5000/v1/products/fetchProducts?limit=${limit}&skip=${
        (page - 1) * limit
      }`;
      if (name) {
        url += `&name=${name}`;
      }
      const response = await axios.get(
        url,
      );
      console.log('Haris', response.data);
      if (response.data.message) {
        console.log('hhkjjhss');
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
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (_id, { rejectWithValue }) => {
    try {
      // console.log("createAsyncThunk function", _id);
      const response = await axios.delete(
        `http://localhost:5000/v1/products/deleteProduct?_id=${_id}`,
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
      .addCase(addProduct.pending, () => {})
      .addCase(addProduct.rejected, (state) => {
        state.productMessage = 'Error adding product';
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.productMessage = action.payload.message || 'Product deleted Successfully';
        console.log("In fulfilled", state.productMessage);
      })
      .addCase(deleteProduct.pending, () => {})
      .addCase(deleteProduct.rejected, (state) => {
        state.productMessage = 'Error deleting product';
        console.log("In rejected", state.productMessage);
      });
  },
});

export const { incrementPage, decrementPage, setShow } = productsSlice.actions;
export default productsSlice;
