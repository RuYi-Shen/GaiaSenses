// inspired by: https://openprocessing.org/sketch/1176431

import React from 'react'
import Sketch from "react-p5";

const FPS_MIN = 5;
const FPS_MAX = 30;

const CRITICAL_RAIN_MM = 10;
const CRITICAL_TEMP = 35;

export default function Curves({ width, height, rain, temp }) {
  let canvasWidth = width || window.screen.availWidth;
  let canvasHeight = height || window.screen.availHeight;
  let rainMili = rain['1h'] || 0;
  let temperature = temp || 20;

  const setup = (p5, parent) => {
    p5.createCanvas(canvasWidth, canvasHeight).parent(parent);

    let fps = p5.map(rainMili, 0, CRITICAL_RAIN_MM, FPS_MIN, FPS_MAX);
    p5.frameRate(fps);

    p5.background(0);
  }

  const draw = (p5) => {
    const red = p5.map(temperature, 0, CRITICAL_TEMP, 50, 255);
    const blue = p5.map(temperature, 0, CRITICAL_TEMP, 255, 50);

    p5.noFill();
    p5.stroke(p5.random(10, red), 10, p5.random(10, blue));

    p5.bezier(
      p5.random(width),
      0,
      p5.random(width),
      p5.random(width),
      p5.random(width),
      p5.random(width),
      p5.random(width),
      height
    );
  }

  return <Sketch setup={setup} draw={draw} />;
}
