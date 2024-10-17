// src/api/axiosInstance.ts
import Axios, { AxiosInstance } from 'axios';

const axios: AxiosInstance = Axios.create({
  baseURL: 'http://kdt-react-node-1-team03.elicecoding.com:5000',
});

export default axios;
