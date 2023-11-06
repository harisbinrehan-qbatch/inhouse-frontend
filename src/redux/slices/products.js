import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notification } from 'antd';

export const fetchUserProducts = createAsyncThunk(
  'products/fetchUserProducts',
  async ({ filterObject }, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.get(
        'http://localhost:5000/v1/products/fetchUserProducts',
        {
          params: {
            ...filterObject,
          },
          headers: {
            Authorization: `Bearer ${state.authentication.user.token}`,
          },
        },
      );

      if (response.data.products.length === 0) {
        return rejectWithValue({ error: 'No Products Found' });
      }

      if (response.data.message) {
        return rejectWithValue({ error: response.data.message });
      }

      return response.data.products;
    } catch (error) {
      return rejectWithValue({ error: 'Network Error', originalError: error });
    }
  },
);

export const fetchAdminProducts = createAsyncThunk(
  'products/fetchAdminProducts',
  async (filterObject, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { limit } = state.products;
      const { page } = state.products;
      const response = await axios.get(
        `http://localhost:5000/v1/products/fetchAdminProducts?skip=${
          (page - 1) * limit
        }&limit=${limit}`,
        {
          params: {
            filterObject,
          },
          headers: {
            Authorization: `Bearer ${getState().authentication.user.token}`,
          },
        },
      );

      if (response.data.products.length === 0) {
        return rejectWithValue({ error: 'No Products Found' });
      }

      if (response.data.message) {
        return rejectWithValue({ error: response.data.message });
      }

      return response.data;
    } catch (error) {
      return rejectWithValue({ error: 'Network Error', originalError: error });
    }
  },
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (requestData, { getState, rejectWithValue }) => {
    const state = getState();

    try {
      const response = await axios.post(
        'http://localhost:5000/v1/products/addProduct',
        requestData,
        {
          headers: {
            Authorization: `Bearer ${state.authentication.user.token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data });
    }
  },
);
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (_id, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.delete(
        `http://localhost:5000/v1/products/deleteProduct?_id=${_id}`,
        {
          headers: {
            Authorization: `Bearer ${state.authentication.user.token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (body, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.put(
        'http://localhost:5000/v1/products/updateProduct',
        body,
        {
          headers: {
            Authorization: `Bearer ${state.authentication.user.token}`,
          },
        },
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
    updateCanvasShow: false,
    data: [],
    page: 1,
    limit: 7,
    totalCount: 0,
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
    setPage(state, action) {
      state.page = action.payload;
    },

    setLimit(state, action) {
      state.limit = action.payload;
    },

    setTotalCount(state, action) {
      state.totalCount = action.payload;
    },
    setAnyPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isProductError = false;
        state.loading = false;
      })
      .addCase(fetchUserProducts.pending, (state) => {
        state.isProductError = false;
        state.loading = true;
      })
      .addCase(fetchUserProducts.rejected, (state, action) => {
        state.productMessage = action.payload || 'Internal Server Error.';
        state.data = [];
        state.isProductError = true;
        state.loading = false;
      })

      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        console.log('Here action.payload is ', action.payload);
        state.data = action.payload.products;
        state.totalCount = action.payload.totalCount;
        state.isProductError = false;
        state.loading = false;
      })
      .addCase(fetchAdminProducts.pending, (state) => {
        state.isProductError = false;
        state.loading = true;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.productMessage = action.payload || 'Internal Server Error.';
        state.data = [];
        state.isProductError = true;
        state.loading = false;
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.addSuccess = true;
        state.productMessage = action.payload?.message || 'Product added Successfully';
        notification.success({
          message: 'Success',
          description: state.productMessage,
          type: 'success',
          duration: 1,
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
          duration: 1,
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
          duration: 1,
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
          duration: 1,
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
          duration: 1,
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
          duration: 1,
        });
      });
  },
});

export const {
  incrementPage,
  decrementPage,
  setPageOne,
  setShow,
  setUpdateCanvasShow,
  setPage,
  setLimit,
  setTotalCount,
  setAnyPage,
} = productsSlice.actions;

export default productsSlice;
