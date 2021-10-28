import axios, { AxiosError } from 'axios';

import localStorage from './utils/local-storage';

const API_URL = process.env.REACT_APP_API_URL || '';

const instance = axios.create({ baseURL: API_URL });
instance.interceptors.request.use(
  function (config) {
    const paths = ['/auth/login'];
    if (!paths.find((path) => config.url?.includes(path))) {
      const accessToken = localStorage.getAccessToken();
      if (config.headers) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/authwall';
    }
    return Promise.reject(error);
  }
);

export default instance;
