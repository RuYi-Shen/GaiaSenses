import { useState, useEffect } from "react";
import axios from "axios";

const APIURL = "https://api.openweathermap.org/data/2.5/weather?";
const APIKEY = "10428b1c951b8f8f17e6acde5957b88f";

function getLocalWeather() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        axios.get(`${APIURL}lat=${lat}&lon=${lon}&appid=${APIKEY}`)
          .then((response) => resolve(response.data))
          .catch((err) => reject(err));
      }, (err) => reject(err));
    }
    else {
      reject('Geolocation API not supported');
    }
  });
}

const cache = {};

export default function useWeather() {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    if (cache['weather']) {
      setWeather(cache['weather']);
    }
    else {
      getLocalWeather()
        .then((res) => {
          cache['weather'] = res;
          setWeather(res);
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
