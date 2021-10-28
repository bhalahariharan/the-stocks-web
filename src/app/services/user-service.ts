import axios from '../../axios';
import { User } from '../../models/user.model';

function fetchCurrentUser() {
  return axios.get<User>('/users/current');
}

const requests = { fetchCurrentUser };

export default requests;
