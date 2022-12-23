import { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { usePopperTooltip } from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";
import UserContext from "../contexts/UserContext";

export default function Publish({ postId, published }) {
  const URL = "https://gaiasenses-production.up.railway.app/post/publish";
  const [publishState, setPublishState] = useState(published);
  const { userData } = useContext(UserContext);

  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip();

  function handleLike(e) {
    e.stopPropagation();
    if (!publishState) {
        setPublishState(true);
        axios
        .post(`${URL}/${postId}`, {}, { headers: { Authorization: `Bearer ${userData.token}` } })
        .then((response) => {
            console.log(response);
        })
        .catch((e) => console.log(e));
    }
  }


  return (
    <>
      <Cloud onClick={(e) => handleLike(e)} published={publishState} ref={setTriggerRef}>
        {publishState ? (
          <ion-icon name="cloud-upload"></ion-icon>
        ) : (
            <ion-icon name="cloud-upload-outline"></ion-icon>
        )}
      </Cloud>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: "tooltip-container" })}
        >
          <div {...getArrowProps({ className: "tooltip-arrow" })} />
          {publishState ? "Published" : "Publish"}
        </div>
      )}
    </>
  );
}

const Cloud = styled.div`
  width: 50px;
  height: 50px;
  
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px;
  z-index: 15;
  p {
    margin-top: 5px;
    font-size: 11px;
  }

  ion-icon {
    font-size: 30px;
    color: ${(props) => (props.published ? "blue" : "#FFFFFF")};
    cursor: pointer;
  }
  :hover {
    cursor: pointer;
  }
`;
