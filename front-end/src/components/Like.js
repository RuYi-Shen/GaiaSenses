import styled from "styled-components";
import { usePopperTooltip } from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";
import { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";

export default function Like({ postId, published, likes, user }) {
  const URL = "http://localhost:5000/like";
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

  function likePost() {
    if (!likesInfo.liked) {
      let aux = [...likesInfo.users];
      aux.push({name: user.name});
      setLikesInfo({ liked: true, count: likesInfo.count + 1, users: aux });
      axios
        .post(`${URL}/${postId}`, {}, { headers: { Authorization: `Bearer ${userData.token}` } })
        .then((response) => {
          console.log(response);
        })
        .catch((e) => console.log(e));
    } else {
      let aux = [...likesInfo.users];
      aux.shift();
      setLikesInfo({ liked: false, count: likesInfo.count - 1, users: aux});
      axios
        .delete(`${URL}/${postId}`, { headers: { Authorization: `Bearer ${userData.token}` } })
        .then((response) => {
          console.log(response);
        })
        .catch((e) => console.log(e));
    }
  }

  useEffect(() => {
    if (likesInfo.count == 0) {
      setInfoText("no one has liked this post yet");
    } else if (likesInfo.count == 1) {
      setInfoText(likesInfo.users[0]?.name + " liked this post");
    } else if (likesInfo.count == 2) {
      setInfoText(
        `${likesInfo.users[0]?.name} and ${likesInfo.users[1]?.name} liked this post`
      );
    } else if (likesInfo.count > 2) {
      setInfoText(
        `${likesInfo.users[0]?.name}, ${likesInfo.users[1]?.name} and ${
          likesInfo.count * 1 - 2
        } other people`
      );
    }
  }, [likesInfo.users]);

  return (
    <>
      <Heart onClick={likePost} liked={likesInfo.liked} ref={setTriggerRef}>
        {likesInfo.liked ? (
          <ion-icon name="heart"></ion-icon>
        ) : (
          <ion-icon name="heart-outline"></ion-icon>
        )}
        <p>{likesInfo.likes} likes</p>
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
  margin-left: 18px;
  position: absolute;
  left: 0;
  bottom: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 20;
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
