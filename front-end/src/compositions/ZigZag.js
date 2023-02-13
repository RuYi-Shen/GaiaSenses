// inspired by: https://openprocessing.org/sketch/1643288

import React from 'react'
import Sketch from "react-p5";

const FPS_MIN = 15;
const FPS_MAX = 60;

const AGENTS_MIN = 6;
const AGENTS_MAX = 200;

const CRITICAL_RAIN_MM = 10;
const CRITICAL_LIGHTNING = 10;

export default function ZigZag({ width, height, rain, lightning }) {
  let canvasWidth = width || window.screen.availWidth;
  let canvasHeight = height || window.screen.availHeight;
  let rainMili = rain['1h'] || 0;
  let lightningCount = lightning || 0;

  const colors = ["#af0f0f", "#feb30f", "#0aa4f7", "#000000", "#ffffff"];
  const weights = [1, 1, 1, 1, 1];

  let agents = [];
  let nAgents = 0,
      scale = 10,
      step = 2,
      direction = 1;

  const createAgent = (p5, x, y) => {
    return {
      pos: p5.createVector(x, y),
      oldPos: p5.createVector(x, y),
      color: generateColor(p5, 10),
      strokeWidth: 5,
    }
  }

  const updateAgent = (p5, agent) => {
    agent.pos.x += direction * vectorField(p5, agent.pos.x, agent.pos.y, scale).x * step + 1;
    agent.pos.y += direction * vectorField(p5, agent.pos.x, agent.pos.y, scale).y * step;

    agent.strokeWidth = p5.map(agent.pos.y, 0, canvasHeight, 5, 1);

    if (agent.pos.y >= canvasHeight) {
      agent.pos.y = 0;
      agent.color = generateColor(p5, 10);
      agent.strokeWidth = 5;
      agent.oldPos.set(agent.pos);
    }
    if (agent.pos.x > canvasWidth || agent.pos.x < 0) {
      agent.pos.x = agent.pos.x < 0 ? canvasWidth : 0;
      agent.oldPos.set(agent.pos);
    }

    p5.strokeWeight(agent.strokeWidth);
    p5.stroke(agent.color);
    p5.line(agent.oldPos.x, agent.oldPos.y, agent.pos.x, agent.pos.y);

    agent.oldPos.set(agent.pos);
  }

  const vectorField = (p5, x, y, scale) => {
    x = p5.map(x, 0, canvasWidth, -scale - 10, scale + 10);
    y = p5.map(y, 0, canvasHeight, -scale - 10, scale + 10);

    let k1 = 5;
    let k2 = 3;

    let u = Math.sin(k1 * y) + Math.floor(Math.cos(k2 * y));
    let v = Math.sin(k2 * x) - Math.cos(k1 * x);

    // litle trick to move from left to right
    if (v <= 0) {
      v = -v * 0.3;
    }
    return p5.createVector(u, v);
  }

  const generateColor = (p5, scale) => {
    let temp = randomColor(p5);

    let color = p5.color(
      p5.hue(temp) + p5.randomGaussian() * scale,
      p5.saturation(temp) + p5.randomGaussian() * scale,
      p5.brightness(temp) - scale,
      p5.random(10, 100));

    return color;
  }

  const randomColor = (p5) => {
    let sum = weights.reduce((prev, cur) => prev + cur);
    let target = p5.random(0, sum);

    for (let i = 0; i < weights.length; i++) {
      const weight = weights[i];

      if (weight >= target) {
        return colors[i];
      }
      target -= weight;
    }
  }

  const setup = (p5, parent) => {
    p5.createCanvas(canvasWidth, canvasHeight).parent(parent)
    p5.colorMode(p5.HSB, 360, 100, 100);
    p5.rectMode(p5.CENTER);
    p5.strokeCap(p5.SQUARE);

    p5.background(0);

    let fps = p5.map(rainMili, 0, CRITICAL_RAIN_MM, FPS_MIN, FPS_MAX, true);
    p5.frameRate(fps);

    nAgents = Math.floor(p5.map(lightningCount, 0, CRITICAL_LIGHTNING, AGENTS_MIN, AGENTS_MAX, true));

    for (let i = 0; i < nAgents/3; i++) {
      agents.push(createAgent(p5, p5.randomGaussian() * 200, 0));
      agents.push(createAgent(p5, canvasWidth * 0.5 + p5.randomGaussian() * 200, 0));
      agents.push(createAgent(p5, canvasWidth * 1.0 + p5.randomGaussian() * 200, 0));
    }
  }

  const draw = (p5) => {
    if (p5.frameCount > 10000) {
      p5.noLoop();
    }

    for (let i = 0; i < agents.length; i++) {
      updateAgent(p5, agents[i]);
    }

    p5.stroke(0, 0, 100);
    p5.noFill();
    p5.strokeWeight(20);
  }

  return <Sketch setup={setup} draw={draw} />;
}
