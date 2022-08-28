let randBack;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  randBack = random(0,255);
  colorMode(HSB);
  background(randBack, 255, 255);
}
