import { ViewDurationType } from '../models/stocksEtfs';

export const PIN_LENGTH = 4;

export const REGEX = {
  NUMBERS: /^\d+$/,
};

export const STOCK_ETF_VIEW_DURATIONS: ViewDurationType[] = ['1D', '1M', '1Y', '3Y', '5Y'];
