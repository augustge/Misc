
var framecount = 0;
var C;
var r;
function setup(){
  C = createCanvas(windowWidth, windowHeight);
  r = rect(50,50,100,100)
}


function draw(){
  background(255)

  r.display()
  // r.x += 1;
  // r.y += 1;
  // r.display()
  // saveFrame()
}

function saveFrame(){
  saveCanvas(C, 'img'+str(framecount.pad(10)), 'jpg');
  framecount++;
}

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}


function RECT(x,y,w,h){
  this.x = x
  this.y = y
  this.w = w
  this.h = h
  this.rotation = 0
  this.strokecolor = color("rgb(69, 59, 61)");
  this.fillcolor = color("rgb(166, 121, 61)");

  this.rotate = function(dt){
    this.rotation += dt;
  }

  this.display = function(){
    stroke(this.strokecolor)
    fill(this.fillcolor)
    translate(this.x,this.y)
    rotate(this.rotation)
    rect(0,0,this.w,this.h)
  }
}
