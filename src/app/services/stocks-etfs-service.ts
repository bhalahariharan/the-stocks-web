import axios from '../../axios';
import { PageResponse } from '../../models/common';
import {
  Company,
  StockEtfDetails,
  StockEtfDetailsRequest,
  StocksEtfsRequest,
} from '../../models/stocksEtfs';

function fetchStocksEtfs({ page, pageSize, equityType }: StocksEtfsRequest) {
  return axios.get<PageResponse<Company>>(`/${equityType.toLowerCase()}s`, {
    params: { page, pageSize },
  });
}

function fetchStockEtfDetails({ equityType, symbol, duration }: StockEtfDetailsRequest) {
  return axios.get<StockEtfDetails>(`/${equityType.toLowerCase()}s/${symbol}`, {
    params: { duration },
  });
}

const requests = { fetchStocksEtfs, fetchStockEtfDetails };

export default requests;
