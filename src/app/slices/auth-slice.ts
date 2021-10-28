import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../../app/store';
import { User } from '../../models/user.model';
import { getApiErrorResponse } from '../../utils/helpers';
import localStorage from '../../utils/local-storage';
import authService from '../services/auth-service';
import userService from '../services/user-service';
import { showSnackbar } from './snackbar-slice';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: { [key: string]: boolean };
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: { login: false, currentUser: false },
};

export const login = createAsyncThunk<string, string>(
  'auth/login',
  async (pin, { rejectWithValue, dispatch }) => {
    try {
      const response = await authService.login(pin);
      return response.data.accessToken;
    } catch (err) {
      const { data, errorMessage } = getApiErrorResponse(err);
      dispatch(showSnackbar({ severity: 'error', message: errorMessage }));
      return rejectWithValue(data);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User, void>(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.fetchCurrentUser();
      return response.data;
    } catch (err) {
      const { data } = getApiErrorResponse(err);
      return rejectWithValue(data);
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
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading.currentUser = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isAuthenticated = true;
        state.loading.currentUser = false;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading.currentUser = false;
      });
  },
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectLoading = (state: RootState) => state.auth.loading;

export const logout = (): AppThunk => (dispatch) => {
  localStorage.clear();
  dispatch(slice.actions.logout());
};

export default slice.reducer;
