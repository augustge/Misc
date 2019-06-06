
var t = 1;
var Nx = 200;
var Ny = 100;

var n = 0;

var xi = -2.0;
var xf =  2.0;
var yi = -2.0;
var yf =  2.0;

var Sxi,Sxf,Syi,Syf;

var a = 0.0;
var b = 0.0;
var c = 1.0;
var d = 0.0;

var xSpan = xf-xi;
var ySpan = yf-yi;

var P  = new Array(Nx);
var P0 = new Array(Nx);
var Pt = new Array(Nx);

function setup() {
  createCanvas(windowWidth, windowHeight);

  for(var i=0; i<Nx; i++){
    P[i]  = new Array(Ny);
    P0[i] = new Array(Ny);
    Pt[i] = new Array(Ny);
    for(var j=0; j<Ny; j++){
      P[i][j]   = new Array(2);
      P0[i][j]  = new Array(2);
      Pt[i][j]  = new Array(2);
    }
  }

  Sxi = -n*width;
  Sxf = width+n*width;
  Syi = -n*height;
  Syf = height+n*height;

  setUpInitialPoints();
  preCalculate();
  slider  = createSlider(0, 1, 0.5, 0.01);
  sliderA = createSlider(0, 2, 0.0, 0.01);
  sliderB = createSlider(0, 2, 1.0, 0.01);
  sliderC = createSlider(0, 2, 1.0, 0.01);
  sliderD = createSlider(0, 2, 0.0, 0.01);
}

function draw() {
    background(255);
    stroke(100);

    t = slider.value()

    a = sliderA.value()
    b = sliderB.value()
    c = sliderC.value()
    d = sliderD.value()


    for(var i=0; i<Nx; i++){
      for(var j=0; j<Ny; j++){
        P[i][j][0] = fx(P0[i][j][0],P0[i][j][1]);
        P[i][j][1] = fy(P0[i][j][0],P0[i][j][1]);
        Pt[i][j][0] = P0[i][j][0] + t*(P[i][j][0]-P0[i][j][0]);
        Pt[i][j][1] = P0[i][j][1] + t*(P[i][j][1]-P0[i][j][1]);
      }
    }

    noFill();
    // verticals
    for(var i=0; i<Nx; i++){
      if(i%5==0){
        stroke(100);
      }else{
        stroke(100,30);
      }

      beginShape();
      for(var j=0; j<Ny; j++){
        vertex(xToPixel(Pt[i][j][0]),yToPixel(Pt[i][j][1]));
      }
      endShape();
    }

    // horizontals
    for(var j=0; j<Ny; j++){
      if(j%5==0){
        stroke(100);
      }else{
        stroke(100,30);
      }

      beginShape();
      for(var i=0; i<Nx; i++){
        vertex(xToPixel(Pt[i][j][0]),yToPixel(Pt[i][j][1]));
      }
      endShape();
    }


    drawControls();

}





function setUpInitialPoints(){
  for(var i=0; i<Nx; i++){
    for(var j=0; j<Ny; j++){
      P0[i][j][0] = indexToX(i);
      P0[i][j][1] = indexToY(j);
    }
  }
}

function preCalculate(){
  for(var ti=0; ti<1; ti+=0.01){

  }
}

function drawControls(){
  resetMatrix();
  stroke(0);
  fill(0);

  textSize(20);
  text("Displaying z+t(f(z)-z) for f(z)=(az+b)/(cz+d)",20,20);

  textSize(12);
  text("t",30 ,55);
  text( t ,180,55);
  slider.position(50, 50);



  text("a",30 ,85);
  text( a ,180,85);
  sliderA.position(50, 80 );
  text("b",30 ,105);
  text( b ,180,105);
  sliderB.position(50, 100);
  text("c",30 ,125);
  text( c ,180,125);
  sliderC.position(50, 120);
  text("d",30 ,145);
  text( d ,180,145);
  sliderD.position(50, 140);
}

//
function fx(x,y){
  return ((c*x+d)*(c*x+d)+a*c*sq(y))/(sq(c*x+d)+sq(c*y));
}

function fy(x,y){
  return ((c*x+d)*a*y-(a*x+b)*c*y)/(sq(c*x+d)+sq(c*y));
}
//
function indexToX(i){
  return xi+i*xSpan/Nx;
}

function indexToY(j){
  return yi+j*ySpan/Ny;
}

function xToPixel(x){
  return Sxi + (Sxf-Sxi)/xSpan * (x-xi);
}

function yToPixel(y){
  return Syi + (Syf-Syi)/ySpan * (y-yi);
}



//
//
// function mousePressed(){
//
//
// }
//
//
// function keyPressed() {
//
// }







//
