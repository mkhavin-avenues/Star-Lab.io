let bg;
let starFill;
let breathing;

function setup() {
  createCanvas(400, 400);
  changeBGColor();
  starFill = randomColor();
  fill(starFill);
  noStroke();
  breathing = createBreathingObject(50, 100, 0.05);
}

function draw() {
  background(bg);
  breathing.update();
  drawStar(width / 2, height / 2, 7, breathing.innerRadius, breathing.outerRadius);
}

function drawStar(mx = width / 2, my = height / 2, numberOfSides = 7, ir = 50, or = 100) {
  let numberOfPoints = numberOfSides * 2;
  let theta = 0;
  let dt = TWO_PI / numberOfPoints;
  
  beginShape();
  for (let i = 0; i < numberOfPoints; i++) {
    let radius = i % 2 === 0 ? ir : or;
    vertex(mx + radius * cos(theta + dt * i), my + radius * sin(theta + dt * i));
  }
  endShape(CLOSE);
}

function createBreathingObject(minRadius, maxRadius, step) {
  return {
    innerRadius: minRadius,
    outerRadius: maxRadius,
    theta: 0,
    update() {
      this.innerRadius = minRadius + (maxRadius - minRadius) * 0.5 * (1 + sin(this.theta));
      this.outerRadius = maxRadius + (minRadius - maxRadius) * 0.5 * (1 + cos(this.theta));
      this.theta += step;
    }
  };
}

function randomColor(avenues = true) {
  if (avenues) {
    return color(randomAvenuesColor());
  } else {
    return color(random(255), random(255), random(255));
  }
}

function changeBGColor(avenues = true) {
  bg = randomColor(avenues);
}

function keyPressed() {
  if (key === 'b') {
    changeBGColor();
  }
}

const colors = {
  white: "#ffffff",
  black: "#000000",
  ash: "#B7B09C", 
  ochre: "#D3AE6F",
  indigo: "#3D68B2",
  moss: "#267355",
  pristineBlue: "#44C3D4",
  violet: "#9796C9",
  nimbus: "#CAC3BC",
  pistachio: "#C5D982",
  olive: "#8A916A",
  terracotta: "#C17E60",
  gold: "#F5CD64",
  clay: "#C3411E",
  grass: "#0D9A48",
  navy: "#273879"
};

function randomAvenuesColor() {
  return random(Object.values(colors));
}
