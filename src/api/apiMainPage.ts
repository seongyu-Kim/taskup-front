import axios from 'axios';

const apiMainPage = axios.create({
  baseURL: 'http://kdt-react-node-1-team03.elicecoding.com:5000',
});

export default apiMainPage;
