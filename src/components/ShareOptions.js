import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";

function ShareOptions({open}) {

  return (
    <Nav open={open}>
      <div>
      <ion-icon name="logo-instagram"></ion-icon>
      </div>
      <div>
      <ion-icon name="logo-whatsapp"></ion-icon>
      </div>
      <div>
      <ion-icon name="logo-twitter"></ion-icon>
      </div>
      <div>
      <ion-icon name="mail-outline"></ion-icon>
      </div>
    </Nav>
  );
}

export default ShareOptions;

const Nav = styled.nav`
  background-color: var(--white-base);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 50px;

  position: fixed;
  top: ${(props) => (props.open ? "50px" : "-150px")};
  right: 0;
  transition: top 1s;
  z-index: 9;

  div {
    width: 50px;
    height: 50px;
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
