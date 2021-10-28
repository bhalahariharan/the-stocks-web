import { AxiosError } from 'axios';

export function getApiErrorResponse(err: any) {
  const error = err as AxiosError;
  const data = error.response?.data || {};
  const errorMessage = data.message || 'An error occurred. Please try again';

  return { error, data, errorMessage };
}
