/* eslint-disable no-underscore-dangle */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notification } from 'antd';

export const placeOrder = createAsyncThunk(
  'cart/placeOrder',
  async (requestData, { rejectWithValue }) => {
    console.log('in createAsyncThunk', requestData);
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

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartProducts: [],
    addresses: [],
    paymentDetails: null,
    orderSummary: null,
    orderSuccess: false,
    haveAddress: false,
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

    setDefaultAddress: (state, action) => {
      console.log('In setDefaultAddress', action.payload);
      state.addresses = state.addresses.map((singleAddress, index) => {
        if (index === action.payload) {
          singleAddress.isDefault = true;
        } else {
          singleAddress.isDefault = false;
        }
        return singleAddress;
      });
    },

    setPaymentDetails: (state, action) => {
      if (
        Object.values(action.payload).some(
          (field) => field === null || field === '',
        )
      ) {
        notification.error({
          message: 'Error',
          description: 'Payment fields cannot be empty.',
          type: 'error',
          duration: 2,
        });
      } else {
        state.paymentDetails = action.payload;
        notification.success({
          message: 'Success',
          description: 'Payment details added successfully.',
          type: 'success',
          duration: 2,
        });
      }
    },

    addAddress: (state, action) => {
      state.addresses.push(action.payload);
      notification.success({
        message: 'Success',
        description: 'Address added successfully.',
        type: 'success',
        duration: 2,
      });
      state.haveAddress = true;
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
      console.log('removeFromCart', action.payload);
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
          type: 'success',
          duration: 2,
        });
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  selectAllCartItems,
  deselectAllCartItems,
  setMastercardShow,
  setAddressShow,
  setProceedToCheckout,
  setChangeAddressShow,
  setOrderSummary,
  addAddress,
  setPaymentDetails,
  setDefaultAddress,
} = cartSlice.actions;

export default cartSlice;
