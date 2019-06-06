var rM    = 300;
var b     = 5;
var frak  = 0.8;
var H;
var activeMouse = true;

function setup(){
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB,100);
  H = new Harmonics();
}

function draw(){
  translate(width/2,height/2)
  background(0);

  noStroke();
  var r = 0;
  var t = 0;
  var dt = 1.6180339887*2*PI;
  while(r<rM){
    var c = getColor(r,t,rM);
    fill(c)
    ellipse(r*cos(t),r*sin(t),2*b,2*b);
    t += dt;
    r = frak*b*sqrt(t/dt);
  }
  noFill();
  stroke(0);
  strokeWeight(2*b);
  ellipse(0,0,2*rM,2*rM);

  // doMouse();

  if(activeMouse){
    var arr = getMousePos();
    H.flush();
    H.chooseColors(arr[0],arr[1]);
  }
  H.displayColors()


}


function Harmonics(){
  this.Cs = [];

  this.flush = function(){
    this.Cs = [];
  }

  this.addColor = function(r,t){
    this.Cs.push(getColor(r,t,rM));
  }

  this.chooseColors = function(r0,t0){
    // this.triad(r0,t0);
    this.quintad(r0,t0)
    // this.irrationalC(r0,t0);
  }

  this.triad = function(r0,t0){
    var Cs = [];
    dt = 2*PI/3.
    this.addColor(r0,t0)
    this.addColor(r0,t0+dt)
    this.addColor(r0,t0+2*dt)
    this.displayColors();
  }

  this.quintad = function(r0,t0){
    var Cs = [];
    dt = 2*PI/5.
    this.addColor(r0,t0)
    this.addColor(r0,t0+dt)
    this.addColor(r0,t0+2*dt)
    this.addColor(r0,t0+3*dt)
    this.addColor(r0,t0+4*dt)
    this.displayColors();
  }

  this.irrationalC = function(r0,t0){
    var Cs = [];
    var f = 1.6180339887;
    dt = 2*PI/f;
    this.addColor(r0,t0);
    this.addColor(r0,t0+dt);
    this.addColor(r0/f,t0+2*dt);
    this.addColor(r0/f/f,t0+4*dt);
    this.addColor(r0/f/f/f,t0+5*dt);
    this.displayColors();
  }

  this.displayColors = function(){
    var dS = 2*rM/(this.Cs.length);
    for(var i=0; i<this.Cs.length; i++){
      var Ri = rM*saturation(this.Cs[i])/100.;
      var Ti = 2*PI*hue(this.Cs[i])/100;
      stroke(0);
      strokeWeight(2);
      fill(this.Cs[i])
      line(0,0,Ri*cos(Ti),Ri*sin(Ti));
      ellipse(Ri*cos(Ti),Ri*sin(Ti),10*b,10*b);
      fill(this.Cs[i]);
      rect(1.1*rM,(i-this.Cs.length/2)*dS,rM,dS)
    }
  }
}


function doMouse(){
  var arr = getMousePos();
  R = arr[0];
  T = arr[1];
  if(R<rM){
    var C = getColor(R,T,rM);
    stroke(255);
    strokeWeight(2);
    fill(C)
    line(0,0,R*cos(T),R*sin(T));
    ellipse(R*cos(T),R*sin(T),10*b,10*b);
    noStroke();
    fill(0);
    textAlign(CENTER)
    var textD = "("+str(round(red(C)))+","+str(round(green(C)))+","+str(round(blue(C)))+")";
    text(textD,R*cos(T),R*sin(T))
    return C;
  }else{
    return null;
  }
}

function getMousePos(){
  var X = mouseX-width/2;
  var Y = mouseY-height/2;
  var T = atan2(Y,X)+2*PI;
  var R = sqrt(sq(X)+sq(Y));
  return [R,T];
}

function getColor(r,t,rM){
  var H = 100*(t%(2*PI))/(2*PI);
  var S = 100*(r/rM);
  var B = 100;
  return color(H,S,B)
}

function mousePressed(){
  activeMouse = !activeMouse;
}
