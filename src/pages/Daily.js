import styled from "styled-components";
import Tree from "../components/Tree.js";
import { useEffect, useState } from "react";
import axios from "axios";
import WeatherBar from "../components/WeatherBar.js";

function Daily() {
  const APIKEY = "10428b1c951b8f8f17e6acde5957b88f";
  const APIURL = "https://api.openweathermap.org/data/2.5/weather?";
  const LOCATIONURL = "http://api.openweathermap.org/geo/1.0/direct?";
  const ICONURL = "http://openweathermap.org/img/wn/";
  const KELVINCELSIUS = 273.15;

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState({});
  const [treeColor, setTreeColor] = useState("#FFFFFF");

  const weatherColor = {
    "clear sky": "#0000FF",
    "few clouds": "#A9A9A9",
    "scattered clouds": "#FFFFFF",
    "broken clouds": "#545454",
    "shower rain": "#BFE6FF",
    rain: "#009DFF",
    thunderstorm: "#663A82",
    snow: "#E0FFFF",
    mist: "#B3AFAF",
  };

  let searchLocation;

  let searchLocationData = [];

  function getUserLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }

  function getLocationWeather() {
    axios
      .get(`${APIURL}lat=${latitude}&lon=${longitude}&appid=${APIKEY}`)
      .then((response) => {
        setWeather(response.data);
        setTreeColor(weatherColor[response.data.weather[0].description]);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }

  function getLocationPosition(callback) {
    searchLocation = document.querySelector("header input").value;
    if (searchLocation != "") {
      axios
        .get(`${LOCATIONURL}q=${searchLocation}&limit=1&appid=${APIKEY}`)
        .then((response) => {
          searchLocationData = response.data;
          latitude = searchLocationData[0].lat;
          longitude = searchLocationData[0].lon;
          callback();
        })
        .catch((err) => console.log(err));
    } else {
      alert("Insira um local válido");
    }
  }

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (longitude != 0 && latitude != 0) getLocationWeather();
  }, [latitude, longitude]);

  return (
    <Art>
      <h2>Your Daily Art</h2>
      <Tree color={treeColor} />
      <div className="share">
        <ion-icon name="share-social"></ion-icon>
      </div>
      <Weather>
        {weather.weather ? (
          <>
            <img src={`${ICONURL}${weather.weather[0].icon}@4x.png`}></img>
            <p>{weather.weather[0].description.toUpperCase()}</p>
            <p>{weather.name}</p>
            <div className="info">
              <p>Temperature:</p>
              <p>{(weather.main.temp - KELVINCELSIUS).toFixed(2)} ºC</p>
            </div>
            <div className="info">
              <p>Pressure:</p>
              <p>{weather.main.pressure} hPa</p>
            </div>
            <div className="info">
              <p>Humidity:</p>
              <p>{weather.main.humidity} %</p>
            </div>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </Weather>
      <WeatherBar color={setTreeColor} />
    </Art>
  );
}

export default Daily;

const Art = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;

  h2 {
    position: absolute;
    top: 3%;
    left: 0;
    width: 100vw;
    text-align: center;
    color: var(--green-olive);
    font-size: 30px;
  }

  .share {
    :hover {
      background-color: rgba(255, 255, 255, 0.9);
    }
  }
  ion-icon {
    position: absolute;
    top: 0;
    left: 0;
    margin: 10px;
    color: var(--white-base);
    font-size: 30px;
    cursor: pointer;
  }
`;

const Weather = styled.div`
  position: absolute;
  top: 0;
  right: 2%;
  color: var(--white-base);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  div{
    display: flex;
    justify-content: space-between;
    margin: 5px;
  }
`;
