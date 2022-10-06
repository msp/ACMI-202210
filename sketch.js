let randBack;
let slider;
let rate;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // TODO - set here when decided
  // frameRate(10);
  createUI();
}

function draw() {
  randBack = random(0, 255);
  colorMode(HSB);
  background(randBack, 255, 255);
  frameRate(slider.value());
}

function createUI() {
  slider = createSlider(1, 60, 10, 1);
  slider.position(10, 10);
  slider.style('width', '50%');
  slider.style('height', '10px');
  slider.input(sliderChangeEvent);

  rate = createInput('');
  rate.position(10, 30);
  rate.size(15);
  rate.value(slider.value());
}

function sliderChangeEvent() {
  rate.value(this.value());
  console.log('you are typing: ', this.value());
}
