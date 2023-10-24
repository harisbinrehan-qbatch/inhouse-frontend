/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notification } from 'antd';

export const placeOrder = createAsyncThunk(
  'cart/placeOrder',
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/v1/orders/placeOrder',
        requestData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data });
    }
  },
);

export const addAddress = createAsyncThunk(
  'cart/addAddress',
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/v1/orders/saveAddress',
        requestData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data });
    }
  },
);

export const getAddress = createAsyncThunk(
  'cart/getAddress',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/v1/orders/getAddresses?userId=${userId}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data });
    }
  },
);

export const savePaymentDetails = createAsyncThunk(
  'cart/savePaymentDetails',
  async (requestData, { rejectWithValue }) => {
    try {
      console.log('Here?', requestData);
      const response = await axios.post(
        'http://localhost:5000/v1/orders/paymentDetails',
        requestData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data });
    }
  },
);

export const updateDefaultAddress = createAsyncThunk(
  'cart/updateDefaultAddress',
  async (requestData, { rejectWithValue }) => {
    console.log('Here?', requestData);
    try {
      const response = await axios.put(
        'http://localhost:5000/v1/orders/updateDefaultAddress',
        requestData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data });
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartProducts: [],
    addresses: {},
    paymentDetails: null,
    orderSummary: null,
    addAddressSuccess: false,
    updateAddressSuccess: false,
    orderSuccess: false,
    mastercardShow: false,
    changeAddressShow: false,
    addressShow: false,
    proceedToCheckout: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const { product } = action.payload;
      const productToAdd = { ...product };
      const existingProduct = state.cartProducts.find(
        (item) => item._id === productToAdd._id,
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartProducts.push({ ...productToAdd, quantity: 1 });
      }
      notification.success({
        message: 'Success',
        description: 'Product added to the cart.',
        type: 'success',
        duration: 2,
      });
    },

    setOrderSummary: (state, action) => {
      state.orderSummary = action.payload;
    },
    setMastercardShow(state) {
      state.mastercardShow = !state.mastercardShow;
    },
    setChangeAddressShow(state) {
      state.changeAddressShow = !state.changeAddressShow;
    },
    setAddressShow(state) {
      state.addressShow = !state.addressShow;
    },
    setProceedToCheckout: (state) => {
      state.proceedToCheckout = !state.proceedToCheckout;
    },
    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload._id;
      state.cartProducts = state.cartProducts.filter(
        (item) => item._id !== itemIdToRemove,
      );
      notification.success({
        message: 'Success',
        description: 'Product removed from cart.',
        type: 'success',
        duration: 2,
      });
    },
    incrementQuantity: (state, action) => {
      const itemIdToIncrement = action.payload._id;
      const productToIncrement = state.cartProducts.find(
        (item) => item._id === itemIdToIncrement,
      );
      if (productToIncrement) {
        productToIncrement.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const itemIdToDecrement = action.payload._id;
      const productToDecrement = state.cartProducts.find(
        (item) => item._id === itemIdToDecrement,
      );
      if (productToDecrement && productToDecrement.quantity > 1) {
        productToDecrement.quantity -= 1;
      }
    },
    selectAllCartItems: (state) => {
      state.cartProducts.forEach((item) => {
        item.selected = true;
      });
    },
    deselectAllCartItems: (state) => {
      state.cartProducts.forEach((item) => {
        item.selected = false;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderSuccess = true;
        state.orderMessage = action.payload.message || 'Order Placed Successfully';
        notification.success({
          message: 'Success',
          description: state.orderMessage,
          type: 'success',
          duration: 2,
        });
      })
      .addCase(placeOrder.pending, (state) => {
        state.orderSuccess = false;
      })
      .addCase(placeOrder.rejected, (state) => {
        state.orderSuccess = false;
        state.orderMessage = 'Error placing order';
        notification.error({
          message: 'ERROR!',
          description: state.orderMessage,
          type: 'error',
          duration: 2,
        });
      })

      .addCase(savePaymentDetails.fulfilled, (state, action) => {
        console.log('savePaymentDetails fulfilled', action.payload);
        state.paymentDetails = action.payload.paymentDetails;
        state.orderMessage = action.payload.message || 'Payment Details Saved Successfully';
        notification.success({
          message: 'Success',
          description: state.orderMessage,
          type: 'success',
          duration: 2,
        });
      })
      .addCase(savePaymentDetails.pending, () => {})
      .addCase(savePaymentDetails.rejected, (state, action) => {
        console.log('savePaymentDetails rejected', action.payload);
        state.orderMessage = 'Error saving payment details';
        notification.error({
          message: 'ERROR!',
          description: state.orderMessage,
          type: 'error',
          duration: 2,
        });
      })

      .addCase(getAddress.fulfilled, (state, action) => {
        state.addresses = action.payload.addresses[0];
      })
      .addCase(getAddress.pending, () => {})
      .addCase(getAddress.rejected, () => {})

      .addCase(addAddress.fulfilled, (state, action) => {
        state.addAddressSuccess = true;
        state.orderMessage = action.payload.message;
        notification.success({
          message: 'Success',
          description: state.addAddressSuccess,
          type: 'success',
          duration: 2,
        });
      })
      .addCase(addAddress.pending, (state) => {
        state.addAddressSuccess = false;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.orderSuccess = false;
        state.orderMessage = action.payload.message;
        notification.error({
          message: 'ERROR!',
          description: state.orderMessage,
          type: 'error',
          duration: 2,
        });
      })

      .addCase(updateDefaultAddress.fulfilled, (state) => {
        state.updateAddressSuccess = true;
        notification.success({
          message: 'Success',
          description: 'Default address updated successfully.',
          type: 'success',
          duration: 2,
        });
      })
      .addCase(updateDefaultAddress.pending, (state) => {
        state.updateAddressSuccess = false;
      })
      .addCase(updateDefaultAddress.rejected, (state) => {
        state.updateAddressSuccess = false;
        state.orderMessage = 'Error updating default address';
        notification.error({
          message: 'ERROR!',
          description: state.orderMessage,
          type: 'error',
          duration: 2,
        });
      });
  },
});

export const {
  addToCart,
  setOrderSummary,
  setMastercardShow,
  setChangeAddressShow,
  setAddressShow,
  setProceedToCheckout,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  selectAllCartItems,
  deselectAllCartItems,
} = cartSlice.actions;

export default cartSlice;
