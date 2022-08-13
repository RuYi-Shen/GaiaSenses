import styled from "styled-components";
import Tree from "../components/Tree.js";
import { useEffect, useState, useContext, useCallback } from "react";
import WeatherBar from "../components/WeatherBar.js";
import Navbar from "../components/Navbar";
import ConfigBar from "../components/ConfigBar.js";
import ChaosTree from "../components/ChaosTree.js";
import axios from "axios";
import UserContext from "../contexts/UserContext";

function Daily() {
  const [weather, setWeather] = useState({});
  const [treeColor, setTreeColor] = useState("#FFFFFF");
  const [width, setWidth] = useState(window.screen.availWidth);
  const [height, setHeight] = useState(window.screen.availHeight - 100);
  const [mobile, setMobile] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [composeUrl, setComposeUrl] = useState("");
  const { userData } = useContext(UserContext);
  const [contentText, setContentText] = useState("");
  const URL = "https://rys-gaiasenses.herokuapp.com/post/";

  useEffect(() => {
    if (localStorage.getItem("weather")) {
      setWeather(JSON.parse(localStorage.getItem("weather")));
    }
    if (width > height) {
      setWidth(height);
    } else {
      setHeight(width);
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    if (weather.weather) {
      setTreeColor(weatherColor[weather.weather[0].description]);
    }
  }, [weather]);

  const Test = useCallback(() => {
    return (
      <ChaosTree
        width={width}
        height={height}
        imageUrl={imageUrl || "chaostree.jpg"}
      />
    );
  }, [width, height, imageUrl]);

  const weatherColor = {
    "clear sky": "#FF0000",
    "few clouds": "#FF7F00",
    "scattered clouds": "#FFFF00",
    "broken clouds": "#00FF00",
    "shower rain": "#0000FF",
    "light rain": "#4B0082",
    thunderstorm: "#9400D3",
    snow: "#FFFFFF",
    mist: "#B3AFAF",
  };

  function saveCanvas() {
    const canvas = document.getElementById("defaultCanvas0");
    setComposeUrl(canvas.toDataURL("image/jpeg", 0));
  }

  useEffect(() => {
    if (composeUrl) {
      axios
        .post(
          URL,
          { url: composeUrl, content: contentText || " " },
          {
            headers: {
              Authorization: "Bearer " + userData.token,
            },
          }
        )
        .then((res) => {
          window.alert("Image successfully saved");
          setInputUrl("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [composeUrl]);

  function handleSubmit(e) {
    e.preventDefault();
    setImageUrl(inputUrl);
  }

  return (
    <Art back={composeUrl ? composeUrl : "pink"}>
      <ConfigBar />
      <ArtNDesc mobile={mobile}>
        <div>
          {width === height ? (
            //<Tree color={treeColor} width={width} height={height} />
            <Test />
          ) : (
            <></>
          )}
        </div>
        <Description>
          <form onSubmit={handleSubmit}>
            <input
              type="url"
              id="imageUrl"
              placeholder="Image Url"
              required
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
            />
            <input type="submit"></input>
          </form>
          <Form>
            <textarea
              placeholder="What is in your mind?"
              maxLength="150"
              required
              value={contentText}
              onChange={(e) => {
                setContentText(e.target.value);
              }}
            ></textarea>
            <button onClick={saveCanvas}>Save</button>
          </Form>
        </Description>
      </ArtNDesc>
      <WeatherBar color={setTreeColor} />
      <Navbar />
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
  padding: 50px 0;

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
    position: absolute;
    top: 0;
    left: 0;
    margin: 10px;
    color: var(--white-base);
    font-size: 30px;
    cursor: pointer;
    :hover {
      background-color: rgba(255, 255, 255, 0.9);
    }
  }

  /*   button {
    position: fixed;
    top: 50;
    right: 0;
    width: 400px;
    height: 400px;
    background-image: url(${(props) => props.back});
    background-size: cover;
  } */
`;

const ArtNDesc = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: red;
  flex-direction: ${(props) => (props.mobile ? "column" : "row")};
`;

const Form = styled.form`
  textarea {
    resize: none;
    width: 100%;
    height: 100%;
  }
`;

const Description = styled.div`
  position: fixed;
  top: 50px;
  right: 0;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 10px;
`;
