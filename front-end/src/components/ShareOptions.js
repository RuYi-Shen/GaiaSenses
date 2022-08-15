import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";

function ShareOptions({ open }) {
  return (
    <Div open={open}>
      <div onClick={() => window.alert('Coming soon, please try to share via whatsapp')}>
        <ion-icon name="logo-instagram"></ion-icon>
      </div>
      <div>
        <a
          href="whatsapp://send?text=Join the GaiaSenses community! access: https://gaia-senses.vercel.app/"
          data-action="share/whatsapp/share"
        >
          <ion-icon name="logo-whatsapp"></ion-icon>
        </a>
      </div>
      <div onClick={() => window.alert('Coming soon, please try to share via whatsapp')}>
        <ion-icon name="logo-twitter"></ion-icon>
      </div>
      <div onClick={() => window.alert('Coming soon, please try to share via whatsapp')}>
        <ion-icon name="mail-outline"></ion-icon>
      </div>
    </Div>
  );
}

export default ShareOptions;

const Div = styled.div`
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
