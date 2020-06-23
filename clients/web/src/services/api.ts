import * as Axios from 'axios';

const baseURL =
  process.env.REACT_APP_API_URL || 'https://gobarber.com.br/api/v1';

const api = Axios.default.create({ baseURL });

export default api;
