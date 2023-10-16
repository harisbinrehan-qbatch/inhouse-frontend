import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slices/authentication';
import productsSlice from '../slices/products';

const store = configureStore({
  reducer: {
    authentication: authSlice.reducer,
    products: productsSlice.reducer,
  },
});

export default store;
