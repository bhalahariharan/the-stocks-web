export type EquityType = 'STOCK' | 'ETF';

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
