import axios from '../../axios';

function login(pin: string) {
  return axios.post<{ accessToken: string }>('/auth/login', { pin });
}

const requests = { login };

export default requests;
