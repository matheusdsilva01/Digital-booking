import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-digital-booking-production.up.railway.app/api/'
});

export default api;