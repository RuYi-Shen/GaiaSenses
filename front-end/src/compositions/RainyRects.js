// inspired by: https://openprocessing.org/sketch/1274144

import React from 'react'
import Sketch from "react-p5";

const RECT_MAX_WIDTH = 15;
const RECT_MIN_WIDTH = 5;

const RECT_MAX_HEIGHT = 200;
const RECT_MIN_HEIGHT = 15;

const FPS_MIN = 1
const FPS_MAX = 60

const CRITICAL_RAIN_MM = 10;

function normalize(x, min = 0, max = 1) {
  x = Math.min(x, CRITICAL_RAIN_MM);
  x = Math.max(x, 0);
  return ((max - min) / CRITICAL_RAIN_MM) * x + min;
}

export default function RainyRects({ width, height, rain }) {
  let canvasWidth = width || window.screen.availWidth;
  let canvasHeight = height || window.screen.availHeight;
  let rainMili = rain['1h'] || 0;

  let rectWidth = normalize(rainMili, RECT_MIN_WIDTH, RECT_MAX_WIDTH);
  let rectHeight = normalize(rainMili, RECT_MIN_HEIGHT, RECT_MAX_HEIGHT);

  const setup = (p5, parent) => {
    p5.createCanvas(canvasWidth, canvasHeight).parent(parent);

    let fps = p5.map(rainMili, 0, CRITICAL_RAIN_MM, FPS_MIN, FPS_MAX);
    p5.frameRate(fps);
    p5.background(0);
  }

  const draw = (p5) => {
    p5.noStroke();
    p5.fill(0, 0, p5.random(30, 255));
    p5.rect(
      p5.random(canvasWidth),
      p5.random(canvasHeight),
      p5.random(rectWidth),
      p5.random(rectHeight)
    );

    p5.fill(0, 0, 0);
    p5.rect(
      p5.random(canvasWidth),
      p5.random(canvasHeight),
      p5.random(100),
      p5.random(40)
    );
  }

  return <Sketch setup={setup} draw={draw} />;
}
