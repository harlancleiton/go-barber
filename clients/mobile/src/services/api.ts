import axios from 'axios';

import { Constants } from '../config';

const api = axios.create({ baseURL: Constants.apiUrl });

export default api;
