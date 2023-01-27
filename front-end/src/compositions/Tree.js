import React from "react"
import Sketch from "react-p5";

export default function Tree(props) {
  let x = -props.width / 2 || -500;
  let y = 50;
  let theta = 0;
  let dir = true;
  let width = props.width || window.screen.availWidth;
  let height = props.height || window.screen.availHeight - 150;
  let mouseX = 0;

  const setup = (p5, parent) => {
    p5.createCanvas(width, height).parent(parent);
  };

  const branch = (p5, h) => {
    h *= 0.66;
    if (h > 2) {
      p5.strokeWeight(h / 15 + 0.5);
      p5.push(); // Save the current state of transformation (i.e. where are we now)
      p5.rotate(theta); // Rotate by theta
      p5.line(0, 0, 0, -h); // Draw the branch
      p5.translate(0, -h); // Move to the end of the branch
      branch(p5, h); // Ok, now call myself to draw two new branches!!
      p5.pop(); // Whenever we get back here, we "pop" in order to restore the previous matrix state

      // Repeat the same thing, only branch off to the "left" this time!
      p5.push();
      p5.rotate(-theta);
      p5.line(0, 0, 0, -h);
      p5.translate(0, -h);
      branch(p5, h);
      p5.pop();
    }
  };

  const draw = (p5) => {
    if (
      p5.mouseX < width &&
      p5.mouseX > 0 &&
      p5.mouseY < height &&
      p5.mouseY > 0
    ) {
      mouseX = p5.mouseX;
    }
    p5.background(0);
    p5.frameRate(20);

    p5.stroke(p5.color(props.color));
    p5.strokeWeight(width / 70);
    // Let's pick an angle 0 to 90 degrees based on the mouse position
    let a = (mouseX / width) * 90;
    // Convert it to radians
    theta = p5.radians(a);
    // Start the tree from the bottom of the screen
    p5.translate(width / 2, height);
    // Draw a line 120 pixels
    p5.line(0, 0, 0, -width / 3);
    // Move to the end of that line
    p5.translate(0, -width / 3);
    // Start the recursive branching!
    branch(p5, width / 4);
    p5.fill(p5.color(props.color));
    p5.ellipse(x, y, 20, 20);
    if (dir) {
      x += 10;
    } else {
      x -= 10;
    }
    if (x > width / 2) {
      dir = false;
    } else if (x < -width / 2) {
      dir = true;
    }
  };

  return <Sketch setup={setup} draw={draw} />;
}
