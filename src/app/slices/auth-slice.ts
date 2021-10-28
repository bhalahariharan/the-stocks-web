import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { AppThunk, RootState } from '../../app/store';
import localStorage from '../../utils/local-storage';
import authService from '../services/auth-service';
import { showSnackbar } from './snackbar-slice';

export interface AuthState {
  loading: { [key: string]: boolean };
}

const initialState: AuthState = {
  loading: { login: false },
};

export const login = createAsyncThunk<string, string>(
  'auth/login',
  async (pin, { rejectWithValue, dispatch }) => {
    try {
      const response = await authService.login(pin);
      return response.data.accessToken;
    } catch (err) {
      const error = (err as AxiosError).response?.data || {};
      const errMessage = error.message || 'An error occurred. Please try again';
      dispatch(showSnackbar({ severity: 'error', message: errMessage }));
      return rejectWithValue(error);
    }
  }
);

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading.login = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        localStorage.setAccessToken(payload);
        state.loading.login = false;
      })
      .addCase(login.rejected, (state) => {
        state.loading.login = false;
      });
  },
});

export const selectLoading = (state: RootState) => state.auth.loading;

export const logout = (): AppThunk => (dispatch) => {
  localStorage.clear();
  dispatch(slice.actions.logout());
};

export default slice.reducer;
