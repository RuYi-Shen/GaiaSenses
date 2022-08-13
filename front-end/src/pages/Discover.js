import styled from "styled-components";
import Navbar from "../components/Navbar";
import ConfigBar from "../components/ConfigBar";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import Mansory from "../components/Mansory";
import { Circles } from "react-loader-spinner";

function Discover() {
  const [loading, setLoading] = useState(true);
  const URL = "https://rys-gaiasenses.herokuapp.com/post/new";
  //const URL = "http://localhost:5000/post/new";

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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userData.token]);

  return (
    <Main>
      <ConfigBar />
      {loading ? (
        <div className="noPost"><Circles color="#00bcd4" /></div>
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
