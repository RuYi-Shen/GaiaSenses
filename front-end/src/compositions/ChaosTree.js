import React, { Component } from "react";
import Sketch from "react-p5";

class Particle {
  constructor(x, y, size, p5, img) {
    this.pos = { x, y };
    this.tgt = { 'x': p5.random(-1, 1) + x, 'y': p5.random(-1, 1) + y };
    this.size = size;
    this.col = img.get(x, y);
  }
}

class ChaosTree extends Component {
  img;
  particles = [];
  x;
  y;

  preload = (p5) => {
    this.img = p5.loadImage(this.props.imageUrl);
  };

  setup = (p5, parentRef) => {
    this.img.resize(
      this.props.width || window.screen.availWidth,
      this.props.height || window.screen.availHeight - 100
    );
    p5.createCanvas(this.img.width, this.img.height).parent(parentRef);
    p5.image(this.img, 0, 0);
    //p5.frameRate(20);

    for (let i = 1; i > 0; i -= 0.0001) {
      const x = p5.random(this.img.width);
      const y = p5.random(this.img.height);
      const size = 40 * Math.pow(p5.random(i), 2) + 8;

      if (!this.particles.some((p) =>
        Math.pow(p.pos.x - x, 2) + Math.pow(p.pos.y - y, 2) <
        Math.pow(size / 2 + p.size / 2 - 2, 2))
      ) {
        this.particles.push(new Particle(x, y, size, p5, this.img));
      }
    }

    p5.noStroke();
  };

  draw = (p5) => {
    p5.image(this.img, 0, 0);

    for (const particle of this.particles) {
      if (p5.mouseX < this.img.width && p5.mouseX > 0 &&
        p5.mouseY < this.img.height && p5.mouseY > 0
      ) {
        this.x = p5.mouseX;
        this.y = p5.mouseY;
      }

      p5.fill(particle.col);
      const t = 1 - 5e-4 * (Math.pow(particle.pos.x - this.x, 2) + Math.pow(particle.pos.y - this.y, 2));
      const p = [
        (1 - t) * particle.pos.x + particle.tgt.x * t,
        (1 - t) * particle.pos.y + particle.tgt.y * t
      ];
      p5.circle(p[0], p[1], particle.size);
    }
  };

  render() {
    return (
      <Sketch preload={this.preload} setup={this.setup} draw={this.draw} />
    );
  }
}

export default ChaosTree;
