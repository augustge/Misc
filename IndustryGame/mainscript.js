
// Idea:
//  * Pixel-grid with different substances.
//  * Substances can be used to make robots & industries to mine more and earn money


var time  = 0;
var zoom  = 20;
var Nx    = 250;
var Ny    = 250;

var PLAYER,CONTROLLER,TERRAIN;

function setup(){
  defineColors();
  createCanvas(window.innerWidth-10, window.innerHeight-10);
  // buffer = createGraphics(window.innerWidth, window.innerHeight);
  // buffer.background(c1)
  PLAYER     = new Player(Nx/2,Ny/2,40)
  CONTROLLER = new Controller()
  TERRAIN    = new Terrain(Nx,Ny)
  TERRAIN.initialize(15)
  noiseSeed(99);
}


function draw(){
  time += 0.01;

  translate(width/2,height/2)
  TERRAIN.display( width/(1+2*PLAYER.FOV) )
  PLAYER.display(  width/(1+2*PLAYER.FOV) )
}



// ========================================================
function Controller(){

}


// ========================================================
function Terrain(Nx,Ny){
  this.Nx = Nx;
  this.Ny = Ny;
  this.T = []

  this.initialize = function(S){
    for(var i=0; i<this.Nx; i++){
      this.T[i] = []
      for(var j=0; j<this.Ny; j++){
        this.T[i][j] = new Block(i,j)
        this.T[i][j].construct(S);
      }
    }
  }

  this.display = function(S){
    for(var i=PLAYER.x-PLAYER.FOV; i<=PLAYER.x+PLAYER.FOV; i++){
      for(var j=PLAYER.y-PLAYER.FOV; j<=PLAYER.y+PLAYER.FOV; j++){
        push()
        var X = S*(i-PLAYER.x-1/2);
        var Y = S*(j-PLAYER.y-1/2);
        var I = (i+TERRAIN.Nx)%TERRAIN.Nx;
        var J = (j+TERRAIN.Ny)%TERRAIN.Ny;
        translate(X,Y)
        this.T[I][J].display(S)
        pop()
      }
    }
  }
}

function Block(i,j){
  this.i = i;
  this.j = j;
  this.traversable = true;

  this.construct = function(S){
    this.elevation = noise(i/S,j/S)
    var waterlevel = 0.4;
    var rnd = 15
    if(this.elevation<waterlevel){ // water
      this.color = color(72+random(rnd),147+random(R),216+random(rnd));
      this.traversable = false;
    }else{
      var R = lerp(79, 161, (this.elevation-waterlevel)/(1-waterlevel))
      var G = lerp(115,166, (this.elevation-waterlevel)/(1-waterlevel))
      var B = lerp(2,  33,  (this.elevation-waterlevel)/(1-waterlevel))
      this.color = color(R+random(rnd),G+random(rnd),B+random(rnd));
    }
    // this.color = 255*this.type;
  }


  this.display = function(S){
    noStroke();
    fill(this.color);
    rect(0,0,S,S);
  }
}



// =============================================================================
// =============================================================================

function mousePressed(){

}

function mouseDragged(){

}


function keyPressed(){
  print(keyCode)
  if(keyCode==37){ // LEFT
    PLAYER.moveLeft()
  }
  if(keyCode==39){ // RIGHT
    PLAYER.moveRight()
  }
  if(keyCode==38){ // UP
    PLAYER.moveUp()
  }
  if(keyCode==40){ // DOWN
    PLAYER.moveDown()
  }
  if(keyCode==80){ // P

  }
  if(keyCode==70){ // F

  }
  if(keyCode==83){ // S

  }
  if(keyCode==73){ // I

  }
  if(keyCode==32){ // SPACE

  }
  if(keyCode==38){ // UP

   }
  if(keyCode==40){ // DOWN

  }

}







function defineColors(){
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
  // c1 = color("rgb(47, 52, 59)");
  // c2 = color("rgb(166, 121, 61)");
  // c3 = color("rgb(255, 149, 11)");
  // c4 = color("rgb(199, 121, 102)");
  // c5 = color("rgb(227, 205, 164)");
  // c6 = color("rgb(112, 48, 48)");
  // c7 = color("rgb(126, 130, 122)");
  // c8 = color("rgb(247, 239, 246)");
  // c9 = color("rgb(196, 196, 189)");
  // c10= color("rgb(86, 190, 215)");
  // c11= color("rgb(212, 50, 21)");
  // c12= color("rgb(69, 59, 61)");
  // c13= color("rgb(255, 0, 0)");
  // c14= color("rgb(255, 149, 11)");
}
