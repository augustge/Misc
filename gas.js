
var Nparticles = 1000;
var Rparticle = 3;
var dt = 1.0;

var camZ = 0;
var camVZ = 0;
var rot1 = 0
var rotV1 = 0;

var t = 0;

var PARTICLES = [];
var BOX;

function setup(){
  createCanvas(windowWidth, windowHeight,WEBGL);
  var fov = 60 / 180 * PI;
  // var cameraZ = (height/2.0) / tan(fov/2.0);

  BOX = new Box(200,500,500);

  for(var i=0; i<Nparticles; i++){
    var x = random(BOX.L[0]);
    var y = random(BOX.L[1]);
    var z = random(BOX.L[2]);
    var vx = random(1);
    var vy = random(1);
    var vz = random(1);
    PARTICLES.push(new Particle(x,y,z,vx,vy,vz,Rparticle));
  }
}

function draw(){
  t += 0.1;
  camZ += camVZ*dt;
  camVZ /= 1.05;
  rot1 += rotV1*dt;
  rotV1 /= 1.05;

  // ambientLight(100,200,100);
  directionalLight(150,150,150, 0,0, 1)
  translate(-BOX.L[0]/2,-BOX.L[1]/2);
  rotate(rot1,[0,1,0]);
  camera(mouseX-width/2,mouseY-height/2,camZ);

  // background(0);

  for(var i=0; i<PARTICLES.length; i++){
    PARTICLES[i].move(dt);
    PARTICLES[i].collide();
    PARTICLES[i].show();
  }

  BOX.show();

}

function Particle(x,y,z,vx,vy,vz,R){
  this.connectivity = 1;
  this.R = R;
  this.r = [x,y,z];
  this.v = [vx,vy,vz];
}

Particle.prototype.move = function(dt){
  for(var i=0; i<3; i++){
    this.r[i] += this.v[i]*dt;
  }
}

Particle.prototype.collide = function(){
  for(var i=0; i<3; i++){
    if(this.r[i]> BOX.L[i]){
      this.r[i] = BOX.L[i];
      this.v[i] *= -1;
    }else if(this.r[i]< 0){
      this.r[i] = 0;
      this.v[i] *= -1;
    }
  }
}

Particle.prototype.show = function(){
  push();
  translate(this.r[0],this.r[1],this.r[2]);
  sphere(this.R);
  pop();
}

// =====================================
function Box(Lx,Ly,Lz){
  this.L = [Lx,Ly,Lz]
}

Box.prototype.show = function(){
  fill(255,0,0,100);
  push();
  translate(BOX.L[0]/2,BOX.L[1]/2,BOX.L[2]/2);
  box(BOX.L[0]);
  pop();

  // beginShape(TRIANGLE_STRIP);
  // vertex( 0, 0, 0);
  // vertex( 0, BOX.L[1], 0);
  // vertex( BOX.L[0], BOX.L[1], 0);
  // vertex( BOX.L[0], 0, 0);
  // vertex( 0, 0, 0);
  // endShape();
  //
  // fill(0,255,0,100);
  // beginShape(TRIANGLE_STRIP);
  // vertex( 0, 0, BOX.L[2]);
  // vertex( 0, BOX.L[1], BOX.L[2]);
  // vertex( BOX.L[0], BOX.L[1], BOX.L[2]);
  // vertex( BOX.L[0], 0, BOX.L[2]);
  // vertex( 0, 0, BOX.L[2]);
  // endShape();
  //
}


// ====================================
function keyPressed(){
  if(keyCode==38){ // up
    camVZ += 5;
  }
  if(keyCode==40){ // down
    camVZ -= 5;
  }
  if(keyCode==37){ // left
    rotV1 -= 0.01;
  }
  if(keyCode==39){ // right
    rotV1 += 0.01;
  }
}
