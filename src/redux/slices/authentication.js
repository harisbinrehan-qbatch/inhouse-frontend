import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAdmin: true,
    signUpError: null,
    loginError: null,
    user: {},
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user');
      state.user = '';
    },
  },

  extraReducers: {
    [signUpUser.fulfilled]: (state, action) => {
      state.signUpError = null;
      state.user = action.payload;
      state.signUpError = action.payload.message || 'Signup Successful';
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    [signUpUser.pending]: (state) => {
      state.signUpError = null;
    },
    [signUpUser.rejected]: (state, action) => {
      state.signUpError = action.payload.message || 'Signup failed';
    },

    [loginUser.fulfilled]: (state, action) => {
      state.loginError = null;
      state.user = action.payload;
      state.loginError = action.payload.message || 'Login Successful';
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    [loginUser.pending]: (state) => {
      state.loginError = null;
    },
    [loginUser.rejected]: (state, action) => {
      state.loginError = action.payload.message || 'Login failed';
    },
  },
});

export const { logout, getToken, getUser } = authSlice.actions;
export default authSlice;
