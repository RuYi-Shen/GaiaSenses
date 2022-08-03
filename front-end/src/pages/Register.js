import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";
import Form from "../components/Form";
import axios from "axios";

import logo from "../assets/gs_logo.png";

export default function Register() {
  const URL = "https://projeto14-driveneletro.herokuapp.com/signup";

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    localStorage.clear();
    if (Object.keys(userInfo).length !== 0) {
      setDisabled(true);
      /* axios.post(URL, userInfo)
                .then((response) => {
                    alert(response.data);
                    navigate("/");
                })
                .catch(error => {
                    console.log(error);
                    alert(error.response.data);
                    setDisabled(false);
                }); */
      localStorage.setItem("userData", JSON.stringify({ name: userInfo.name }));
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [userInfo, navigate]);

  return (
    <Main>
      <section>
        <img src={logo} alt="logo" />
        <h1>
          <span>Gaia</span>Senses
        </h1>
        <Form type="register" setUserInfo={setUserInfo} disabled={disabled} />
        <Link to="/">
          Already registered? <u>Enter now!</u>
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
      height: 17vh;
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
