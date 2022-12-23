import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { usePopperTooltip } from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";
import UserContext from "../contexts/UserContext";

export default function Like({ postId, likes }) {
  const URL = "https://gaiasenses-production.up.railway.app/like";
  const { userData } = useContext(UserContext);

  const [infoText, setInfoText] = useState("no one has liked this post yet");
  const [likesInfo, setLikesInfo] = useState(likes);

  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip();

  function handleLike(e) {
    e.stopPropagation();
    if (!likesInfo.liked) {
      let aux = [...likesInfo.users];
      aux.push({ name: userData.name });
      setLikesInfo({ liked: true, count: likesInfo.count + 1, users: aux });
      axios
        .post(
          `${URL}/${postId}`,
          {},
          { headers: { Authorization: `Bearer ${userData.token}` } }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((e) => console.log(e));
    } else {
      let aux = [...likesInfo.users];
      aux.shift();
      setLikesInfo({ liked: false, count: likesInfo.count - 1, users: aux });
      axios
        .delete(`${URL}/${postId}`, {
          headers: { Authorization: `Bearer ${userData.token}` },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((e) => console.log(e));
    }
  }

  useEffect(() => {
    if (likesInfo.count === 0) {
      setInfoText("no one has liked this post yet");
    } else if (likesInfo.count === 1) {
      setInfoText(likesInfo.users[0]?.name + " liked this post");
    } else if (likesInfo.count === 2) {
      setInfoText(
        `${likesInfo.users[0]?.name} and ${likesInfo.users[1]?.name} liked this post`
      );
    } else if (likesInfo.count > 2) {
      setInfoText(
        `${likesInfo.users[0]?.name}, ${likesInfo.users[1]?.name} and ${
          likesInfo.count * 1 - 2
        } other people`
      );
    } // eslint-disable-next-line
  }, [likesInfo.users]);

  return (
    <>
      <Heart
        onClick={(e) => handleLike(e)}
        liked={likesInfo.liked}
        ref={setTriggerRef}
      >
        {likesInfo.liked ? (
          <ion-icon name="heart"></ion-icon>
        ) : (
          <ion-icon name="heart-outline"></ion-icon>
        )}
        <p>{likesInfo.count} likes</p>
      </Heart>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: "tooltip-container" })}
        >
          <div {...getArrowProps({ className: "tooltip-arrow" })} />
          {infoText}
        </div>
      )}
    </>
  );
}

const Heart = styled.div`
  width: 50px;
  height: 50px;

  position: absolute;
  top: 0;
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
    color: ${(props) => (props.liked ? "red" : "#FFFFFF")};
    cursor: pointer;
  }
  :hover {
    cursor: pointer;
  }
`;
