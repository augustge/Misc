
var N      = 1000;
var levels = [];
var mic, recorder, fft, soundFile, spectrum;
var t = 0;

function setup(){
  createCanvas(windowWidth, windowHeight);

  mic = new p5.AudioIn()
  mic.start();

  // create a sound recorder
  // recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  // recorder.setInput(mic);

  // create an empty sound file that we will use to playback the recording
  // soundFile = new p5.SoundFile();

  // make FFT machine
  fft = new p5.FFT();
  fft.setInput(mic);
  spectrum = fft.analyze();
  // recorder.record(soundFile);

}
function draw(){
  background(255);
  t += 1;

  if(levels.length>N){
    for(var i=0; i<levels.length-1; i++){
      levels[i] = levels[i+1]
    }
    levels[N] = mic.getLevel();
  }else{
    levels.push(mic.getLevel());
  }

  // fft.setInput(soundFile);

  var spectrum = fft.analyze();

  fill(0);
  noStroke();
  text(mic.getLevel(),100,100);
  // text(t,100,80);
  // var ct = fft.getCentroid();
  // text(ct,100,100)
  // text(spectrum.length,100,120)

  // var bass    = fft.getEnergy("bass")
  // bass = round(100*bass)/100.
  // var lowMid  = fft.getEnergy("lowMid")
  // lowMid = round(100*lowMid)/100.
  // var mid     = fft.getEnergy("mid")
  // mid = round(100*mid)/100.
  // var highMid = fft.getEnergy("highMid")
  // highMid = round(100*highMid)/100.
  // var treble  = fft.getEnergy("treble")
  // treble = round(100*treble)/100.
  //
  // text(bass    ,100,140)
  // text(lowMid  ,100,160)
  // text(mid     ,100,180)
  // text(highMid ,100,200)
  // text(treble  ,100,220)

  // var freq = map(mouseX,-10,width+20,0,2000);
  // freq = round(100*freq)/100.
  // text(str(freq)+" Hz",100,250)
  // text(fft.getEnergy(freq),100,270)

  noFill();
  stroke(0,255,0);
  beginShape();
  for(var i=0; i<levels.length; i++){
    var x = map(i,0,N,0,width);
    var y = map(levels[i],0,1,0,height);
    vertex(x,y);
  }
  endShape();

  noFill();
  stroke(255,0,0);
  beginShape();
  var m = spectrum.length;
  for(var i=0; i<m; i++){
    var x = map(i,0,m,0,width);
    var y = map(spectrum[i],-1,256,0,height);
    vertex(x,y);
  }
  endShape();



}
