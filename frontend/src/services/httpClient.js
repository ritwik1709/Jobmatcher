import axios from 'axios';

const DEFAULT_BASE_URL = 'http://localhost:3000';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || DEFAULT_BASE_URL,
  timeout: 30000,
});

export default httpClient;
