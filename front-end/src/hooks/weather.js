import { useState, useEffect } from "react";
import weatherService from "../services/weather";

const cache = {};

function getPosition() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        resolve({ lat, lon });
      }, (err) => reject(err));
    }
    else {
      reject('Geolocation API not supported');
    }
  })
}

function useLightning() {
  const [lightning, setLightning] = useState({});

  useEffect(() => {
    if (cache['lightning']) {
      setLightning(cache['lightning']);
    }
    else {
      getPosition()
        .then(({ lat, lon}) => weatherService.getLightningFlashes(lat, lon))
        .then((res) => {
          cache['lightning'] = res.data;
          setLightning(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [lightning]);

  const refreshLightning = () => {
    cache['lightning'] = null;
    setLightning({});
  }

  return { lightning, refreshLightning };
}

function useWeather() {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    if (cache['weather']) {
      setWeather(cache['weather']);
    }
    else {
      getPosition()
        .then(({ lat, lon }) => weatherService.getRainfall(lat, lon))
        .then((res) => {
          cache['weather'] = res.data;
          setWeather(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [weather]);

  const refreshWeather = () => {
    cache['weather'] = null;
    setWeather({});
  }

  return { weather, refreshWeather };
}

export { useWeather, useLightning };
