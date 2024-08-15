import axios from 'axios';
import { ACCESS_TOKEN } from './constants.js';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});


api.interceptors.request.use(  // modify  requuest before sending ,adding authoriazation token if token exist
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default api