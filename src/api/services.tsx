// src/api/api.ts
import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const API_URL = 'https://ennovbe-production.up.railway.app';

const api = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    'Content-Type': 'application/json',
    'mode':'no-cors'
  },
});

// For token-based authenticated requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
