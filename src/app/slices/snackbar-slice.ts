import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

type Severity = 'error' | 'info' | 'success' | 'warning';

interface SnackbarState {
  open: boolean;
  severity: Severity;
  message: string;
}

interface ShowSnackbarPayload {
  severity: Severity;
  message: string;
}

const initialState: SnackbarState = {
  open: false,
  severity: 'info',
  message: '',
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<ShowSnackbarPayload>) => {
      state.open = true;
      state.severity = action.payload.severity;
      state.message = action.payload.message;
    },
    hideSnackbar: (state) => {
      state.open = false;
      state.message = '';
    },
  },
});

export const { showSnackbar, hideSnackbar } = slice.actions;

export const selectSnackbar = (state: RootState) => state.snackbar;

export default slice.reducer;
