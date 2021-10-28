import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import snackbarReducer from './slices/snackbar-slice';

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
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
