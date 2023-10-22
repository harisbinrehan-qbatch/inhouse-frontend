/* eslint-disable no-underscore-dangle */
import { createSlice } from '@reduxjs/toolkit';
import { notification } from 'antd';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    addresses: [],
    haveAddress: false,
    paymentDetails: null,
    orderSummary: null,
    mastercardShow: false,
    addressShow: false,
    proceedToCheckout: false,
  },
  reducers: {
    setPaymentDetails: (state, action) => {
      if (
        Object.values(action.payload).some((field) => field === null || field === '')
      ) {
        notification.error({
          message: 'Error',
          description: 'Payment fields cannot be empty.',
          type: 'error',
          duration: 2,
        });
      } else {
        // If no field is empty, update the state and show a success notification
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
    setAddressShow(state) {
      state.addressShow = !state.addressShow;
    },
    setProceedToCheckout: (state) => {
      state.proceedToCheckout = !state.proceedToCheckout;
    },
    addToCart: (state, action) => {
      const productToAdd = action.payload;

      const existingProduct = state.cart.find(
        (item) => item._id === productToAdd._id,
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        console.log('Here?', state.cart);
        state.cart.push({ ...productToAdd, quantity: 1 });
        console.log('Here after?', state.cart);
      }
      notification.success({
        message: 'Success',
        description: 'Product added to the cart.',
        type: 'success',
        duration: 2,
      });
    },
    removeFromCart: (state, action) => {
      console.log('removeFromCart', action.payload);
      const itemIdToRemove = action.payload._id;
      state.cart = state.cart.filter((item) => item._id !== itemIdToRemove);
      notification.success({
        message: 'Success',
        description: 'Product removed from cart.',
        type: 'success',
        duration: 2,
      });
    },
    incrementQuantity: (state, action) => {
      const itemIdToIncrement = action.payload._id;
      const productToIncrement = state.cart.find(
        (item) => item._id === itemIdToIncrement,
      );
      if (productToIncrement) {
        productToIncrement.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const itemIdToDecrement = action.payload._id;
      const productToDecrement = state.cart.find(
        (item) => item._id === itemIdToDecrement,
      );
      if (productToDecrement && productToDecrement.quantity > 1) {
        productToDecrement.quantity -= 1;
      }
    },
    selectAllCartItems: (state) => {
      state.cart.forEach((item) => {
        item.selected = true;
      });
    },
    deselectAllCartItems: (state) => {
      state.cart.forEach((item) => {
        item.selected = false;
      });
    },
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
  setOrderSummary,
  addAddress,
  setPaymentDetails,
} = cartSlice.actions;

export default cartSlice;
