

var N     = 200;
var dt    = 0.1;

var rot  = 0;
var rotV = 0.01;
var rotAxis = [0,1,0];
var t     = 0;

var box;

function setup() {
  createCanvas(windowWidth, windowHeight,WEBGL);
  // ortho(-width, width, height, -height/2, 0.1, 100);
  var fov = 60 / 180 * PI;
  var cameraZ = (height/2.0) / tan(fov/2.0);
  // perspective(60 / 180 * PI, width/height, cameraZ * 0.1, cameraZ * 10);

  var L = 300
  box = new Box(-L,L,-L,L,-L,L);
  var v = 30;
  for(var i=0; i<N; i++){
    var x = random(box.bdm[0],box.bdM[0]);
    var y = random(box.bdm[1],box.bdM[1]);
    var z = random(box.bdm[2],box.bdM[2]);
    var vx = random(-v,v);
    var vy = random(-v,v);
    var vz = random(-v,v);
    box.addBoid(x,y,z,vx,vy,vz,5);
  }

}

function draw() {
    // background(0);
    camera(0,0,0);

    t += 0.1
    // lights();

    rot  += rotV*dt;
    // rotV /= 1.1;
    // rotVY /= 1.1;

    rotate(rot,rotAxis);

    box.do();

}

function Box(xm,xM,ym,yM,zm,zM){
  this.boids  = [];
  this.bdm    = [xm,ym,zm];
  this.bdM    = [xM,yM,zM];
}

Box.prototype.addBoid = function(x,y,z,vx,vy,vz,R){
  this.boids.push(new Boid(x,y,z,vx,vy,vz,R));
}

Box.prototype.do = function(){
  strokeWeight(40);
  stroke(0);
  for(var i=0; i<this.boids.length; i++){
    this.boids[i].evolve();
    this.boids[i].show();
    for(var k=0; k<3; k++){
      if(this.boids[i].r[k]<this.bdm[k]){
        this.boids[i].r[k]   = this.bdm[k];
        this.boids[i].v[k] *= -1;
      }else if(this.boids[i].r[k]>this.bdM[k]){
        this.boids[i].r[k]   = this.bdM[k];
        this.boids[i].v[k] *= -1;
      }
    }
    for(var j=0; j<this.boids.length; j++){
      if(i!=j){
        var r = sq(this.boids[i].r[0]-this.boids[j].r[0])+sq(this.boids[i].r[1]-this.boids[j].r[1])+sq(this.boids[i].r[2]-this.boids[j].r[2]);
        if(r < sq(100)){
          beginShape(LINES);
          vertex(this.boids[i].r[0],this.boids[i].r[1],this.boids[i].r[2]);
          vertex(this.boids[j].r[0],this.boids[j].r[1],this.boids[j].r[2]);
          endShape();
        }
      }
    }
  }
}


function Boid(x,y,z,vx,vy,vz,R){
  this.R = R;
  this.r = [x,y,z];
  this.v = [vx,vy,vz];
}

Boid.prototype.evolve = function(){
  for(var k=0; k<3; k++){
    this.r[k] += this.v[k]*dt;
  }
}

Boid.prototype.show = function(){
  push();
  translate(this.r[0],this.r[1],this.r[2]);
  sphere(this.R);
  pop();
}


function keyPressed() {
  if(keyCode==37){ // left
    rotV -= 0.1;
  }
  if(keyCode==39){ // right
    rotV += 0.1;
  }
  if(keyCode==38){ // up
    rotAxis[1] -= 0.1;
  }
  if(keyCode==40){ // down
    rotAxis[1] += 0.1;
  }

}



//
