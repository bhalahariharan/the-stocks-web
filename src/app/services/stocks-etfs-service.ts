import axios from '../../axios';
import { PageResponse } from '../../models/common';
import { Company, StocksEtfsRequest } from '../../models/stocksEtfs';

function fetchStocksEtfs({ page, pageSize, equityType }: StocksEtfsRequest) {
  return axios.get<PageResponse<Company>>(`/${equityType.toLowerCase()}s`, {
    params: { page, pageSize },
  });
}

const requests = { fetchStocksEtfs };

export default requests;
