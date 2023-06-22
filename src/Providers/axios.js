import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://buybestthemes.com/mobile_app_api/d9_dating/api/',
});

export default instance;
