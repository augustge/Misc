

var dt = 0.5;
var T = 0.01;
var t = 0;
var grid;



function setup(){
  canvas = createCanvas(windowWidth,windowHeight);

  c1 = color("#2F343B");
  c2 = color("#A6793D");
  c3 = color("#FF950B");
  c4 = color("#C77966");
  c5 = color("#E3CDA4");
  c6 = color("#703030");
  c7 = color("#7E827A");
  c8 = color("#F7EFF6");
  c9 = color("#C4C4BD");
  c10= color("#56BED7");
  c11= color("#D43215");
  c12= color("#453B3D");
  c13= color("#FF0000");
  c14= color("#FF950B");

  backgroundColor  = c1;
  strokeColor      = c10;

  grid = new Grid(100,100,50,10,10);
  // grid.makeRandomPathStart([0,0],[0,10]);
  grid.makeRandomPathBetween([0,0],[55,55]);

  // frameRate(2);
}


function draw(){
  background(backgroundColor);
  t += 1;

  // for(var k=0; k<1000; k++){
    grid.metropolis();
  // }

  grid.showPath(width/2,height/2,0.8*width,0.8*height,c10);

  fill(c14)
  noStroke();
  ellipse(mouseX,mouseY,30,30)
}

// =============================================================================
function Grid(Nx,Ny,Nt,W,H){
  this.Nx = Nx
  this.Ny = Ny
  this.Nt = Nt
  this.W = W;
  this.H = H;
  this.dt = T/(this.Nt-1)
  this.sigma = 10;

  this.G = new Array(Nx);
  // make path
  this.P = new Array(Nt+1);
  this.NotUpdate = [];

  // make index array
  this.Ix = new Array(Nx);
  this.Iy = new Array(Ny);
  for(var i=0; i<Nx; i++){this.Ix[i] = i;}
  for(var i=0; i<Ny; i++){this.Iy[i] = i;}
}

Grid.prototype.x = function(i){
  return map(i,0,this.Nx,-this.W/2.,this.W/2.)
}

Grid.prototype.y = function(j){
  return map(j,0,this.Ny,-this.H/2.,this.H/2.)
}

Grid.prototype.makeRandomPathBetween = function(Pi,Pf){ // first and last point
  this.NotUpdate = [0,this.Nt]
  this.P = new Array(this.Nt+1)
  this.P[0]  = Pi
  this.P[this.Nt] = Pf
  for(var i=1; i<this.Nt; i++){
    var x = random(this.Ix);
    var y = random(this.Iy);
    this.P[i] = [x,y]
  }
}

Grid.prototype.makeRandomPathStart = function(P0,Pn){ // first and next point
  this.NotUpdate = [0,1]
  this.P = new Array(this.Nt+1)
  this.P[0]  = P0
  this.P[1]  = Pn
  for(var i=2; i<this.Nt+1; i++){
    var x = random(this.Ix);
    var y = random(this.Iy);
    this.P[i] = [x,y]
  }
}

Grid.prototype.kinetic = function(P,Pp){
  // should be opimized
  var dx = this.x(P[0]) - this.x(Pp[0])
  var dy = this.y(P[1]) - this.y(Pp[1])
  return 0.5*(sq(dx/this.dt)+sq(dy/this.dt)) //  1/2 v^2
}

Grid.prototype.potential = function(P,Pp){
  var Xm = 0.5*(this.x(P[0])+this.x(Pp[0]));
  var Ym = 0.5*(this.y(P[1])+this.y(Pp[1]));
  return this.V(Xm,Ym);
}

Grid.prototype.lagrange = function(P,Pp){
  return this.kinetic(P,Pp) - this.potential(P,Pp);
}

Grid.prototype.V = function(x,y){
  return y;
}

