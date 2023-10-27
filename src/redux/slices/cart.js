/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notification } from 'antd';

export const placeOrder = createAsyncThunk(
  'cart/placeOrder',
  async (requestData, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.post(
        'http://localhost:5000/v1/orders/placeOrder',
        requestData,
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

export const addAddress = createAsyncThunk(
  'cart/addAddress',
  async (requestData, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.post(
        'http://localhost:5000/v1/orders/saveAddress',
        requestData,
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

export const getAddress = createAsyncThunk(
  'cart/getAddress',
  async (userId, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.get(
        `http://localhost:5000/v1/orders/getAddresses?userId=${userId}`,
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

export const getPaymentDetails = createAsyncThunk(
  'cart/getPaymentDetails',
  async (userId, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.get(
        `http://localhost:5000/v1/orders/getPaymentDetails?userId=${userId}`,
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

export const savePaymentDetails = createAsyncThunk(
  'cart/savePaymentDetails',
  async (requestData, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.post(
        'http://localhost:5000/v1/orders/paymentDetails',
        requestData,
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

export const updateDefaultAddress = createAsyncThunk(
  'cart/updateDefaultAddress',
  async (requestData, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await axios.put(
        'http://localhost:5000/v1/orders/updateDefaultAddress',
        requestData,
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

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartProducts: [],
    userCart: [],
    selectedCartProducts: [],
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
    setCartSummaryNull: (state) => {
      state.orderSummary = null;
    },

    getCartOfSpecificUser: (state) => {
      const user = JSON.parse(localStorage.getItem('user'));

      const userCart = state.cartProducts.find(
        (cartItem) => cartItem.userId === user.userId,
      );
      if (userCart) {
        state.userCart = userCart;
      } else {
        state.userCart = [];
      }
    },

    addToCart: (state, action) => {
      const { userId, product } = action.payload;

      const userCart = state.cartProducts.find(
        (cart) => cart.userId === userId,
      );

      if (!userCart) {
        state.cartProducts.push({
          userId,
          products: [{ ...product, quantity: 1 }],
        });
      } else {
        const existingProduct = userCart.products.find(
          (item) => item._id === product._id,
        );

        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          userCart.products.push({ ...product, quantity: 1 });
        }
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
      const user = JSON.parse(localStorage.getItem('user'));
      state.cartProducts = state.cartProducts.map((cartItem) => {
        if (cartItem.userId === user.userId) {
          cartItem.products = cartItem.products.filter(
            (product) => product._id !== itemIdToRemove,
          );
        }
        return cartItem;
      });
      notification.success({
        message: 'Success',
        description: 'Product removed from cart.',
        type: 'success',
        duration: 2,
      });
    },
    incrementQuantity: (state, action) => {
      const itemIdToIncrement = action.payload._id;
      const user = JSON.parse(localStorage.getItem('user'));
      state.cartProducts = state.cartProducts.map((cartItem) => {
        if (cartItem.userId === user.userId) {
          cartItem.products = cartItem.products.map((product) => {
            if (product._id === itemIdToIncrement) {
              product.quantity += 1;
            }
            return product;
          });
        }
        return cartItem;
      });
    },

    decrementQuantity: (state, action) => {
      const itemIdToIncrement = action.payload._id;
      const user = JSON.parse(localStorage.getItem('user'));
      state.cartProducts = state.cartProducts.map((cartItem) => {
        if (cartItem.userId === user.userId) {
          cartItem.products = cartItem.products.map((product) => {
            if (product._id === itemIdToIncrement) {
              if (product.quantity !== 1) {
                product.quantity -= 1;
              }
            }
            return product;
          });
        }
        return cartItem;
      });
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

  toggleCartProductSelection: (state, action) => {
    const { productId } = action.payload;
    const product = state.cartProducts.find((item) => item._id === productId);
    if (product) {
      product.selected = !product.selected;

      if (product.selected) {
        state.selectedCartProducts.push(product);
      } else {
        state.selectedCartProducts = state.selectedCartProducts.filter(
          (item) => item._id !== productId,
        );
      }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.userCart = null;
        state.orderSuccess = true;
        state.orderMessage = action.payload.message || 'Order Placed Successfully';

        const user = JSON.parse(localStorage.getItem('user'));
        state.cartProducts = state.cartProducts.filter(
          (cartItem) => cartItem.userId !== user.userId,
        );

        state.selectedCartProducts = [];

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
      .addCase(savePaymentDetails.rejected, (state) => {
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

      .addCase(getPaymentDetails.fulfilled, (state, action) => {
        state.paymentDetails = action.payload.payments[0];
      })
      .addCase(getPaymentDetails.pending, () => {})
      .addCase(getPaymentDetails.rejected, () => {})

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
  toggleCartProductSelection,
  selectAllCartItems,
  deselectAllCartItems,
  getCartOfSpecificUser,
  setCartSummaryNull,
} = cartSlice.actions;

export default cartSlice;
