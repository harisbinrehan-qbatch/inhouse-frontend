import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { notification } from 'antd';
import axios from 'axios';

export const signUpUser = createAsyncThunk(
  'signUpStatus',
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/v1/auth/signup',
        body,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const loginUser = createAsyncThunk(
  'loginStatus',
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/v1/auth/signin',
        body,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/v1/auth/forgotPassword', body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    signUpError: false,
    signUpMessage: null,
    loginMessage: null,
    loginError: false,
    user: {},
    isAdmin: false,
    isUser: false,
    token: '',
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user');
      state.user = '';
      state.isAdmin = false;
      state.isUser = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.signUpError = false;
        state.signUpMessage = action.payload.message || 'Signup Successful';
        notification.success({
          message: 'Success',
          description: state.signUpMessage,
          type: 'success',
          duration: 2,
        });
      })
      .addCase(signUpUser.pending, (state) => {
        state.signUpError = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.signUpError = true;
        state.signUpMessage = action.payload.message || 'Signup failed';
        notification.error({
          message: 'Error',
          description: state.signUpMessage,
          type: 'error',
          duration: 2,
        });
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginError = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));

        if (state.user.isAdmin === true) {
          state.isAdmin = true;
          state.isUser = false;
        } else {
          state.isAdmin = false;
          state.isUser = true;
        }
        state.loginMessage = action.payload.message || 'Login Successful';
        notification.success({
          message: 'Login Success',
          type: 'success',
          duration: 2,
        });
      })
      .addCase(loginUser.pending, (state) => {
        state.loginError = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginError = true;
        state.loginMessage = action.payload?.message || 'Login failed';
        notification.error({
          message: 'error',
          description: state.loginMessage,
          type: 'error',
          duration: 2,
        });
      })

      .addCase(forgotPassword.fulfilled, (state, action) => {
        // Handle successful forgotPassword action
        notification.success({
          message: 'Password Reset',
          description: action.payload.message || 'Password reset successful',
          type: 'success',
          duration: 2,
        });
      })
      .addCase(forgotPassword.pending, () => {})
      .addCase(forgotPassword.rejected, (state, action) => {
        notification.error({
          message: 'Error',
          description: action.payload.message || 'Password reset failed',
          type: 'error',
          duration: 2,
        });
      });
  },
});

export const {
  logout, getToken, getUser,
} = authSlice.actions;
export default authSlice;
