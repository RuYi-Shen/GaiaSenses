import axios from 'axios';

const client = axios.create({
    baseURL: "https://gaiasenses-production.up.railway.app"
});

export default client;
