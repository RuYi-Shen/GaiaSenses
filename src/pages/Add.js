import styled from "styled-components";
import ChaosTree from "../components/ChaosTree.js";
import Navbar from "../components/Navbar";
import ConfigBar from "../components/ConfigBar";
import { useEffect, useState } from "react";

function Add() {
  const [width, setWidth] = useState(window.screen.availWidth);
  const [height, setHeight] = useState(window.screen.availHeight - 100);

  return (
    <Main>
      <ConfigBar />
      <div className="art">
      <ChaosTree
        width={window.screen.availWidth}
        height={window.screen.availHeight - 100}
      />
        </div>
      <Navbar />
    </Main>
  );
}

export default Add;

const Main = styled.main`
  width: 100%;
  height: 100%;
  
  .art {
    width: 100%;
    height: calc(100% - 100px);
    margin: 50px 0;
  }
`;
