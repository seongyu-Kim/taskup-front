import axios, { AxiosError } from 'axios';

const apiMainPage = axios.create({
  baseURL: 'http://kdt-react-node-1-team03.elicecoding.com:5000',
  withCredentials: true,
});

apiMainPage.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.log('interceptor', error);
    Promise.reject(error).then();
  },
);

export default apiMainPage;
