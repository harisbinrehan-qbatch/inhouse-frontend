import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slices/authentication';
import productsSlice from '../slices/products';
import cartSlice from '../slices/cart';

const store = configureStore({
  reducer: {
    authentication: authSlice.reducer,
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
