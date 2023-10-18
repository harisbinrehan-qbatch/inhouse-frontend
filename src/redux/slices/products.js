import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notification } from 'antd';

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
    page: 1,
    isProductError: false,
    productMessage: null,
    loading: false,
    editSuccess: false,
    deleteSuccess: false,
    addSuccess: false,
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
    setPageOne(state) {
      state.page = 1;
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
        state.productMessage = action.payload.message || 'Internal Server Error.';
        state.data = [];
        state.isProductError = true;
        state.loading = false;
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.addSuccess = true;
        state.productMessage = action.payload.message || 'Product added Successfully';
        notification.success({
          message: 'Success',
          description: state.productMessage,
          type: 'success',
          duration: 2,
        });
      })
      .addCase(addProduct.pending, (state) => {
        state.addSuccess = false;
      })
      .addCase(addProduct.rejected, (state) => {
        state.addSuccess = false;
        state.productMessage = 'Error adding product';
        notification.error({
          message: 'ERROR!',
          description: state.productMessage,
          type: 'success',
          duration: 2,
        });
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.data = action.payload.products;
        state.productMessage = action.payload.message || 'Product deleted Successfully';
        state.deleteSuccess = true;
        notification.success({
          message: 'Success',
          description: state.productMessage,
          type: 'success',
          duration: 2,
        });
      })
      .addCase(deleteProduct.pending, (state) => {
        state.deleteSuccess = false;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.deleteSuccess = true;
        state.productMessage = 'Error deleting product';
        notification.error({
          message: 'ERROR!',
          description: state.productMessage,
          type: 'success',
          duration: 2,
        });
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.data = action.payload.products;
        state.productMessage = action.payload.message || 'Product updated Successfully';
        state.editSuccess = true;
        notification.success({
          message: 'Success',
          description: state.productMessage,
          type: 'success',
          duration: 2,
        });
      })
      .addCase(updateProduct.pending, (state) => {
        state.editSuccess = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.productMessage = action.payload.message || 'Error Updating product';
        state.editSuccess = false;
        notification.error({
          message: 'ERROR!',
          description: state.productMessage,
          type: 'success',
          duration: 2,
        });
      });
  },
});

export const {
  incrementPage, decrementPage, setPageOne, setShow, setUpdateCanvasShow,
} = productsSlice.actions;
export default productsSlice;
