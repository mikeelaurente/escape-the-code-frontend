import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Your base URL
  headers: {
    'Content-type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('accessToken') ?? '',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // Success callback: Modify the request configuration
    const token = localStorage.getItem('token'); // Retrieve the token from storage (e.g., localStorage)
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
