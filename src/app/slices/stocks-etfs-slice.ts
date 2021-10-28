import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { PageResponse } from '../../models/common';
import { Company, StocksEtfsPageInfo } from '../../models/stocksEtfs';
import { appendId, getApiErrorResponse } from '../../utils/helpers';
import stocksEtfsService from '../services/stocks-etfs-service';
import { showSnackbar } from './snackbar-slice';

export interface StocksEtfs {
  page: number;
  pageSize: number;
  data: Company[];
  totalElements: number;
}

export interface StocksEtfsState {
  stocks: StocksEtfs;
  etfs: StocksEtfs;
  loading: { [key: string]: boolean };
}

const initialState: StocksEtfsState = {
  stocks: {
    page: 0,
    pageSize: 10,
    data: [],
    totalElements: 0,
  },
  etfs: {
    page: 0,
    pageSize: 10,
    data: [],
    totalElements: 0,
  },
  loading: { stocks: false, etfs: false },
};

export const fetchStocks = createAsyncThunk<PageResponse<Company>, StocksEtfsPageInfo>(
  'stocksEtfs/fetchStocks',
  async ({ page, pageSize }, { dispatch, rejectWithValue }) => {
    try {
      const response = await stocksEtfsService.fetchStocksEtfs({
        page,
        pageSize,
        equityType: 'STOCK',
      });
      return {
        content: appendId(response.data.content),
        totalElements: response.data.totalElements,
      };
    } catch (err) {
      const { data, errorMessage } = getApiErrorResponse(err);
      dispatch(showSnackbar({ severity: 'error', message: errorMessage }));
      return rejectWithValue(data);
    }
  }
);

export const fetchEtfs = createAsyncThunk<PageResponse<Company>, StocksEtfsPageInfo>(
  'stocksEtfs/fetchEtfs',
  async ({ page, pageSize }, { dispatch, rejectWithValue }) => {
    try {
      const response = await stocksEtfsService.fetchStocksEtfs({
        page,
        pageSize,
        equityType: 'ETF',
      });
      return {
        content: appendId(response.data.content),
        totalElements: response.data.totalElements,
      };
    } catch (err) {
      const { data, errorMessage } = getApiErrorResponse(err);
      dispatch(showSnackbar({ severity: 'error', message: errorMessage }));
      return rejectWithValue(data);
    }
  }
);

export const slice = createSlice({
  name: 'stocksEtfs',
  initialState,
  reducers: {
    setStocksPageInfo: (state, action: PayloadAction<StocksEtfsPageInfo>) => {
      state.stocks.page = action.payload.page;
      state.stocks.pageSize = action.payload.pageSize;
    },
    setEtfsPageInfo: (state, action: PayloadAction<StocksEtfsPageInfo>) => {
      state.etfs.page = action.payload.page;
      state.etfs.pageSize = action.payload.pageSize;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.loading.stocks = true;
      })
      .addCase(fetchStocks.fulfilled, (state, { payload }) => {
        state.loading.stocks = false;
        state.stocks.data = payload.content;
        state.stocks.totalElements = payload.totalElements;
      })
      .addCase(fetchStocks.rejected, (state) => {
        state.loading.stocks = false;
      })
      .addCase(fetchEtfs.pending, (state) => {
        state.loading.etfs = true;
      })
      .addCase(fetchEtfs.fulfilled, (state, { payload }) => {
        state.loading.etfs = false;
        state.etfs.data = payload.content;
        state.etfs.totalElements = payload.totalElements;
      })
      .addCase(fetchEtfs.rejected, (state) => {
        state.loading.etfs = false;
      });
  },
});

export const { setStocksPageInfo, setEtfsPageInfo } = slice.actions;

export const selectStocks = (state: RootState) => state.stocksEtfs.stocks;
export const selectEtfs = (state: RootState) => state.stocksEtfs.etfs;
export const selectLoading = (state: RootState) => state.auth.loading;

export default slice.reducer;
