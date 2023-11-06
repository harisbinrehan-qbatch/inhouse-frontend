/* eslint-disable max-len */
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
      console.log('In async thunk', requestData);
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
    userOrderDetailsShow: false,
  },
  reducers: {
    setCartSummaryNull: (state) => {
      state.orderSummary = null;
    },

    setOrderSuccess: (state) => {
      state.orderSuccess = false;
    },

    getCartOfSpecificUser: (state) => {
      const user = JSON.parse(localStorage.getItem('user'));

      if (state.cartProducts) {
        const userCart = state.cartProducts.find(
          (cartItem) => cartItem.userId === user.userId,
        );
        if (userCart) {
          state.userCart = userCart;
        } else {
          state.userCart = [];
        }
      } else {
        state.userCart = [];
      }
    },

    addToCart: (state, action) => {
      const { userId, product } = action.payload;
      state.proceedToCheckout = false;

      if (state.cartProducts) {
        const userCart = state.cartProducts.find((cart) => cart.userId === userId);

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
            if (userCart.products) {
              const matchingProduct = userCart.products.find(
                (singleProduct) => product._id === singleProduct._id,
              );

              if (matchingProduct) {
                console.log('First product quantity:', product.quantity);
                console.log('Matching product quantity:', matchingProduct.quantity);

                if (matchingProduct.quantity < product.quantity) {
                  existingProduct.quantity += 1;
                }
              }
            }
          } else {
            userCart.products.push({ ...product, quantity: 1 });
          }
        }

        notification.success({
          message: 'Success',
          description: 'Product added to the cart.',
          type: 'success',
          duration: 1,
        });
      } else {
        state.cartProducts = [
          {
            userId,
            products: [{ ...product, quantity: 1 }],
          },
        ];
      }
    },

    setOrderSummary: (state, action) => {
      state.orderSummary = action.payload;
    },

    setMastercardShow(state) {
      state.mastercardShow = !state.mastercardShow;
    },

    setUserOrderDetailsShow(state) {
      state.userOrderDetailsShow = !state.userOrderDetailsShow;
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

    moveToCartFromNavbar: (state) => {
      state.proceedToCheckout = false;
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
        duration: 1,
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

    deleteSelectedAll: (state) => {
      const user = JSON.parse(localStorage.getItem('user'));

      if (
        state.cartProducts.some((cartItem) => cartItem.userId === user.userId)
      ) {
        state.cartProducts = state.cartProducts.filter(
          (cartItem) => cartItem.userId !== user.userId,
        );

        notification.success({
          message: 'All products removed from cart',
          duration: 1,
        });
      } else {
        notification.warning({
          message: 'Cart is already empty',
          duration: 1,
        });
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.userCart = null;
        state.orderSummary = null;
        state.orderSuccess = true;
        state.proceedToCheckout = false;
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
          duration: 1,
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
          duration: 1,
        });
      })

      .addCase(savePaymentDetails.fulfilled, (state, action) => {
        state.paymentDetails = action.payload.paymentDetails;
        state.orderMessage = action.payload.message || 'Payment Details Saved Successfully';

        notification.success({
          message: 'Success',
          description: state.orderMessage,
          type: 'success',
          duration: 1,
        });
      })
      .addCase(savePaymentDetails.pending, () => {})
      .addCase(savePaymentDetails.rejected, (state) => {
        state.orderMessage = 'Error saving payment details';

        notification.error({
          message: 'ERROR!',
          description: state.orderMessage,
          type: 'error',
          duration: 1,
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
          description: state.orderMessage,
          type: 'success',
          duration: 1,
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
          duration: 1,
        });
      })

      .addCase(updateDefaultAddress.fulfilled, (state) => {
        state.updateAddressSuccess = true;

        notification.success({
          message: 'Default address updated successfully.',
          type: 'success',
          duration: 1,
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
          duration: 1,
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
  moveToCartFromNavbar,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  getCartOfSpecificUser,
  setCartSummaryNull,
  setUserOrderDetailsShow,
  deleteSelectedAll,
  setOrderSuccess,
} = cartSlice.actions;

export default cartSlice;
