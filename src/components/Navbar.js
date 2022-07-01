import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Navbar() {
  const navigate = useNavigate();
  return (
    <Nav>
      <div onClick={() => navigate("/")}>
        <ion-icon name="home"></ion-icon>
      </div>
      <div onClick={() => navigate("/daily")}>
        <ion-icon name="person"></ion-icon>
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
