import { weatherClient } from "./lib/client";

const weatherService = {
  getRainfall: (lat, lon) => weatherClient.get("/rainfall", { params: { lat, lon } }),
  getFireSpots: (lat, lon) => weatherClient.get("/fire", { params: { lat, lon } }),
  getLightningFlashes: (lat, lon) => weatherClient.get("/lightning", { params: { lat, lon } }),
}

export default weatherService;
