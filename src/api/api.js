import axios from 'axios';

const api = {};

api.get = function (url, params) {
  console.log(`发起请求: ${url}`);
  return axios.get(url, params);
};

export default api;