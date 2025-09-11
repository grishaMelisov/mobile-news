import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: '/api/',
  params: {
    'api-key': import.meta.env.VITE_API_KEY,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message =
        error.response.data?.message || `Request failed with status ${status}`;

      return Promise.reject(new Error(message));
    }

    if (error.request) {
      return Promise.reject(new Error('No response from server'));
    }

    return Promise.reject(new Error(error.message || 'Unexpected error'));
  }
);
