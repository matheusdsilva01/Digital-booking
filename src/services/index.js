import axios from 'axios';

const api = axios.create({
    baseURL: 'http://ec2-3-223-123-204.compute-1.amazonaws.com:8080/api/'
});

export default api;