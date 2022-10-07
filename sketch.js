const numPartials = 16;
const osc = [];
const freqs = [];
const ampEnvs = [];
const fundamental = 55;
const shift = getRandomIntInclusive(1, 60);
const toneLength = "16";

let cnv, slider, rate, audioRunning;

////////////////////////////////////////////////////////////////////////////////
// P5.js lifecycle                                                            //
////////////////////////////////////////////////////////////////////////////////
function setup() {
  noLoop();
  audioRunning = false;

  cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(runExperience);

  textSize(width / 30);
  // textAlign(CENTER, CENTER);

  // TODO - set here when decided
  // frameRate(10);

  renderUI();
}

function draw() {
  colorMode(HSB);
  background(random(0, 255), 255, 255);

  text('tap to play', 10, 100);

  frameRate(slider.value());
}

/* full screening will change the size of the canvas */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling the page.
 */
document.ontouchmove = function(event) {
  event.preventDefault();
};

////////////////////////////////////////////////////////////////////////////////
// Main                                                                       //
////////////////////////////////////////////////////////////////////////////////

async function runExperience() {
  console.log('runExperience...')
  // fullscreen(true);

  await Tone.start()
  console.log('Tone.js audio is ready!')

  // start the P5 draw loop
  loop();

  if (!audioRunning) {
    calculateDSP();

    const loop = new Tone.Loop((time) => {
      console.log(time);
      for (i = 1; i <= numPartials; i++) {
        ampEnvs[i].attack = Math.random();
        ampEnvs[i].decay = Math.random();
        ampEnvs[i].release = Math.random();
        ampEnvs[i].triggerAttackRelease(toneLength);
      }

    }, toneLength).start(0);

    Tone.Transport.start();

    console.log(freqs);
    audioRunning = true;
  }
}

////////////////////////////////////////////////////////////////////////////////
// DSP                                                                        //
////////////////////////////////////////////////////////////////////////////////

function calculateDSP() {
  for (i = 1; i <= numPartials; i++) {

    ampEnvs[i] = new Tone.AmplitudeEnvelope({
      attack: Math.random(),
      decay: Math.random(),
      sustain: Math.random(),
      release: Math.random()
    });

    ampEnvs[i].toDestination();

    freqs[i] = ((i + shift) * fundamental)
      * Math.sqrt(
        Math.abs(
          1 + (i * i * 0.000521)
        )
      );

    osc[i] = new Tone.Oscillator(freqs[i], "sine").connect(ampEnvs[i]);
    osc[i].volume.value = -42;
    osc[i].start();
  }
}

////////////////////////////////////////////////////////////////////////////////
// GUI                                                                        //
////////////////////////////////////////////////////////////////////////////////

function renderUI() {
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
}

////////////////////////////////////////////////////////////////////////////////
// Utils                                                                      //
////////////////////////////////////////////////////////////////////////////////

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}