

var s = 5;
var t = 0;
var X = 0;
var Y = 0;
var scalefac = 1.0;
var pattern;

function setup(){
  createCanvas(windowWidth, windowHeight);
  pattern = createGraphics(height,height);
  // drawSquarePattern();
  drawTriangularPattern();
}

function draw(){
  background(255);
  translate(width/2,height/2)
  image(pattern,  -pattern.width/2, -pattern.height/2);
  translate(X,Y)
  scale(scalefac)
  rotate(t)
  // translate(-width/2,-height/2)
  image(pattern, -pattern.width/2, -pattern.height/2);


}

function drawSquarePattern(){
  var N = 2*int(width/s);
  pattern.noStroke();
  pattern.fill(0)
  for(var i=-N; i<N; i++){
    for(var j=-N; j<N; j++){
      if((i+j)%2==0){
        pattern.beginShape();
        vertex(i*s,j*s);
        vertex(i*s,(j+1)*s);
        vertex((i+1)*s,(j+1)*s);
        vertex((i+1)*s,j*s);
        pattern.endShape(CLOSE);
      }
    }
  }
}

function drawTriangularPattern(){
  var N = 2*int(width/s);
  pattern.noStroke();
  pattern.fill(0)
  for(var i=-N; i<N; i++){
    for(var j=-N; j<N; j++){
      // if((i+j)%2==0){
        var jp = sqrt(3)/2*j
        var ip = i+(j%2)/2
        pattern.beginShape();
        vertex((ip+1/2)*s,(jp-1/2/sqrt(3))*s);
        vertex((ip-1/2)*s,(jp-1/2/sqrt(3))*s);
        vertex(ip*s,(jp+1/sqrt(3))*s);
        pattern.endShape(CLOSE);
      // }
    }
  }
}

function mouseDragged(){
  var dx = mouseX-pmouseX;
  var dy = mouseY-pmouseY;
  if(keyIsDown(32)){
    X += dx;
    Y += dy;
  }else{
    var dxm = mouseX-width/2
    var dym = mouseY-height/2
    var dyL = sqrt(sq(dxm)+sq(dym))
    dxm = dxm/dyL
    dym = dym/dyL
    dt = dy*dxm - dx*dym
    t += 0.01*dt
  }
}

function mousePressed(){
  print(mouseButton)
}

function keyPressed(){
  print(keyCode);
  if(keyCode==38){ // up
    scalefac *= 1.1;
  }
  if(keyCode==40){ // down
    scalefac /= 1.1;
  }
}
