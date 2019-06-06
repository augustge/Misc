
var Ntimesteps = 20;
var Ntones     = 30;
var beatCount  = 200;
var notesheet, beat;

var tonenames = { "."     : 0.0,
                  "C"     : 261.63,
                  "C#"    : 277.18,
                  "D"     : 293.66,
                  "D#"    : 311.13,
                  "E"     : 329.63,
                  "F"     : 349.23,
                  "F#"    : 369.99,
                  "G"     : 392.00,
                  "G#"    : 415.30,
                  "A"     : 440.00,
                  "A#"    : 466.16,
                  "B"     : 493.88,
                  "H"     : 493.88}

var osc, envelope, fft;
var note = 0;

var OSCILLATORS = []; //
var ENVELOPES   = []; // durations

var showText = "HELLO";
var toneUp = 1.0594630943592953;
var player;

function setup() {
  createCanvas(windowWidth,windowHeight);

  notesheet = new Notesheet(Ntimesteps,Ntones,50,50,width-50,height-50);

  fft = new p5.FFT();
  noStroke();
}


function draw() {
  background(0);

  // plot FFT.analyze() frequency analysis on the canvas
  var spectrum = fft.analyze();
  noStroke();
  for (var i = 0; i < spectrum.length/20; i++) {
    fill(spectrum[i]/3.,0,0);
    var x = map(i, 0, spectrum.length/20, 0, width);
    var h = map(spectrum[i], 0, 255, 0, 0.8*height);
    rect(x, height, spectrum.length/40, -h);
  }

  var t = frameCount%beatCount;
  var Wpos = notesheet.x0+(notesheet.x1-notesheet.x0)*t/beatCount;

  newBeat = int(Wpos/notesheet.dx)-1;
  notesheet.display();
  if(newBeat!=beat){
    if(newBeat>=0 && newBeat<notesheet.Ntime){
      notesheet.playBeat(newBeat,beat);
    }
  }
  beat = newBeat;



  stroke(255);
  fill(255);
  text(showText+"-->"+str(beat),width/2,height/2);

}





function Entry(timestep_i,frequency_i,posX,posY){
  this.timestep_i   = timestep_i
  this.frequency_i  = frequency_i
  this.posX         = posX;
  this.posY         = posY;
  this.active       = false;

  this.osc = new p5.SinOsc(0.25*440*pow(toneUp,this.frequency_i));
  this.envelope = new p5.Env(); // Instantiate the envelope
  this.envelope.setADSR(0.01, 0.1, 0.9, 0.5); // set attackTime, decayTime, sustainRatio, releaseTime
  // set attackLevel, releaseLevel
  this.envelope.setRange(1, 0);
  // this.osc.freq(0.25*440*pow(toneUp,frequency_i));
  // this.osc.amp(this.envelope);
  // this.envelope.scale(0.4);
  this.duration = 0.01;

  this.toggleActive = function(){
    this.active = !this.active;
    if (this.active){
      this.osc.start();
    }else{
      this.osc.stop();
    }
  }

  this.display = function(dx,dy){

    if(this.active){
      fill(0,255,0);
      var dr = 0.05*dx;
    }else{
      fill(255,50);
      var dr = 0.15*dx;
    }
    if(this.timestep_i==beat){
      fill(255);
    }
    rect(this.posX+dr,this.posY+dr,dx-2*dr,dy-2*dr);
  }

  this.setADSR = function(A,D,S,R){
    this.envelope.setADSR(A,D,S,R);
  }

  this.setDuration = function(duration){
    this.duration = duration
  }

  this.playtone = function(){
    // this.envelope.setADSR(0,0,0.9,0.2);
    this.envelope.play(this.osc,0.0,this.duration);
  }
}





function Notesheet(Ntime,Nnotes,x0,y0,x1,y1){

  this.timestepsPerWindow = 20.0;

  this.Ntime  = Ntime;
  this.Nnotes = Nnotes;

  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
  var dx = (x1-x0)/(this.timestepsPerWindow)
  var dy = (y1-y0)/(float(this.Nnotes))
  this.dx = dx;
  this.dy = dy;


  this.ENTRIES = [];
  for (var x = 0; x < this.Ntime; x++) {
    this.ENTRIES[x] = []; // create nested array
    for (var y = 0; y < this.Nnotes; y++) {
      this.ENTRIES[x][y] = new Entry(x,y,this.x0+x*this.dx,this.y0+y*this.dy);
    }
  }

  this.playBeat = function(beat,prevBeat){
    for (var y = 0; y < this.Nnotes; y++) {
      if(this.ENTRIES[prevBeat][y].active){
        this.ENTRIES[beat][y].playtone();
      }
    }
  }

  this.display = function(){
    noStroke();
    fill(255);
    for (var x = 0; x < this.Ntime; x++) {
      for (var y = 0; y < this.Nnotes; y++) {
        this.ENTRIES[x][y].display(this.dx,this.dy);
      }
    }
  }

  this.mousePressed = function(X,Y){
    var i = int((X-this.x0)/dx);
    var j = int((Y-this.y0)/dy);
    if(i>=0 && j>=0 && i<this.Ntime && j<this.Nnotes
      && X>=this.x0 && X<=this.x1 && Y>=this.y0 && Y<=this.y1){
      this.ENTRIES[i][j].toggleActive();
    }
  }

}


function mousePressed(){
  notesheet.mousePressed(mouseX,mouseY);
}


function keyPressed(){
  showText = str(keyCode)
}
