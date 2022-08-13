import styled from "styled-components";
import Navbar from "../components/Navbar";
import ConfigBar from "../components/ConfigBar";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";

function Create() {
  const URL = "https://rys-gaiasenses.herokuapp.com/post/aws";
  const [posts, setPosts] = useState([]);
  const { userData } = useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [uploadSucess, setUploadSucess] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const onInputChange = (e) => {
    setIsSelected(true);
    setSelectedFile(e.target.files[0]);
  };

  function uploadImage() {
    setShowSpinner(true);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile, selectedFile.name);
      console.log(formData, selectedFile, selectedFile.name);
  

      axios
      .post(URL, formData, {
        headers: {
          "Content-Type": "form-data",
          Authorization: `Bearer ${userData.token}`,
        },
      })
        .then((res) => {
          setUploadSucess(true);
          setShowSpinner(false);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsSelected(false);
        });
    }
  }

  /*   useEffect(() => {
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
  }, []); */

  return posts ? (
    <Main>
      <ConfigBar />
      <input type="file" id="file" onChange={onInputChange} />
      <button type="submit" disabled={!isSelected} onClick={uploadImage}>
        Upload
      </button>
      <Navbar />
    </Main>
  ) : (
    <> </>
  );
}

export default Create;

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
