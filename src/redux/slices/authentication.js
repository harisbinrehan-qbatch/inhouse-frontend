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
      console.log('in login aync', response.data);
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
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user');
      state.user = '';
    },
    setIsAdmin: (state) => {
      console.log('In setIsAdmin reducer function');
      const user = JSON.parse(localStorage.getItem('user'));

      if (user.isAdmin === true) {
        state.isAdmin = true;
      } else {
        state.isAdmin = false;
      }
    },
  },

  extraReducers: {
    [signUpUser.fulfilled]: (state, action) => {
      state.signUpError = false;
      state.user = action.payload;
      state.signUpMessage = action.payload.message || 'Signup Successful';
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    [signUpUser.pending]: (state) => {
      state.signUpError = false;
    },
    [signUpUser.rejected]: (state, action) => {
      state.signUpError = true;
      state.signUpMessage = action.payload.message || 'Signup failed';
    },

    [loginUser.fulfilled]: (state, action) => {
      state.loginError = false;
      state.user = action.payload;
      state.isAdmin = action.payload.isAdmin;
      state.loginMessage = action.payload.message || 'Login Successful';
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    [loginUser.pending]: (state) => {
      state.loginError = false;
    },
    [loginUser.rejected]: (state, action) => {
      state.loginError = true;
      state.loginMessage = action.payload.message || 'Login failed';
    },
  },
});

export const {
  logout, getToken, getUser, setIsAdmin,
} = authSlice.actions;
export default authSlice;
