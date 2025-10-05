import axios from 'axios';
import configData from './config.json';

const apiClient = axios.create({
  baseURL: configData.apiUrl, // Your base URL
  headers: {
    'Content-type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // Success callback: Modify the request configuration
    const token = localStorage.getItem('accessToken'); // Retrieve the token from storage (e.g., localStorage)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add the bearer token to the Authorization header
    }
    return config; // Return the modified configuration
  },
  (error) => {
    // Error callback: Handle any errors during interception
    return Promise.reject(error);
  }
);

const AxiosKey = Symbol('http');

export { apiClient, AxiosKey };
