import axios from 'axios';

const appClient = axios.create({
  baseURL: "https://gaiasenses-production.up.railway.app"
});

const weatherClient = axios.create({
  baseURL: "https://satellite-fetcher.up.railway.app"
})

export { appClient, weatherClient };
