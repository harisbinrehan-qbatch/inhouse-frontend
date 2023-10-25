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

export const setOrderAsDelivered = createAsyncThunk(
  'orders/setOrderAsDelivered',
  async (orderId, { rejectWithValue }) => {
    try {
      console.log('setOrderAsDelivered createAsyncThunk', orderId);
      const response = await axios.put(
        `http://localhost:5000/v1/orders/setIsDelivered?orderId=${orderId}`,
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
    orders: [],
    loading: false,
    ordersError: false,
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
        state.error = false;
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.message
          : 'An error occurred';
      })

      .addCase(setOrderAsDelivered.fulfilled, () => {})
      .addCase(setOrderAsDelivered.pending, () => {})
      .addCase(setOrderAsDelivered.rejected, () => {});
  },
});

// export const {} = ordersSlice.actions; // after adding reducers

export default ordersSlice;
