export type EquityType = 'STOCK' | 'ETF';
export type ViewDurationType = '1D' | '1M' | '1Y' | '3Y' | '5Y';

export interface Company {
  _id: string;
  name: string;
  symbol: string;
  equityType: EquityType;
}

export interface StocksEtfsPageInfo {
  page: number;
  pageSize: number;
}

export interface StocksEtfsRequest {
  page: number;
  pageSize: number;
  equityType: EquityType;
}

export interface StockEtfDetailsRequest {
  equityType: EquityType;
  symbol: string;
  duration: ViewDurationType;
}

export interface StockEtfDetails {
  company: Company;
  currentPrice: number | null;
  changeInValue: number;
  changeInPercentage: number;
  standardDeviation: number | null;
  data: [string, number][];
}
