import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/auth";
import styled from "styled-components";
import Form from "../components/Form";

import logo from "../assets/gs_logo.png";
import useWeather from "../hooks/weather";

export default function Login() {
  const { userData, authActions } = useAuth();
  const { weather } = useWeather();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/feed";

  const [userInfo, setUserInfo] = useState({});
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (authActions.hasLocalCredentials()) {
      setDisabled(true);
      authActions.restore();
    }
  }, []);

  useEffect(() => {
    if (Object.keys(userInfo).length !== 0) {
      setDisabled(true);
      authActions.signIn(userInfo)
        .catch((err) => {
          console.error(err);
          alert(err.response.data);
          setDisabled(false);
        });
    }
  }, [authActions, userInfo]);

  useEffect(() => {
    if (weather.weather && userData.name) {
      navigate(from);
    }
  }, [weather, userData, navigate, from]);

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

  @media (max-height: 700px) {
    img {
      height: 20vh;
      width: auto;
    }
    section > h1 {
      font-size: 4vh !important;
      margin-top: 0 !important;
      margin-bottom: -20px;
    }
    a {
      font-size: 2.2vh !important;
      margin-top: -20px;
    }
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
