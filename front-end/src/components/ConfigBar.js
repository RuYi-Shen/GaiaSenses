import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import WeatherData from "./WeatherData";
import ShareOptions from "./ShareOptions.js";
import { useAuth } from "../contexts/UserContext";

function ConfigBar() {
  const { userData, authActions, weather, setWeather } = useAuth()
  const navigate = useNavigate();

  const [openConfig, setOpenConfig] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const APIKEY = "10428b1c951b8f8f17e6acde5957b88f";
  const APIURL = "https://api.openweathermap.org/data/2.5/weather?";

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
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (longitude !== 0 && latitude !== 0) getLocationWeather(); // eslint-disable-next-line
  }, [latitude, longitude]);

  return (
    <>
      <Nav>
        <div
          onClick={() => {
            setOpenConfig(!openConfig);
          }}
        >
          {openConfig ? (
            <ion-icon name="options"></ion-icon>
          ) : (
            <ion-icon name="options-outline"></ion-icon>
          )}
        </div>
        <h1>GaiaSenses</h1>
        <div
          onClick={() => {
            setOpenShare(!openShare);
          }}
        >
          {openShare ? (
            <ion-icon name="share-social"></ion-icon>
          ) : (
            <ion-icon name="share-social-outline"></ion-icon>
          )}
        </div>
      </Nav>
      <Config open={openConfig}>
        <div>
          Welcome back, <span>{userData.name}</span> \(ᵔᵕᵔ)/
        </div>
        {weather.weather ? (
          <WeatherData weather={weather} />
        ) : (
          <div>
            <h1>Loading...</h1>
          </div>
        )}
        <div
          className="refresh"
          onClick={() => {
            setWeather({});
            setLatitude(0);
            setLongitude(0);
            getUserLocation();
          }}
        >
          <ion-icon name="refresh"></ion-icon>
        </div>

        <div
          className="logout"
          onClick={() => {
            authActions.signOut();
            navigate("/");
          }}
        >
          <ion-icon name="log-out-outline"></ion-icon>
        </div>
      </Config>
      <ShareOptions open={openShare} />
    </>
  );
}

export default ConfigBar;

const Nav = styled.nav`
  background-color: var(--white-base);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 50px;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  h1 {
    font-weight: bold;
  }

  div {
    height: 50px;
    width: 100px;
    color: var(--black-base);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    :hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.2);
    }

    ion-icon {
      font-size: 30px;
    }
  }
`;

const Config = styled.div`
  position: fixed;
  top: 0;
  left: ${(props) => (props.open ? "0" : "-350px")};
  width: 100vw;
  max-width: 350px;
  height: 100vh;
  background-color: var(--white-base);
  transition: left 1s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 100px 0;
  z-index: 5;

  span {
    font-weight: bold;
  }

  .refresh {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    ion-icon {
      font-size: 30px;
    }
    :hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  .logout {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    ion-icon {
      font-size: 30px;
    }
    :hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;
