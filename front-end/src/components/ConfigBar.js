import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import WeatherData from "./WeatherData";
import ShareOptions from "./ShareOptions.js";
import useAuth from "../hooks/auth";
import useWeather from "../hooks/weather";

function ConfigBar() {
  const { userData, authActions } = useAuth()
  const navigate = useNavigate();

  const { weather, refreshWeather } = useWeather();

  const [openConfig, setOpenConfig] = useState(false);
  const [openShare, setOpenShare] = useState(false);

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
          onClick={() => refreshWeather()}
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
