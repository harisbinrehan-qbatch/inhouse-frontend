/* eslint-disable no-underscore-dangle */
import { createSlice } from '@reduxjs/toolkit';
import { notification } from 'antd';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = action.payload;
      // Check if the product is already in the cart
      const existingProduct = state.cart.find(
        (item) => item._id === productToAdd._id,
      );
      if (existingProduct) {
        // If the product is in the cart, increment its quantity
        existingProduct.quantity += 1;
      } else {
        // If the product is not in the cart, add it with quantity 1
        state.cart.push({ ...productToAdd, quantity: 1 });
      }
      notification.success({
        message: 'Success',
        description: 'Product added to the cart.',
        type: 'success',
        duration: 2,
      });
    },
    removeFromCart: (state, action) => {
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
      console.log('INREDUX', state.cart);
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
} = cartSlice.actions;

export default cartSlice;
