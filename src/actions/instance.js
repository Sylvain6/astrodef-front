import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://astro-def-api.herokuapp.com',
    timeout: 100000,
})

export default instance;