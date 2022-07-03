import React, { Component } from "react";
import Sketch from "react-p5";

export default class Tree extends Component {
  x = -500;
  y = 50;
  theta = 0;
  dir = true;
  width = window.screen.availWidth;
  height = window.screen.availHeight-100;

  setup = (p5, parent) => {
    p5.createCanvas(this.width, this.height).parent(parent);
  };
  draw = (p5) => {
    p5.background(0);
    p5.frameRate(30);

    p5.stroke(p5.color(this.props.color));
    p5.strokeWeight(this.width / 150);
    // Let's pick an angle 0 to 90 degrees based on the mouse position
    let a = (p5.mouseX / this.width) * 90;
    // Convert it to radians
    this.theta = p5.radians(a);
    // Start the tree from the bottom of the screen
    p5.translate(this.width / 2, this.height);
    // Draw a line 120 pixels
    p5.line(0, 0, 0, -this.width / 7);
    // Move to the end of that line
    p5.translate(0, -this.width / 7);
    // Start the recursive branching!
    this.branch(p5, this.width / 7);
    p5.ellipse(this.x, this.y, 20, 20);
    if (this.dir) {
      this.x += 10;
    } else {
      this.x -= 10;
    }
    if (this.x > 500) {
      this.dir = false;
    } else if (this.x < -500) {
      this.dir = true;
    }
  };

  branch = (p5, h) => {
    h *= 0.66;
    if (h > 2) {
      p5.strokeWeight(h / 15 + 0.5);
      p5.push(); // Save the current state of transformation (i.e. where are we now)
      p5.rotate(this.theta); // Rotate by theta
      p5.line(0, 0, 0, -h); // Draw the branch
      p5.translate(0, -h); // Move to the end of the branch
      this.branch(p5, h); // Ok, now call myself to draw two new branches!!
      p5.pop(); // Whenever we get back here, we "pop" in order to restore the previous matrix state

      // Repeat the same thing, only branch off to the "left" this time!
      p5.push();
      p5.rotate(-this.theta);
      p5.line(0, 0, 0, -h);
      p5.translate(0, -h);
      this.branch(p5, h);
      p5.pop();
    }
  };

  render() {
    return <Sketch setup={this.setup} draw={this.draw} />;
  }
}
