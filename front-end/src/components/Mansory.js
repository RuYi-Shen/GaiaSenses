import React, { useState, useEffect, useMemo } from "react";
import useMeasure from "react-use-measure";
import { useTransition, a } from "@react-spring/web";
import shuffle from "lodash.shuffle";
import Image from "./Image";

import styles from "../css/styles.module.css";

function Masonry({posts}) {
  const [flipped, setFlipped] = useState(0);
  // Hook1: Tie media queries to the number of columns
  const columns = useMedia(
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
    [5, 4, 3],
    2
  );
  // Hook2: Measure the width of the container element
  const [ref, { width }] = useMeasure();
  // Hook3: Hold items
  const [items, set] = useState(posts);
  // Hook4: shuffle data every 2 seconds
  useEffect(() => {
    /* const t = setInterval(() => set(shuffle), 5000);
    return () => clearInterval(t); */
  }, []);
  // Hook5: Form a grid of stacked items using width & columns we got from hooks 1 & 2
  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0); // Each column gets a height starting with zero
    let gridItems = items.map((child, i) => {
      const column = heights.indexOf(Math.min(...heights)); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
      const x = (width / columns) * column; // x = container width / number of columns * column index,
      const y = (heights[column] += width / columns) - width / columns; // y = it's just the height of the current column
      return {
        ...child,
        x,
        y,
        width: width / columns,
        height: width / columns,
      };
    });
    return [heights, gridItems];
  }, [columns, items, width]);
  // Hook6: Turn the static grid values into animated transitions, any addition, removal or change will be animated
  const transitions = useTransition(gridItems, {
    key: (item) => item.url,
    from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });
  // Render the grid
  return (
    <div
      ref={ref}
      className={styles.list}
      style={{ height: Math.max(...heights) }}
    >
      {transitions((style, item) => (
        <a.div style={style}>
          <Image
            post={item}
          />
        </a.div>
      ))}
    </div>
  );
}

function useMedia(queries, values, defaultValue) {
  const match = () =>
    values[queries.findIndex((q) => matchMedia(q).matches)] || defaultValue;
  const [value, set] = useState(match);
  useEffect(() => {
    const handler = () => set(match);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return value;
}

/* const data = [
  { url: "https://images.pexels.com/photos/416430/pexels-photo-416430.jpeg" },
  { url: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg" },
  { url: "https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg" },
  { url: "https://images.pexels.com/photos/358574/pexels-photo-358574.jpeg" },
  { url: "https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg" },
  { url: "https://images.pexels.com/photos/96381/pexels-photo-96381.jpeg" },
  { url: "https://images.pexels.com/photos/1005644/pexels-photo-1005644.jpeg" },
  { url: "https://images.pexels.com/photos/227675/pexels-photo-227675.jpeg" },
  { url: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg" },
  { url: "https://images.pexels.com/photos/327482/pexels-photo-327482.jpeg" },
  { url: "https://images.pexels.com/photos/2736834/pexels-photo-2736834.jpeg" },
  { url: "https://images.pexels.com/photos/249074/pexels-photo-249074.jpeg" },
  { url: "https://images.pexels.com/photos/310452/pexels-photo-310452.jpeg" },
  { url: "https://images.pexels.com/photos/380337/pexels-photo-380337.jpeg" },
]; */

export default Masonry;
