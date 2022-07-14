import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [page, setPage] = useState("home");

  useEffect(() => {
    setPage(window.location.pathname);
  }, []);

  return (
    <Nav>
      <div
        onClick={() => {
          setPage("/feed");
          navigate("/feed");
        }}
      >
        {page === "/feed" ? (
          <ion-icon name="home"></ion-icon>
        ) : (
          <ion-icon name="home-outline"></ion-icon>
        )}
      </div>
      <div
        onClick={() => {
          setPage("search");
        }}
      >
        {page === "search" ? (
          <ion-icon name="search"></ion-icon>
        ) : (
          <ion-icon name="search-outline"></ion-icon>
        )}
      </div>
      <div
        onClick={() => {
          setPage("add");
        }}
      >
        {page === "add" ? (
          <ion-icon name="add-circle"></ion-icon>
        ) : (
          <ion-icon name="add-circle-outline"></ion-icon>
        )}
      </div>
      <div
        onClick={() => {
          setPage("favorite");
        }}
      >
        {page === "favorite" ? (
          <ion-icon name="heart"></ion-icon>
        ) : (
          <ion-icon name="heart-outline"></ion-icon>
        )}
      </div>
      <div
        onClick={() => {
          setPage("/daily");
          navigate("/daily");
        }}
      >
        {page === "/daily" ? (
          <ion-icon name="person"></ion-icon>
        ) : (
          <ion-icon name="person-outline"></ion-icon>
        )}
      </div>
    </Nav>
  );
}

export default Navbar;

const Nav = styled.nav`
  background-color: var(--white-base);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 50px;

  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;

  div {
    height: 50px;
    width: 100%;
    color: var(--black-base);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    :hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.2);
    }

    ion-icon {
      font-size: 30px;
    }
  }
`;
