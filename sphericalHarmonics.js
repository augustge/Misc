

var N     = 200;
var dt    = 0.1;

var rot  = 0;
var rotV = 0.01;
var rotAxis = [0,1,0];
var t     = 0;

var CONTAINER;

function setup() {
  createCanvas(windowWidth, windowHeight,WEBGL);
  // ortho(-width, width, height, -height/2, 0.1, 100);
  var fov = 60 / 180 * PI;
  var cameraZ = (height/2.0) / tan(fov/2.0);
  // perspective(60 / 180 * PI, width/height, cameraZ * 0.1, cameraZ * 10);

  CONTAINER = new Container(10,10);


}

function draw() {
  background(0);
  camera(0,0,-500);
  t += 0.1
  // lights();
  rot  += rotV*dt;
  // rotV /= 1.1;
  // rotVY /= 1.1;


  rotate(rot,rotAxis);

  CONTAINER.display(width/2,height/2,100,10)

}



function Container(Nx,Ny){
  this.Nx = Nx;
  this.Ny = Ny;
  this.M = new Array(this.Nx);
  for(var i=0; i<Nx; i++){
    this.M[i] = new Array(this.Ny);
    for(var j=0; j<Ny; j++){
      this.M[i][j] = sin(0.01*i)*cos(0.1*i-0.2*j);
    }
  }

  this.display = function(cx,cy,dr,dh){
    var h0 = 10;
    for(var i=0; i<Nx; i++){
      for(var j=0; j<Ny; j++){
        fill(200)
        translate(cx+2*i*dr,cy+2*j*dr,-500)
        cylinder(dr, h0+this.M[i][j]*dh);
        resetMatrix();
      }
    }
  }

}




function keyPressed() {
  print(keyCode)
  if(keyCode==37){ // left
    rotV -= 0.2;
  }
  if(keyCode==39){ // right
    rotV += 0.2;
  }
  if(keyCode==38 && keyCode==91){ // up + cmd
    rotAxis[1] -= 0.2;
  }else if(keyCode==38){
    rotAxis[0] -= 0.2;
  }
  if(keyCode==40 && keyCode==91){ // down + cmd
    rotAxis[1] += 0.2;
  }else if(keyCode==40){
    rotAxis[0] += 0.2;
  }

}



//
