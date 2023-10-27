/* eslint-disable prefer-destructuring */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAll',
  async (orderId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      let url = 'http://localhost:5000/v1/orders/getOrders';

      if (orderId) {
        url += `?orderId=${orderId}`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${state.authentication.user.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data });
    }
  },
);

export const startAgendaJobs = createAsyncThunk(
  'orders/startAgendaJobs',
  async (orderId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response = await axios.get(
        'http://localhost:5000/v1/script?method=StartDashboardJob',
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

export const getOrderStats = createAsyncThunk(
  'orders/getOrderStats',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Here????????');
      const response = await axios.get(
        'http://localhost:5000/v1/orders/getOrderStats',
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const setOrderAsDelivered = createAsyncThunk(
  'orders/setOrderAsDelivered',
  async (orderId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response = await axios.put(
        `http://localhost:5000/v1/orders/setIsDelivered?orderId=${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${state.authentication.user.token}`,
          },
        },
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
    searchedOrders: [],
    loading: false,
    ordersError: false,
    orderStats: {},
    jobMessage: null,
  },
  reducers: {
    // Other reducers for your orders slice
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.searchedOrders = action.payload.searchedOrders;
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
      .addCase(setOrderAsDelivered.rejected, () => {})

      .addCase(startAgendaJobs.fulfilled, (state, action) => {
        state.jobMessage = action.payload;
      })
      .addCase(startAgendaJobs.pending, () => {})
      .addCase(startAgendaJobs.rejected, () => {})

      .addCase(getOrderStats.fulfilled, (state, action) => {
        state.orderStats = action.payload.data[0];
      })
      .addCase(getOrderStats.pending, () => {})
      .addCase(getOrderStats.rejected, () => {});
  },
});

// export const {} = ordersSlice.actions; // after adding reducers

export default ordersSlice;
