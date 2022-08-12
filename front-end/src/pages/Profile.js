import styled from "styled-components";
import Navbar from "../components/Navbar";
import ConfigBar from "../components/ConfigBar";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import Mansory from "../components/Mansory";

function Profile() {
  //const URL = "https://rys-gaiasenses.herokuapp.com/post/user";
  const URL = "http://localhost:5000/post/user";

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

  return (
    <Main>
      <ConfigBar />
      {posts.length > 0 ? <Mansory posts={posts} /> : <> No posts yet </>}
      <Navbar />
    </Main>
  );
}

export default Profile;

const Main = styled.main`
  width: 100%;
  padding: 50px 0;
`;
