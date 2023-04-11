import axios from 'axios';

// axios.defaults.withCredentials = true;
// axios.defaults.crossorigin = false;

const instance = axios.create({
    baseURL: 'https://abexperiment.onrender.com',
   // baseURL: ' http://localhost:8001',
    responseType: 'json',
    timeout: 10000,
})

export default instance;