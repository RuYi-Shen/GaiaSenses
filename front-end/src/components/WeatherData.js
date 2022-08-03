import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

function WeatherData({ weather }) {
  const ICONURL = "http://openweathermap.org/img/wn/";
  const KELVINCELSIUS = 273.15;

  return (
    <Weather>
      <img src={`${ICONURL}${weather.weather[0].icon}@4x.png`}></img>
      <p>{weather.weather[0].description.toUpperCase()}</p>
      <p>{weather.name}</p>
      <div className="info">
        <p>
          <ion-icon name="thermometer-outline"></ion-icon> Temperature:
        </p>
        <p>{(weather.main.temp - KELVINCELSIUS).toFixed(2)} ºC</p>
      </div>
      <div className="info">
        <p>
          <ion-icon name="contract-outline"></ion-icon> Pressure:
        </p>
        <p>{weather.main.pressure} hPa</p>
      </div>
      <div className="info">
        <p>
          <ion-icon name="water-outline"></ion-icon> Humidity:
        </p>
        <p>{weather.main.humidity} %</p>
      </div>
    </Weather>
  );
}

export default WeatherData;

const Weather = styled.div`
  color: var(--black-base);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  height: 40vh;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  p{
    margin: 10px;
  }
`;
