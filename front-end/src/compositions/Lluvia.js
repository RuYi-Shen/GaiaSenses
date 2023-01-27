import React from 'react'
import Sketch from "react-p5";

const ELLIPSE_SIZE_MIN = 15;
const ELLIPSE_SIZE_MAX = 250;

const FPS_MIN = 0.5
const FPS_MAX = 20

const CRITICAL_RAIN_MM = 20;

function normalize(x, min = 0, max = 1) {
  return (max - min) / (1 + Math.exp(-0.2 * (x - CRITICAL_RAIN_MM))) + min
}

export default function Lluvia(props) {
  let width = props.width || window.screen.availWidth;
  let height = props.height || window.screen.availHeight;
  let rain = props.rain ? props.rain['1h'] : 0;

  let ellipseSize = normalize(rain, ELLIPSE_SIZE_MIN, ELLIPSE_SIZE_MAX)
  let fps = normalize(rain, FPS_MIN, FPS_MAX)

  const setup = (p5, parent) => {
    p5.createCanvas(width, height).parent(parent)
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
