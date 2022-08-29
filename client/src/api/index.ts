import axios from 'axios';

export const API_AUTH_URL = `http://localhost:4444/api`;

const $api = axios.create({
	// Чтобы автоматом отправлять cookies с запросом
	withCredentials: true,
	baseURL: API_AUTH_URL,
});

$api.interceptors.request.use((config: any) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
	return config;
});

export default $api;
