import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use(config => {
  const token = localStorage.getItem('jwtToken');
  if(token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export const fetchProfile = () => API.get('/auth/profile');

export const register = data => API.post('/auth/register', data);
export const login = data => API.post('/auth/login', data);
export const getTasks = (params) => API.get('/tasks', { params });
export const createTask = (data) => API.post('/tasks', data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
