import { AxiosError } from 'axios';

export function getApiErrorResponse(err: any) {
  const error = err as AxiosError;
  const data = error.response?.data || {};
  const errorMessage = data.message || 'An error occurred. Please try again';

  return { error, data, errorMessage };
}

export function appendId(data: any[], key = '_id') {
  return data.map((d) => {
    d.id = d[key];
    return d;
  });
}

export function formatDate(isoString: string) {
  const d = new Date(isoString);
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
  const date = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

  return `${date} ${month} ${year}`;
}

export function isNegative(num: number) {
  return num < 0;
}

export function logout() {
  localStorage.clear();
  window.location.href = '/authwall';
}
