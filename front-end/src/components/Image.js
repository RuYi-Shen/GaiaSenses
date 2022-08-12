import React, { useState } from "react";
import { useSpring, a } from "@react-spring/web";
import Like from "./Like";

import styles from "../css/styles.module.css";

function Image({post}) {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 0 : 180}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  return (
    <div className={styles.container} onClick={() => set(!flipped)}>
      <Like postId={post.id} published={post.published} likes={post.likes} user={post.user}></Like>
      <a.div
        className={`${styles.c}`}
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity,
          transform,
        }}
      >
        {post.content}
        
      </a.div>
      <a.img
        src={post.url}
        className={`${styles.c}`}
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
      />
    </div>
  );
}

export default Image;
