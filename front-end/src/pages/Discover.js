import { useState, useEffect } from "react";
import { Circles } from "react-loader-spinner";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Mansory from "../components/Mansory";
import ConfigBar from "../components/ConfigBar";
import postService from "../services/post";

function Discover() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isShowingAlert, setShowingAlert] = useState(true);

  setTimeout(() => {
    setShowingAlert(false);
  }, 2000);

  useEffect(() => {
    postService.getRecent()
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Main>
      <Popup display={isShowingAlert}>
        <p>Discover! Find out our newest posts!</p>
      </Popup>
      <ConfigBar />
      {loading ? (
        <div className="noPost">
          <Circles color="#00bcd4" />
        </div>
      ) : posts.length > 0 ? (
        <Mansory posts={posts} />
      ) : (
        <p className="noPost"> No posts yet </p>
      )}
      <Navbar />
    </Main>
  );
}

export default Discover;

const Main = styled.main`
  width: 100%;
  padding: 50px 0;

  .noPost {
    text-align: center;
    font-size: 30px;
    height: calc(100vh - 100px);
    display: flex;
    justify-content: center;
    align-items: center;
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
