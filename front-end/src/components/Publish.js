import { useState } from "react";
import styled from "styled-components";
import { usePopperTooltip } from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";
import postService from "../services/post";

export default function Publish({ postId, published }) {
  const [publishState, setPublishState] = useState(published);

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
      postService.publish(postId)
        .catch((e) => console.error(e));
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
