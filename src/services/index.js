import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-digitalbooking.herokuapp.com/api/'
});

export default api;
