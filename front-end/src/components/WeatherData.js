import styled from "styled-components";

function WeatherData({ weather }) {
  const ICONURL = "http://openweathermap.org/img/wn/";

  return (
    <Weather>
      <img
        src={`${ICONURL}${weather.weather[0].icon}@4x.png`}
        alt="weather-icon"
      ></img>
      <p>{weather.weather[0].description.toUpperCase()}</p>
      <p>{weather.name}</p>
      <div className="info">
        <p>
          <ion-icon name="thermometer-outline"></ion-icon> Temperature:
        </p>
        <p>{weather.main.temp.toFixed(2)} ºC</p>
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
  align-items: center;

  img {
    height: 20vh;
    width: 20vh;
    margin: -15px;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  p {
    margin: 10px;
  }
`;
