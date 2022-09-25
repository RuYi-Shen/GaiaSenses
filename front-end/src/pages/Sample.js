import styled from "styled-components";
import Navbar from "../components/Navbar";
import ConfigBar from "../components/ConfigBar";
import { useState } from "react";
import { Circles } from "react-loader-spinner";
import { useSearchParams, useNavigate } from "react-router-dom";

import chaos_tree from "../assets/chaos_tree.jfif";
import weather_tree from "../assets/weather_tree.jfif";
import fire from "../assets/fire2.png";
import raio from "../assets/raio.png";
import rain from "../assets/rain2d.png";

function Sample() {
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const el = searchParams.get("e");
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    chaos_tree,
    weather_tree,
    fire,
    raio,
    rain,
  ]);
  const [isShowingAlert, setShowingAlert] = useState(true);
  setTimeout(() => {
    setShowingAlert(false);
  }, 2000);

  return (
    <Main>
      <Popup display={isShowingAlert}>
        <p>Samples! Discover our models!</p>
      </Popup>
      <ConfigBar />
      {loading ? (
        <div className="noPost">
          <Circles color="#00bcd4" />
        </div>
      ) : posts.length > 0 ? (
        posts.map((post, index) => {
          return (
            <img
              src={post}
              onClick={() => {
                setFocus(true);
                navigate(`/sample?e=${index}`);
              }}
            />
          );
        })
      ) : (
        <p className="noPost"> No samples yet </p>
      )}
      {focus ? (
        <Focus
          onClick={() => {
            navigate(`/sample`);
            setFocus(false);
          }}
        >
          <img src={posts[el]} />
        </Focus>
      ) : (
        <></>
      )}
      <Navbar />
    </Main>
  );
}

export default Sample;

const Main = styled.main`
  width: 100%;
  padding: 50px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  padding: 100px 50px;

  img {
    width: 400px;
    height: 400px;
    border-radius: 20px;
    border: none;
  }

  .noPost {
    text-align: center;
    font-size: 30px;
    height: calc(100vh - 100px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Focus = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 100;

  img {
    width: 80vh;
    height: 80%;
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
