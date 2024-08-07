import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://testseries-bakend.onrender.com/api/v1', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can also add interceptors if needed
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
