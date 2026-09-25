import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://cafeteria-backend-5k2g.onrender.com';

export const api = axios.create({
  baseURL: API_URL
});