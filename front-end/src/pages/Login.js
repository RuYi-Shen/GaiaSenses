import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

import styled from "styled-components";
import Form from "../components/Form";
import axios from "axios";

import logo from "../assets/gs_logo.png";

export default function Login() {
  const URL = "https://rys-gaiasenses.herokuapp.com/auth/signin";

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [disabled, setDisabled] = useState(false);
  const { setUserData } = useContext(UserContext);

  const APIKEY = "10428b1c951b8f8f17e6acde5957b88f";
  const APIURL = "https://api.openweathermap.org/data/2.5/weather?";

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState({});

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
        localStorage.setItem("weather", JSON.stringify(response.data));
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (longitude !== 0 && latitude !== 0) getLocationWeather();
  }, [latitude, longitude]);

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      setUserData(JSON.parse(localStorage.getItem("userData")));
      setDisabled(true);
      getUserLocation();
    }
    if (Object.keys(userInfo).length !== 0) {
      setDisabled(true);
      axios
        .post(URL, userInfo)
        .then((response) => {
          localStorage.setItem("userData", JSON.stringify(response.data));
          setUserData(response.data);
          getUserLocation();
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.data);
          setDisabled(false);
        });
    }
  }, [userInfo]);

  useEffect(() => {
    if (weather.weather && localStorage.getItem("weather")) {
      navigate("/feed");
    }
  }, [weather]);

  return (
    <Main>
      <section>
        <img src={logo} alt="logo" />
        <h1>
          <span>Gaia</span>Senses
        </h1>
        <Form type="login" setUserInfo={setUserInfo} disabled={disabled} />
        <Link to="/register">
          First time? <u>Sign up!</u>
        </Link>
      </section>
    </Main>
  );
}

/**************************** css ****************************/

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 48px 5%;
  background-color: var(--purple-base);
  background-image: url(https://i.etsystatic.com/6775168/r/il/da87db/1873927321/il_fullxfull.1873927321_qf5p.jpg);
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */

  img {
    width: 50%;
    height: auto;
    margin-bottom: 5vh;
  }

  section {
    width: 100%;
    max-width: 530px;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    background-color: var(--white-base);
    border-radius: 18px;
    box-shadow: 5px 5px 10px rgba(0, 0, 10, 0.4);

    h1 {
      //font-family: 'Saira Stencil One';
      font-weight: 700;
      font-size: 32px;
      margin-top: 10px;

      color: var(--blue-base);
      span {
        color: var(--blue-button);
      }
    }

    form {
      max-width: 430px;
      margin: 32px 24px;
    }

    a {
      font-weight: 700;
      font-size: 15px;

      color: var(--blue-base);
    }
  }
`;
