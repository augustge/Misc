// ========================================================
function Player(x,y,FOV){
  this.x      = x;
  this.y      = y;
  this.FOV    = FOV;
  this.dir    = [1,0];

  this.tryToMove = function(){

    if(PLAYER.canMove(this.dir[0],this.dir[1])){
      this.x += this.dir[0];
      this.y += this.dir[1];
      this.handleBoundary();
    }
  }

  this.moveLeft   = function(){
    var ddir = [-1,0]
    if(this.dir[0] != ddir[0] || this.dir[1] != ddir[1]){
      this.dir = ddir
    }else{
      this.tryToMove()
    }
  }

  this.moveRight  = function(){
    var ddir = [1,0]
    if(this.dir[0] != ddir[0] || this.dir[1] != ddir[1]){
      this.dir = ddir
    }else{
      this.tryToMove()
    }
  }

  this.moveUp     = function(){
    var ddir = [0,-1]
    if(this.dir[0] != ddir[0] || this.dir[1] != ddir[1]){
      this.dir = ddir
    }else{
      this.tryToMove()
    }
  }

  this.moveDown   = function(){
    var ddir = [0,1]
    if(this.dir[0] != ddir[0] || this.dir[1] != ddir[1]){
      this.dir = ddir
    }else{
      this.tryToMove()
    }
  }

  this.handleBoundary = function(){
    this.x = (this.x+TERRAIN.Nx)%TERRAIN.Nx;
    this.y = (this.y+TERRAIN.Ny)%TERRAIN.Ny;
  }

  this.canMove = function(X,Y){
    B = TERRAIN.T[(PLAYER.x+X+TERRAIN.Nx)%TERRAIN.Nx][(PLAYER.y+Y+TERRAIN.Ny)%TERRAIN.Ny]
    print(B.traversable)
    return B.traversable
  }

  this.display = function(S){
    fill(255,0,0);
    var r = 0.4*S
    ellipse(0,0,2*r,2*r);
    stroke(0)
    ellipse(0.7*r*this.dir[0],0.7*r*this.dir[1],r,r);
    line(0,0,r*this.dir[0],r*this.dir[1]);
  }

}
