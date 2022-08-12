import styled from "styled-components";
import Navbar from "../components/Navbar";
import ConfigBar from "../components/ConfigBar";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";

function Discover() {
  const URL = "https://rys-gaiasenses.herokuapp.com/post/new";
  const [posts, setPosts] = useState([]);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(URL, {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return posts ? (
    <Main>
      <ConfigBar />
      {posts.map((post, index) => {
        return <img src={post.url} key={index} alt=""></img>;
      })}
      <Navbar />
    </Main>
  ) : (
    <> </>
  );
}

export default Discover;

const Main = styled.main`
  width: 100%;
  padding: 50px 0;
  line-height: 0;
  -webkit-column-count: 5;
  -webkit-column-gap: 0px;
  -moz-column-count: 5;
  -moz-column-gap: 0px;
  column-count: 5;
  column-gap: 0px;
  img {
    width: 100% !important;
    height: auto !important;
  }
  @media (max-width: 1200px) {
    #photos {
      -moz-column-count: 4;
      -webkit-column-count: 4;
      column-count: 4;
    }
  }

  @media (max-width: 1000px) {
    -moz-column-count: 3;
    -webkit-column-count: 3;
    column-count: 3;
  }

  @media (max-width: 800px) {
    -moz-column-count: 2;
    -webkit-column-count: 2;
    column-count: 2;
  }

  @media (max-width: 400px) {
    -moz-column-count: 1;
    -webkit-column-count: 1;
    column-count: 1;
  }
`;
