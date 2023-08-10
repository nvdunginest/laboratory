import axios from 'axios';
import history from './history';

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response.status === 403) {
      history.push('/forbidden');
    }

    return Promise.reject(error);
  },
);