Grid.prototype.makeGuess = function(i,j){
    // swap to neighbour
    // var I = [[i+1,j-1],[i+1,j],[i+1,j+1],[i,j+1],[i,j-1],[i-1,j-1],[i-1,j],[i-1,j+1]]
    // var It = random(I)
    // it = It[0]; jt = It[1]
    it = int(randomGaussian(i,this.sigma))
    jt = int(randomGaussian(j,this.sigma))
    it = max([0,it]); it = min([this.Nx-1,it])
    jt = max([0,jt]); jt = min([this.Ny-1,jt])
    return [it,jt]
  // }
}

Grid.prototype.makeGuessX = function(i){
    it = int(randomGaussian(i,this.sigma))
    it = max([0,it]); it = min([this.Nx-1,it])
    return it
}

Grid.prototype.makeGuessY = function(j){
  jt = int(randomGaussian(j,this.sigma))
  jt = max([0,jt]); jt = min([this.Ny-1,jt])
  return jt
}

Grid.prototype.metropolisX = function(){
  for(var n=1; n<this.Nt+1; n++){
    if(this.NotUpdate[0] != n && this.NotUpdate[1] != n){

      var it = this.makeGuessX(this.P[n][0])
      var jt = this.P[n][1]

      var L0   = this.lagrange(this.P[n],this.P[n-1])
      var Ltry = this.lagrange(  [it,jt],this.P[n-1])
      var dL = Ltry-L0;
      if(n<this.Nt){
        L0   = this.lagrange(this.P[n+1],this.P[n])
        Ltry = this.lagrange(this.P[n+1],[it,jt])
        dL  += Ltry-L0;
      }

      if(dL<0){
        this.P[n] = [it,jt]; // accept the change
      }
  }
  }
}

Grid.prototype.metropolisY = function(){
  for(var n=1; n<this.Nt+1; n++){
    if(this.NotUpdate[0] != n && this.NotUpdate[1] != n){

      var it = this.P[n][0]
      var jt = this.makeGuessY(this.P[n][1])

      var L0   = this.lagrange(this.P[n],this.P[n-1])
      var Ltry = this.lagrange(  [it,jt],this.P[n-1])
      var dL = Ltry-L0;
      if(n<this.Nt){
        L0   = this.lagrange(this.P[n+1],this.P[n])
        Ltry = this.lagrange(this.P[n+1],[it,jt])
        dL  += Ltry-L0;
      }

      if(dL<0){
        this.P[n] = [it,jt]; // accept the change
      }
  }
  }
}

Grid.prototype.metropolis = function(){
  for(var n=1; n<this.Nt+1; n++){
    if(this.NotUpdate[0] != n && this.NotUpdate[1] != n){

      var it = this.makeGuessX(this.P[n][0])
      var jt = this.makeGuessY(this.P[n][1])

      var L0   = this.lagrange(this.P[n],this.P[n-1])
      var Ltry = this.lagrange(  [it,jt],this.P[n-1])
      var dL = Ltry-L0;
      if(n<this.Nt){
        L0   = this.lagrange(this.P[n+1],this.P[n])
        Ltry = this.lagrange(this.P[n+1],[it,jt])
        dL  += Ltry-L0;
      }

      if(dL<0){
        this.P[n] = [it,jt]; // accept the change
      }
  }
  }
}

Grid.prototype.showPath = function(x0,y0,w,h,col){
  push()
  translate(x0,y0)
  noStroke();
  beginShape();
  for(var n=0; n<this.Nt+1; n++){
    var I = this.P[n];
    var i = I[0];
    var j = I[1];
    var x = map(i,0,this.Nx,-w/2.,w/2.)
    var y = map(j,0,this.Ny,-h/2.,h/2.)
    vertex(x,y);
    if(t%this.Nt==n){
      fill(0,255,0);
    }else{
      fill(255,40);
    }
    ellipse(x,y,10,10);
  }
  noFill();
  stroke(col);
  endShape();
  pop();
}


// =============================================================================

function mousePressed(){
  grid.makeRandomPathStart([0,0],[0,10]);
}
