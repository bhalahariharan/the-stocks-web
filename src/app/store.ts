import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authReducer from './slices/auth-slice';
import snackbarReducer from './slices/snackbar-slice';
import stocksEtfsReducer from './slices/stocks-etfs-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    snackbar: snackbarReducer,
    stocksEtfs: stocksEtfsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
