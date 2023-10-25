import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'http://localhost:5000/v1/orders/getOrders',
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data });
    }
  },
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [], // Initial state for orders
    loading: false, // Loading indicator
    error: null, // Error message
  },
  reducers: {
    // Other reducers for your orders slice
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        console.log('In fulfilllllled', action.payload);
        state.orders = action.payload.orders;
        console.log('Here??????', state.orders);
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.message
          : 'An error occurred';
      });
  },
});

// export const {} = ordersSlice.actions; // after adding reducers

export default ordersSlice;
