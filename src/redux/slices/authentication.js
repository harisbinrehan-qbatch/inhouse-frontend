import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';

export const verifyUser = createAsyncThunk(
  'auth/verifyUser',
  async (body, { rejectWithValue }) => {
    try {
      console.log('in createAsyncThunk', body);

      const response = await axios.post(
        'http://localhost:5000/v1/auth/verifyUser',
        body,
        {
          headers: {
            Authorization: `Bearer ${body.token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue({
        error: error.response.data.error,
      });
    }
  },
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (body, { rejectWithValue }) => {
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
      return rejectWithValue({
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
    isVerifiedUser: false,
    token: '',
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user');
      state.user = '';
      state.isAdmin = false;
      state.isUser = false;
      state.loginError = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.fulfilled, (state) => {
        state.signUpError = false;
      })
      .addCase(signUpUser.pending, (state) => {
        state.signUpError = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.signUpError = true;
        state.signUpMessage = action.payload.message || 'Signup failed';
        message.error(state.signUpMessage, 2);
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
        message.success('Login Successful', 2);
      })
      .addCase(loginUser.pending, () => {})
      .addCase(loginUser.rejected, (state, action) => {
        state.loginError = true;
        state.loginMessage = action.payload?.message || 'Login failed';
        message.error(state.loginMessage, 2);
      })

      .addCase(sendEmail.fulfilled, (state, action) => {
        message.success(action.payload.message || 'Email sent successfully', 2);
      })
      .addCase(sendEmail.pending, () => {})
      .addCase(sendEmail.rejected, (state, action) => {
        message.error(action.payload.message || 'Error Sending Email', 2);
      })

      .addCase(resetPassword.fulfilled, (state, action) => {
        console.log('in fulfilled', action.payload);
        state.resetPasswordError = false;
        state.resetPasswordMessage = action.payload.message || 'Password reset successful';
        if (state.resetPasswordMessage === 'Invalid or expired token') {
          message.warning(state.resetPasswordMessage, 2);
        } else {
          message.success(state.resetPasswordMessage, 2);
        }
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordError = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordError = true;
        console.log('in rejected', action.payload);
        state.resetPasswordMessage = action.payload.message || 'Password reset failed';
        message.error(state.resetPasswordMessage, 2);
      })

      .addCase(verifyUser.fulfilled, (state) => {
        state.isVerifiedUser = true;
        message.success('User created successfully', 2);
      })
      .addCase(verifyUser.pending, () => {})
      .addCase(verifyUser.rejected, (state) => {
        state.isVerifiedUser = false;
        message.error('Error Verifying User', 2);
      });
  },
});

export const {
  logout, getToken, getUser,
} = authSlice.actions;
export default authSlice;
