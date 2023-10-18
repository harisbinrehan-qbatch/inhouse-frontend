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
      return rejectWithValue({ message: error.response.data });
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

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (body, { rejectWithValue }) => {
    try {
      console.log('createAsyncThunk function', body);
      const response = await axios.put('http://localhost:5000/v1/products/updateProduct', body);
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
    updateCanvasShow: false,
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

    setUpdateCanvasShow(state) {
      state.updateCanvasShow = !state.updateCanvasShow;
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
        console.log('In fulfilled', action.payload);
        state.data = action.payload;
        state.isProductError = false;
        state.loading = false;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.isProductError = false;
        state.loading = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productMessage = action.payload.message || 'Internal Server Error.';
        state.data = [];
        state.isProductError = true;
        state.loading = false;
        console.log('In Rejected', action.payload.message);
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
        console.log('In fulfilled', state.productMessage);
      })
      .addCase(deleteProduct.pending, () => {})
      .addCase(deleteProduct.rejected, (state) => {
        state.productMessage = 'Error deleting product';
        console.log('In rejected', state.productMessage);
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.productMessage = action.payload || 'Product updated Successfully';
        console.log('In fulfilled', state.productMessage);
      })
      .addCase(updateProduct.pending, () => {})
      .addCase(updateProduct.rejected, (state) => {
        state.productMessage = 'Error Updating product';
        console.log('In rejected', state.productMessage);
      });
  },
});

export const {
  incrementPage, decrementPage, setShow, setUpdateCanvasShow,
} = productsSlice.actions;
export default productsSlice;
