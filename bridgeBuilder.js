
var bridge;

function setup(){
  canvas = createCanvas(windowWidth,windowHeight);

  c1 = color("rgb(47, 52, 59)");
  c2 = color("rgb(166, 121, 61)");
  c3 = color("rgb(255, 149, 11)");
  c4 = color("rgb(199, 121, 102)");
  c5 = color("rgb(227, 205, 164)");
  c6 = color("rgb(112, 48, 48)");
  c7 = color("rgb(126, 130, 122)");
  c8 = color("rgb(247, 239, 246)");
  c9 = color("rgb(196, 196, 189)");
  c10= color("rgb(86, 190, 215)");
  c11= color("rgb(212, 50, 21)");
  c12= color("rgb(69, 59, 61)");
  c13= color("rgb(255, 0, 0)");
  c14= color("rgb(255, 149, 11)");

  backgroundColor  = c1;
  strokeColor      = c10;

  bridge = new Bridge();

}


function draw(){
  background(backgroundColor);

}

// =============================================================================
function Bridge(){

}

// =============================================================================
function Part(x0,y0,x1,y1){
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.x2 = x2;
}

Part.prototype.show = function(){
  line(this.x0,this.y0,this.x1,this.y1);
}
