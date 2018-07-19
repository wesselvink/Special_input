var bird;
var pipes = [];
var mic;
var slider;
var sliderBottom;
var fft;
var clapping = false;


function setup() {
  createCanvas(400, 600);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.8,512);
  bird = new Bird();
  pipes.push(new pipe());
  slider = createSlider(0,0.5,0.1,0.05);
}
function draw() {
  background(0);
  var sound = fft.analyze;
  var frequency = fft.getEnergy("bass");
  var vol = mic.getLevel();
  bird.show();
  bird.update();
  for (var i = pipes.length-1; i >= 0; i--){
    pipes[i].show();
    pipes[i].update();

   if(pipes[i].hits(bird)){
    }

    if(pipes[i].offscreen()){
      pipes.splice(i, 1);
    }
  }

  if (frameCount % 40 == 0){
    pipes.push(new pipe());
  }

  var treshold = slider.value();
  if (vol > treshold && !clapping){
    bird.up();
    clapping = true;
  }
  if (vol <treshold){
    clapping = false;
  }

fill(0,255,0);
var y  = map(vol,0,1,height,0);
rect(width - 50, y, 50, height  -y);
var ty = map(treshold, 0, 1, height, 0);
stroke(255, 0, 0);
strokeWeight(4);
line(width -50, ty, width, ty);
}

function keyPressed(){
  if (key == ' ' ){
    bird.up();
  }
}
