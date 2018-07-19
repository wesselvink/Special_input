var fft;
var mic;
var x, y;
function preload(){
  //song = loadSound("A.mp3");
}

function setup(){
  createCanvas(400, 600);
  fft = new p5.FFT(0.8, 1024);
  mic = new p5.AudioIn();
  mic.start();
  fft.setInput(mic);
  x = width / 2;
   y = height;
}


function draw() {
  background(51);

  fft.analyze();
  fft.smooth();
  var low = fft.getEnergy("bass");
  var lowmiddle = fft.getEnergy("lowMid");
  var middle = fft.getEnergy("mid");
  var highmiddle = fft.getEnergy("highMid");
  var high = fft.getEnergy("treble");

  var frequency = (low *-1 + lowmiddle *-0.5 + middle * 0.5 + highmiddle * 1 + high *1.5);
  rect(50, 500, 30, frequency);
  console.log(frequency);

}
