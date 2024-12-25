// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tasktracker-d5e2.onrender.com/api',
});

export default api;
