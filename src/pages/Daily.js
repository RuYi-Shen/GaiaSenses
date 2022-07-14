import styled from "styled-components";
import Tree from "../components/Tree.js";
import { useEffect, useState } from "react";
import WeatherBar from "../components/WeatherBar.js";
import Navbar from "../components/Navbar";
import ConfigBar from "../components/ConfigBar.js";

function Daily() {
  const [weather, setWeather] = useState({});
  const [treeColor, setTreeColor] = useState("#FFFFFF");
  const [width, setWidth] = useState(window.screen.availWidth);
  const [height, setHeight] = useState(window.screen.availHeight - 100);
  const [mobile, setMobile] = useState(false);

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

  return (
    <Art>
      <ConfigBar />
      <ArtNDesc mobile={mobile}>
        <div>
          {width === height ? (
            <Tree color={treeColor} width={width} height={height} />
          ) : (
            <></>
          )}
        </div>
        <div className="description">
          <p>
            "A visual object or experience consciously created through an
            expression of skill or imagination"
          </p>
          <p>- Encyclopaedia Britannica</p>
        </div>
      </ArtNDesc>
      <div className="share">
        <ion-icon name="share-social"></ion-icon>
      </div>
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
`;

const ArtNDesc = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: ${(props) => (props.mobile ? "column" : "row")};
  .description {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    p {
      font-size: 20px;
      line-height: 30px;
      color: var(--white-base);
      margin: 0 20%;
      margin-top: 50px;
      font-weight: bold;
    }
  }
`;
