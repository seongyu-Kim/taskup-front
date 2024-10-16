import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://kdt-react-node-1-team03.elicecoding.com:5000',
});

export default axios;
