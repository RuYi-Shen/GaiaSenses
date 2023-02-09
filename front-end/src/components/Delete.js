import { usePopperTooltip } from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";
import styled from "styled-components";
import postService from "../services/post";

export default function Delete({ postId, removePost }) {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip();


  const handleDelete = (e) => {
    e.stopPropagation();

    postService.delete(postId)
      .then(() => removePost(postId))
      .catch((err) => console.error(err));
  }

  return (
    <>
      <Trash onClick={(e) => handleDelete(e)} ref={setTriggerRef}>
        <ion-icon name="trash-outline"></ion-icon>
      </Trash>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: "tooltip-container" })}
        >
          <div {...getArrowProps({ className: "tooltip-arrow" })} />
          Delete
        </div>
      )}
    </>
  )
}

const Trash = styled.div`
  width: 50px;
  height: 50px;

  position: absolute;
  bottom: 0;
  right: 0;

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
    color: #FFFFFF;
    cursor: pointer;
  }
  :hover {
    cursor: pointer;
  }
`;
