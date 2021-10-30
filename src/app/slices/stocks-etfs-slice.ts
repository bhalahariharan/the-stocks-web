import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { PageResponse } from '../../models/common';
import {
  Company,
  StockEtfDetails,
  StockEtfDetailsRequest,
  StocksEtfsPageInfo,
  ViewDurationType,
} from '../../models/stocksEtfs';
import { appendId, getApiErrorResponse } from '../../utils/helpers';
import stocksEtfsService from '../services/stocks-etfs-service';
import { showSnackbar } from './snackbar-slice';

export interface StocksEtfs {
  page: number;
  pageSize: number;
  data: Company[];
  totalElements: number;
}

interface AllDurationStockEtfDetails {
  [key: string]: StockEtfDetails;
}

export interface StocksEtfsState {
  stocks: StocksEtfs;
  etfs: StocksEtfs;
  activeViewDuration: ViewDurationType;
  prevViewDuration: ViewDurationType;
  activeStockEtfDetails: AllDurationStockEtfDetails;
  loading: { [key: string]: boolean };
}

const initialStockEtfDetails: StockEtfDetails = {
  company: { _id: '', name: '', equityType: 'STOCK', symbol: '' },
  changeInPercentage: 0,
  changeInValue: 0,
  currentPrice: 0,
  standardDeviation: null,
  data: [],
};

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
  activeViewDuration: '1M',
  prevViewDuration: '1M',
  activeStockEtfDetails: {},
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

export const fetchStockEtfDetails = createAsyncThunk<StockEtfDetails, StockEtfDetailsRequest>(
  'stocksEtfs/fetchStockEtfDetails',
  async ({ equityType, symbol, duration }, { dispatch, rejectWithValue }) => {
    try {
      const response = await stocksEtfsService.fetchStockEtfDetails({
        equityType,
        symbol,
        duration,
      });
      return response.data;
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
    setActiveViewDuration: (state, action: PayloadAction<ViewDurationType>) => {
      state.prevViewDuration = state.activeViewDuration;
      state.activeViewDuration = action.payload;
    },
    resetActiveStockEtfDetails: (state) => {
      state.prevViewDuration = '1M';
      state.activeViewDuration = '1M';
      state.activeStockEtfDetails = {};
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
      })
      .addCase(fetchStockEtfDetails.pending, (state) => {
        state.loading.stockEtfDetails = true;
      })
      .addCase(fetchStockEtfDetails.fulfilled, (state, { payload }) => {
        state.loading.stockEtfDetails = false;
        state.activeStockEtfDetails[state.activeViewDuration] = payload;
      })
      .addCase(fetchStockEtfDetails.rejected, (state) => {
        state.loading.stockEtfDetails = false;
      });
  },
});

export const {
  setStocksPageInfo,
  setEtfsPageInfo,
  setActiveViewDuration,
  resetActiveStockEtfDetails,
} = slice.actions;

export const selectStocks = (state: RootState) => state.stocksEtfs.stocks;
export const selectEtfs = (state: RootState) => state.stocksEtfs.etfs;
export const selectActiveViewDuration = (state: RootState) => state.stocksEtfs.activeViewDuration;
export const selectAllDurationStockEtfDetails = (state: RootState) =>
  state.stocksEtfs.activeStockEtfDetails;
export const selectActiveStockEtfDetails = (state: RootState) => {
  const activeStockEtfDetails = state.stocksEtfs.activeStockEtfDetails;
  const currentStockEtfDetails = activeStockEtfDetails[state.stocksEtfs.activeViewDuration];
  if (currentStockEtfDetails) return currentStockEtfDetails;

  const prevStockEtfDetails = activeStockEtfDetails[state.stocksEtfs.prevViewDuration];
  if (prevStockEtfDetails) return prevStockEtfDetails;

  return initialStockEtfDetails;
};
export const selectLoading = (state: RootState) => state.stocksEtfs.loading;

export default slice.reducer;
