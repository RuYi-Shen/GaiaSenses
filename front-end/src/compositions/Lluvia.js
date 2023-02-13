// inspired by: https://openprocessing.org/sketch/386391

import React from 'react'
import Sketch from "react-p5";

const ELLIPSE_SIZE_MIN = 15;
const ELLIPSE_SIZE_MAX = 250;

const FPS_MIN = 2;
const FPS_MAX = 20;

const CRITICAL_RAIN_MM = 10;

function normalize(x, min = 0, max = 1) {
  x = Math.min(x, CRITICAL_RAIN_MM);
  x = Math.max(x, 0);
  return ((max - min) / CRITICAL_RAIN_MM) * x + min;
}

export default function Lluvia({ width, height, rain }) {
  let canvasWidth = width || window.screen.availWidth;
  let canvasHeight = height || window.screen.availHeight;
  let rainMili = rain['1h'] || 0;

  let ellipseSize = normalize(rainMili, ELLIPSE_SIZE_MIN, ELLIPSE_SIZE_MAX);
  let fps = normalize(rainMili, FPS_MIN, FPS_MAX);

  const setup = (p5, parent) => {
    p5.createCanvas(canvasWidth, canvasHeight).parent(parent)
    p5.frameRate(fps)
    p5.background(0);
  }

  const draw = (p5) => {
    p5.fill(p5.random(255), p5.random(255), p5.random(255), p5.random(255));

    p5.noStroke();

    p5.ellipse(
      p5.random(width),
      p5.random(height),
      p5.random(ellipseSize),
      p5.random(ellipseSize)
    );
  }

  return <Sketch setup={setup} draw={draw} />;
}
