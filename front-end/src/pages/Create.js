import { useEffect, useState, useContext, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import Tree from "../components/Tree.js";
import Navbar from "../components/Navbar";
import UserContext from "../contexts/UserContext";
import ChaosTree from "../components/ChaosTree.js";
import ConfigBar from "../components/ConfigBar.js";
import WeatherBar from "../components/WeatherBar.js";

function Create() {
  const URL = "https://gaiasenses-production.up.railway.app/post/";
  const { userData } = useContext(UserContext);
  const [weather, setWeather] = useState({});
  const [treeColor, setTreeColor] = useState("#FFFFFF");
  const [width, setWidth] = useState(window.screen.availWidth);
  const [height, setHeight] = useState(window.screen.availHeight - 150);
  const [mobile, setMobile] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [composeUrl, setComposeUrl] = useState("");
  const [contentText, setContentText] = useState("");
  const [artType, setArtType] = useState("chaos");
  const [isShowingAlert, setShowingAlert] = useState(true);

  setTimeout(() => {
    setShowingAlert(false);
  }, 2000);

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

  const Compose = useCallback(() => {
    if (artType === "chaos") {
      return (
        <ChaosTree
          width={width}
          height={height}
          imageUrl={imageUrl || "chaostree.jpg"}
        />
      );
    } else {
      return (
        <>
          <Tree color={treeColor || "#FFFFFF"} width={width} height={height} />;
          <WeatherBar color={setTreeColor} />
        </>
      );
    }
  }, [artType, treeColor, width, height, imageUrl]);

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
          setContentText("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [composeUrl]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function handleSave(e) {
    e.preventDefault();
    saveCanvas();
  }

  return (
    <Art back={composeUrl ? composeUrl : "pink"}>
      <Popup display={isShowingAlert}>
        <p>Create! Show us what's in your mind!</p>
      </Popup>
      <ConfigBar />
      <ArtNDesc mobile={mobile}>
        <div>{width === height ? <Compose /> : <></>}</div>
        <Description>
          <p>Select the art type:</p>
          <select value={artType} onChange={(e) => setArtType(e.target.value)}>
            <option value="chaos">Chaos</option>
            <option value="weather-tree">Weather-Tree</option>
          </select>
          { artType === "chaos" &&
            <>
              <p>Upload an image file or use the default:</p>
              <input
                type="file"
                id="imageUrl"
                required
                accept="image/*"
                onChange={handleImageChange}
              />
            </>
          }
          <p>Insert your art description:</p>
          <Form onSubmit={handleSave}>
            <textarea
              placeholder="What is in your mind?"
              maxLength="150"
              rows="4"
              required
              value={contentText}
              onChange={(e) => {
                setContentText(e.target.value);
              }}
            ></textarea>
            <button type="submit">Save</button>
          </Form>
        </Description>
      </ArtNDesc>
      <Navbar />
    </Art>
  );
}

export default Create;

const Art = styled.div`
  position: relative;
  width: 100vw;
  display: flex;
  justify-content: center;
  padding: 50px 0;
`;

const ArtNDesc = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
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
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 70px;

  p {
    margin: 10px 0;
  }
  form {
    width: 100%;
    input {
      width: 100%;
    }

    button {
      margin: 10px;
    }
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 100px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.display ? 1 : 0)};
  transition: all 250ms linear 2s;
  z-index: 20;

  p {
    background-color: rgba(255, 255, 255, 0.5);
    font-size: calc(1vw + 10px);
    text-align: center;
    max-width: 50%;
    padding: 1vw;
    border-radius: 1vw;
  }
`;
