
var t = 0;

function setup(){
  canvas = createCanvas(windowWidth,windowHeight);
  canvas.parent('myContainer');
  // canvas.position(0,0);
}

function draw(){
  // background(0,100);
  t += 1;

  ellipse(mouseX,mouseY,50,50);
}
