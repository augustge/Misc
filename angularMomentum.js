
var t  = 1;
var dt = 0.0005;
var scale;
var play  = false;
var mass  = 300;
var object;

var backgroundColor, groundColor, boxColor, color1, color2;
var canvas;

var circle;

var OBJECTS = [];

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  // pixelDensity(1);
  scale = 8.0;
  setColors();
  makeSliders();

  object = new Object();

  makeCircle(width/2,height/2,100,mass);
}




function draw() {
    background(backgroundColor);


    // adjustToSlidervalues();

    for(var j=0; j<OBJECTS.length; j++){
      if(play){OBJECTS[j].evolve();}
      OBJECTS[j].showShape();
    }
    if(play){
      object.evolve();
    }
    object.show();


    showControlpanel();


}





function Object(){
  this.L = 100000.0
  this.r = []; // positions
  this.m = []; // mass
  this.d = []; // diameters
  this.R = [0,0];
  this.I = 0.1;
  this.M = mass;
}


Object.prototype.addPoint = function(x,y,m){
  this.r.push([x,y]);
  this.m.push(m);
  var d = 10*sqrt(m);
  this.d.push(d)
  this.refreshCenterOfMass();
  this.adjustToGlobalMass();
  this.calculateInertia();
}

Object.prototype.refreshCenterOfMass = function(){
  var Rcm  = [0.0,0.0];
  var Mtot = 0.0;
  for(var i=0; i<this.m.length; i++){
    Rcm[0] += this.m[i]*this.r[i][0];
    Rcm[1] += this.m[i]*this.r[i][1];
    Mtot   += this.m[i];
  }
  this.R[0] = Rcm[0]/Mtot;
  this.R[1] = Rcm[1]/Mtot;
  this.M    = Mtot;
}

Object.prototype.adjustToGlobalMass = function(){
  var mPerPoint = mass/this.M;
  for(var i=0; i<this.m.length; i++){
    this.m[i] = mPerPoint;
  }
  this.M = mass;
}

Object.prototype.calculateInertia = function(){
  var I = 0;
  for(var i=0; i<this.r.length; i++){
    var distSq = sq(this.r[i][0]-this.R[0])+sq(this.r[i][1]-this.R[1]);
    I += this.m[i]*distSq;
  }
  this.I = I;
}

Object.prototype.evolve = function(){
  var w = 2*this.L/this.I*dt;
  for(var i=0; i<this.r.length; i++){
    // rotate by w
    xnew =  (this.r[i][0]-this.R[0])*cos(w) + (this.r[i][1]-this.R[1])*sin(w);
    ynew = -(this.r[i][0]-this.R[0])*sin(w) + (this.r[i][1]-this.R[1])*cos(w);
    this.r[i][0] = xnew + this.R[0];
    this.r[i][1] = ynew + this.R[1];
  }
}

Object.prototype.show = function(){
  noStroke();
  fill(boxColor);
  for(var i=0; i<this.r.length; i++){
    ellipse(scale*this.r[i][0],scale*this.r[i][1],this.d[i],this.d[i]);
  }
  fill(color2);
  ellipse(scale*this.R[0],scale*this.R[1],10,10);

  stroke(255);
  noFill();
  text(      this.M, scale*this.R[0], scale*this.R[1]);
  text( int(this.I), scale*this.R[0], scale*this.R[1]+10);
}

Object.prototype.showShape = function(){
  fill(boxColor);
  stroke(color1);
  beginShape();
  for(var i=0; i<this.r.length; i++){
    vertex(scale*this.r[i][0],scale*this.r[i][1]);
    vertex(scale*this.R[0]   ,scale*this.R[1]);
    vertex(scale*this.r[i][0],scale*this.r[i][1]);
  }
  endShape(CLOSE);
  fill(color2);
  ellipse(scale*this.R[0],scale*this.R[1],10,10);

  stroke(255);
  noFill();
  text(this.M,scale*this.R[0],scale*this.R[1]);
  text(int(this.I),scale*this.R[0],scale*this.R[1]+10);
}




function makeCircle(x,y,R,M){
  var N     = 30;
  var obj   = new Object();
  var m     = M/float(N);
  var dt    = 2*PI/N;
  for(var t=0; t<2*PI; t+=dt){
    var X = x + R*cos(t);
    var Y = y + R*sin(t);
    obj.addPoint(X/scale,Y/scale,m);
  }
  obj.I = M*sq(R/scale)/4.;
  obj.M = M;
  OBJECTS.push(obj);
}




function adjustToSlidervalues(){

}




// =============================
function setColors(){
  backgroundColor = color("#E3CDA4");
  groundColor     = color("#C77966");
  boxColor        = color("#2F343B");
  color1          = color("#7E827A");
  color2          = color("#703030");
}

function makeSliders(){
  // SLIDERTEXTS.push("Timestep\n(exp)");
  // SLIDERS.push(createSlider(-6, -1, -1, 0.01).class("terminatorSlider"));
}


// -----------------------------------------------------------------------------

function showControlpanel(){
  fill(0);
  noStroke();

}

function mouseDragged(){
  if(!play){
    object.addPoint(mouseX/scale,mouseY/scale,0.5);
  }
}


function keyPressed(){
  if(keyCode==32){
    play = !play;
  }
}




// -----------------------------------------------------------------------------
window.onresize = resize;

function resize() {
  canvas.size(windowWidth,windowHeight);
}





//
