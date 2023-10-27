import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import axios from 'axios';

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (body, thunkApi) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/v1/auth/resetPassword',
        body,
        {
          headers: {
            Authorization: `Bearer ${body.token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.response.data.error,
      });
    }
  },
);

export const sendEmail = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/v1/auth/sendEmail',
        email,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

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
          message: 'Login Successful',
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

      .addCase(sendEmail.fulfilled, (state, action) => {
        notification.success({
          message: action.payload.message || 'Email sent successfully',
          type: 'success',
          duration: 2,
        });
      })
      .addCase(sendEmail.pending, () => {})
      .addCase(sendEmail.rejected, (state, action) => {
        notification.error({
          message: 'Error',
          description: action.payload.message || 'Error Sending Email',
          type: 'error',
          duration: 2,
        });
      })

      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordError = false;
        state.resetPasswordMessage = action.payload.message || 'Password reset successful';

        notification.success({
          message: 'Password Reset Success',
          description: state.resetPasswordMessage,
          type: 'success',
          duration: 2,
        });
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordError = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordError = true;
        state.resetPasswordMessage = action.payload.error || 'Password reset failed';
        notification.error({
          message: 'Password Reset Error',
          description: state.resetPasswordMessage,
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
