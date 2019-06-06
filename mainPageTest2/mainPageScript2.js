//


var N     = 50;
var dt    = 0.1;
var v     = 10;
var box;
var C1,C2;

function setup() {
  canvas = createCanvas(0.9*windowWidth,0.9*windowHeight);
  canvas.parent('Basic');
  canvas.style("z-index","-1");
  blendMode(MULTIPLY);

  C1 = color(100,100,100,50);
  C2 = color(100,100,100,50);

  box = new Box(0,width,0,height);

  for(var i=0; i<N; i++){
    var x = random(box.bdm[0],box.bdM[0]);
    var y = random(box.bdm[1],box.bdM[1]);
    var vx = random(-v,v);
    var vy = random(-v,v);
    box.addBoid(x,y,vx,vy,30);
  }
  fill(C1);
  stroke(C2);
  strokeWeight(2);

}

function draw() {
  clear();
  box.do();
}

function Box(xm,xM,ym,yM){
  this.boids  = [];
  this.bdm    = [xm,ym];
  this.bdM    = [xM,yM];
}

Box.prototype.addBoid = function(x,y,vx,vy,R){
  this.boids.push(new Boid(x,y,vx,vy,R));
}

Box.prototype.do = function(){
  for(var i=0; i<this.boids.length; i++){
    this.boids[i].evolve();
    this.boids[i].show();
    for(var k=0; k<2; k++){
      if(this.boids[i].r[k]<this.bdm[k]){
        this.boids[i].r[k]   = this.bdm[k];
        this.boids[i].v[k] *= -1;
      }else if(this.boids[i].r[k]>this.bdM[k]){
        this.boids[i].r[k]   = this.bdM[k];
        this.boids[i].v[k] *= -1;
      }
    }
    for(var j=0; j<i; j++){
        var r = sq(this.boids[i].r[0]-this.boids[j].r[0])+sq(this.boids[i].r[1]-this.boids[j].r[1]);
        if(r < sq(100)){
          stroke(C2);
          line(this.boids[i].r[0],this.boids[i].r[1],this.boids[j].r[0],this.boids[j].r[1]);
        }
    }
  }
}


function Boid(x,y,vx,vy,R){
  this.R = R;
  this.r = [x,y];
  this.v = [vx,vy];
}

Boid.prototype.evolve = function(){
  for(var k=0; k<2; k++){
    this.r[k] += this.v[k]*dt;
  }
  dX = this.r[0]-mouseX
  dY = this.r[1]-mouseY
  dR = sq(dX)+sq(dY)
  if (dR>sq(100)){
    aX = -width*dX/dR * exp(-0.03*dR/width)
    aY = -width*dY/dR * exp(-0.03*dR/width)
  }else{
    aX = random(-v,v)
    aY = random(-v,v)
  }
  this.v[0] = this.v[0] + aX*dt
  this.v[1] = this.v[1] + aY*dt
  // normalize
  Vlen = sqrt( sq(this.v[0])+sq(this.v[1]) )
  this.v[0] = v*this.v[0]/Vlen
  this.v[1] = v*this.v[1]/Vlen

}

Boid.prototype.show = function(){
  noStroke();
  ellipse(this.r[0],this.r[1],this.R,this.R);
}






//


//
