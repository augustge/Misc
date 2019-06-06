// ================================================
//               PLANS
// ================================================
/*

  PROBLEM WITH BRAIN:
    * Neuron value seems to return undef/null
    * Possibly due to best-boid selection
    * Try: Use matrix approach
        - Each layer is a matrix
        - Between each matrix mapping, use non-linear convolution

  ADD:
    * Dead boids (Cadaver) --> Possibly edible? Good for fertility


  PROPERTIES:
    * ~DNA: ID of random floats
      -> Color etc...
    * Color
    * Armor - health per move penalty

  SENSES: SIGHT
    * Local squares. Health Penalty per time per square
    * First: only grass, later object color + dir.

  RESPONSES:
    * 1 eat
    * 1 turn L & R
    * 1 move
    * 2 attack
    * 2 eat obj

*/



// ================================================
//               PARAMETERS
// ================================================

// ------- GENERAL
var Nx        = 16*4;
var Ny        = 10*4;
var windowX   = Nx;
var windowY   = Ny;
var I         = 0;
var J         = 0;
var Screen    = "MAIN";

// ------- SPAWNING
var objSpawnProb  = 0.01

// ------- ENVIRONMENT
var num               = 55  // grass fertility noise
var falloff           = 0.5 // grass fertility noise
var terrainScale      = 20
var terrainContrast   = 20.
var grassGrowth       = 0.005

// ------- OBJECT
var healthLossPerTime = 0.8;
var healthLossPerMove = 1;
var maxHealth         = 100;
var birthloss         = 50;
var numID             = 10;
var DNAmutationProb   = 0.01;
var refillProbability = 6.0;
var boidCount         = 0;
var boidRefillBarrier = 2;

// ------- BRAIN
var killAxonProb      = 0.01;
var inputs_init       = 9
var outputs_init      = 4
var stacks_init       = 5
var layers_init       = 1
var refillMutation_m  = 1.0 // severity
var refillMutation_p  = 50.0 // probability
var mutation_m  = 0.1
var mutation_p  = 1.0

// ------- DUMMYs
var MATRIX,dx,dy;
var Cdirt1,Cdirt2,Cgrass1,Cgrass2;
var initialBrain, bestBoid;

function setup(){
  createCanvas(windowWidth, windowHeight);

  dx = width/windowX;
  dy = height/windowY;

  MATRIX = new Matrix(Nx,Ny);
  MATRIX.initialize(num,falloff,objSpawnProb);

  defineColors();
  noStroke();
}

function draw(){

  if(Screen=="MAIN"){
    MATRIX.do();
    // MATRIX.display(I,J,windowX,windowY);
    MATRIX.displayBackground(I,J,windowX,windowY);
    MATRIX.displayToplayer(I,J,windowX,windowY);
    fill(255);
    text(bestBoid.age, 10, 30);
    text(boidCount, 10, 40);
    text(boidRefillBarrier,10,50);
  }else if(Screen="BRAIN"){
    MATRIX.do();
    background(0);
    translate(50, 50);
    bestBoid.BRAIN.display(50,30);

    // print(bestBoid.BRAIN)
  }

  // refillProbability
}





// ============  MATRIX     ============
function Matrix(Nx,Ny){
  this.Nx = Nx
  this.Ny = Ny
  this.M = new Array(this.Nx);
  for(var i=0; i<this.Nx; i++){
    this.M[i] = new Array(this.Ny);
    for(var j=0; j<this.Ny; j++){
      this.M[i][j] =  new Array(2); // ground and obj level
    }
  }

  this.initialize = function(num,falloff,objP){
    noiseDetail(num,falloff);
    for(var i=0; i<this.Nx; i++){
      for(var j=0; j<this.Ny; j++){
        this.M[i][j][0] = new Stationary(i,j);
        if(random(0,1)<objP){
          this.M[i][j][1] = new Object(i,j);
          var ID = new Array(numID);
          for(var k=0; k<numID; k++){ID[k]=random(0,1)}
          this.M[i][j][1].initiate(ID);
          this.M[i][j][1].BRAIN.mutate(refillMutation_m,refillMutation_p);
          bestBoid = this.M[i][j][1]
          boidCount++
        }else{
          this.M[i][j][1] = null;
        }
      }
    }
  }

  this.addMutationOf = function(bestBoid){
    var i = int(random(this.Nx));
    var j = int(random(this.Ny));
    if(this.M[i][j][1] == null){
      bestBoid = mutate(bestBoid,i,j);
      this.M[i][j][1] = bestBoid;
      // bestBoid = this.M[i][j][1]
      boidCount++;
    }
  }

  this.do = function(){
    var boidScore = 0;
    for(var i=0; i<this.Nx; i++){
      for(var j=0; j<this.Ny; j++){
        this.M[i][j][0].do();
        if(this.M[i][j][1]!=null){
          this.M[i][j][1].do();
        }
        // REFILL?!?
      }
    }
  }

  this.display = function(I,J,windowX,windowY){
    for(var i=0; i<windowX; i++){
      for(var j=0; j<windowY; j++){
        var x = (I+i+Nx)%Nx;
        var y = (J+j+Ny)%Ny;
        this.M[x][y][0].display(i,j);
        if(this.M[x][y][1]!=null){
          this.M[x][y][1].display(i,j);
        }
      }}}

  this.displayBackground = function(I,J,windowX,windowY){
    for(var i=0; i<windowX; i++){
      for(var j=0; j<windowY; j++){
        var x = (I+i+Nx)%Nx;
        var y = (J+j+Ny)%Ny;
        this.M[x][y][0].display(i,j);
      }}}

  this.displayToplayer = function(I,J,windowX,windowY){
    for(var i=0; i<windowX; i++){
      for(var j=0; j<windowY; j++){
        var x = (I+i+Nx)%Nx;
        var y = (J+j+Ny)%Ny;
        if(this.M[x][y][1]!=null){
          this.M[x][y][1].display(i,j);
        }
      }}}

}

// ============ STATIONARY   ============
function Stationary(x,y){
  this.x = x;
  this.y = y;
  this.localID = 1.0/(1+exp(-terrainContrast*(noise(x/terrainScale,y/terrainScale)-0.5)));
  this.growthRate = 1+grassGrowth*this.localID;
  this.fullLife = 100*this.localID;
  this.life = this.fullLife;

  this.do = function(){
    this.grow();
    // grow, reproduce, ...
  }

  this.grow = function(){
    if(this.life<=this.fullLife){
      this.life *= this.growthRate;
    }

  }

  this.display = function(i,j){
    fill(lerpColor(Cdirt2, Cgrass2, this.life/100.));
    rect(dx*i,dy*j,dx,dy);
  }
}



// ============ OBJECT       ============
function Object(x,y){
  this.x = x;
  this.y = y;
  this.BRAIN = new Brain(inputs_init,outputs_init,stacks_init,layers_init);
  this.BRAIN.initiate();

  this.initiate = function(ID){
    this.BRAIN.initiate();
    this.dir = [0,1];
    this.health = maxHealth;
    this.age = 0;
    var R = colorwheel(120,0.3,6.28*ID[0])
    var G = colorwheel(80,5.3, 6.28*ID[1])
    var B = colorwheel(50,2.9, 6.28*ID[2])
    this.color = color(R,G,B)
    this.ID = ID;
  }

  this.do = function(){

    var sensed = new Array(this.BRAIN.inputs)
    var count = 0;
    for(var a=-1; a<=1; a++){
      for(var b=-1; b<=1; b++){

        var i = (this.x + a + Nx)%Nx;
        var j = (this.y + b + Ny)%Ny;
        sensed[count] = MATRIX.M[i][j][0].localID;
        // sensed[count] = MATRIX.M[i][j][0].life/float(MATRIX.M[i][j][0].fullLife);
        count++
      }
    }
    var response = this.BRAIN.think(sensed)
    // this.live();

    if(random(100)<5){
      this.turn(1);
    }
    if(random(100)<10){
      this.move();
    }
    if(random(100)<20){
      this.eat();
    }else if(random(100)<0.2){
      this.reproduce();
    }
    this.live();
  }

  this.live = function(){
    this.age += 1;
    this.health -= healthLossPerTime;
    if(this.health<=0){
      MATRIX.M[this.x][this.y][1] = null;
      delete this;
      boidCount-=1;
    }
  }

  this.eat = function(){
    if(this.health<=maxHealth){
      var i = (this.x + this.dir[0]+Nx)%Nx;
      var j = (this.y + this.dir[1]+Ny)%Ny;
      this.health += MATRIX.M[i][j][0].life/2;
      MATRIX.M[i][j][0].life /= 2;
    }
  }

  this.reproduce = function(){
    // if(this.health>=birthloss && MATRIX.M[i][j][1]==null){
      var i = (this.x + this.dir[0]+Nx)%Nx;
      var j = (this.y + this.dir[1]+Ny)%Ny;
      MATRIX.M[i][j][1] = mutate(this,i,j);
      boidCount++;
      this.health -= birthloss;
    // }
  }

  this.move = function(){
    var i = (this.x + this.dir[0]+Nx)%Nx;
    var j = (this.y + this.dir[1]+Ny)%Ny;
    if(MATRIX.M[i][j][1]==null){
        MATRIX.M[i][j][1] = this;
        MATRIX.M[this.x][this.y][1] = null;
        this.x = i;
        this.y = j;
        this.health -= healthLossPerMove;
    } // else: response?
  }

  this.turn = function(d){
    var dX = -d*this.dir[1]
    this.dir[1] = d*this.dir[0]
    this.dir[0] = dX
  }


  this.display = function(i,j){
    stroke(0)
    fill(this.color);
    ellipse(dx*(i+0.5+0.4*this.dir[0]),dy*(j+0.5+0.4*this.dir[1]),0.2*dx,0.2*dy);
    ellipse(dx*(i+0.5),dy*(j+0.5),0.6*dx,0.6*dy);
    noStroke();
    if(bestBoid==this){
      fill(255,0,0,100);
      ellipse(dx*(i+0.5),dy*(j+0.5),0.05*this.health*dx,0.05*this.health*dy);
    }else{
      fill(0,255,0,50);
      ellipse(dx*(i+0.5),dy*(j+0.5),0.02*this.health*dx,0.02*this.health*dy);
    }

  }
}




// ============ MUTATE ============
function makeCopyOf(boid,i,j){
  var child = new Object(i,j);
  var ID = new Array(numID);
  for(var k=0; k<numID; k++){
    ID[k]=boid.ID[k]
  }
  child.BRAIN.inputs  = boid.BRAIN.inputs;
  child.BRAIN.outputs = boid.BRAIN.outputs;
  child.BRAIN.stacks  = boid.BRAIN.stacks;
  child.BRAIN.layers  = boid.BRAIN.layers;
  child.BRAIN.imitateBrain(boid.BRAIN);
  child.initiate(ID);
  return child;
}

function mutate(boid,i,j){
  // this.color = color(random(0,255),random(0,255),random(0,255))
    var child = new Object(i,j);
    var ID = new Array(numID);
    for(var k=0; k<numID; k++){
      ID[k]=boid.ID[k]+DNAmutationProb*random(-1,1)
    }
    child.BRAIN.inputs  = boid.BRAIN.inputs;
    child.BRAIN.outputs = boid.BRAIN.outputs;
    child.BRAIN.stacks  = boid.BRAIN.stacks;
    child.BRAIN.layers  = boid.BRAIN.layers;
    child.BRAIN.imitateBrain(boid.BRAIN);
    child.BRAIN.mutate(mutation_m,mutation_p)
    child.initiate(ID);
    return child;
}





// ============ BRAIN ============
function Brain(inputs,outputs,stacks,layers){
  this.inputs  = inputs;
  this.stacks  = stacks;
  this.outputs = outputs;
  this.layers  = layers;

  this.initiate = function(){
    this.out = new Array(this.outputs);
    this.neurons = new Array(this.stacks);
    for (var i=0; i<this.stacks; i++){
      this.neurons[i] = new Array(this.layers);
      this.neurons[i][0] = new Neuron(this.inputs);
      for (var j=0; j<this.layers; j++){
        this.neurons[i][j] = new Neuron(this.stacks);
        this.neurons[i][j].addWeight(i,1.0);
      }
    }
    this.finalNeurons = new Array(this.outputs);
    for (var i=0; i<this.outputs; i++){
        this.finalNeurons[i] = new Neuron(this.stacks);
    }
  }

  this.think = function(input){
    // first layer
    for (var i=0; i<this.stacks; i++) { // each neuron
      this.neurons[i][0].initialize();
      for (var k=0; k<this.inputs; k++) { // each input
        this.neurons[i][0].inputFrom(k,input[k]);
      }
      this.neurons[i][0].wrapValue(); // apply sigmoid
    }
    // for each deeper layer
    for (var n=1; n<this.layers; n++) { // each layer (except last)
      for (var i=0; i<this.stacks; i++) { // each neuron
        this.neurons[i][n].initialize();
        for (var k=0; k<this.stacks; k++) { // each input
          this.neurons[i][n].inputFrom(k,this.neurons[k][n-1].call());
        }
        this.neurons[i][n].wrapValue();
      }
    }
    // for last layer
    for (var i=0; i<this.outputs; i++){ // each neuron
      this.finalNeurons[i].initialize();
      for (var k=0; k<this.stacks; k++){ // each input
        this.finalNeurons[i].inputFrom(k,this.neurons[k][this.layers-1].call());
      }
      // apply sigmoid
      this.finalNeurons[i].wrapValue();
      this.out[i] = regulate(this.finalNeurons[i].call());
    }
    return this.out;
  }

  this.imitateBrain = function(network){
    // every layer has 'stacks' neurons
    for (var i=0; i<min(network.stacks,this.stacks); i++) {
      // first takes 'input' inputs
      this.neurons[i][0].similarTo(network.neurons[i][0]);
      // rest takes 'stacks' inputs
      for (var j=1; j<min(network.layers,this.layers); j++) {
        this.neurons[i][j].similarTo(network.neurons[i][j]);
      }
    }
    for (var i=0; i<min(network.outputs,this.outputs); i++) {
        this.finalNeurons[i].similarTo(network.finalNeurons[i]);
    }
  }

  this.mutate = function(m,p){
    for (var i=0; i<this.stacks; i++) {
      // first takes 'input' inputs
      this.neurons[i][0].mutate(m,p);
      // rest takes 'stacks' inputs
      for (var j=1; j<this.layers; j++) {
        this.neurons[i][j].mutate(m,p);
      }
    }
    for (var i=0; i<this.outputs; i++) {
        this.finalNeurons[i].mutate(m,p);
    }
  }

  this.display = function(sx,sy){
    for (var i=0; i<this.stacks; i++) {
      // first takes 'input' inputs
      this.neurons[i][0].display(0,i,sx,sy);
      // rest takes 'stacks' inputs
      for (var j=1; j<layers; j++) {
        this.neurons[i][j].display(j,i,sx,sy);
      }
    }
    for (var i=0; i<outputs; i++) {
        this.finalNeurons[i].display(layers,i,sx,sy);
    }
  }
}

function regulate(x){
  if(x>0){
    return x;
  }else{
    return 0.0;
  }
}




// ======== NEURON
function Neuron(inputs){
  this.value  = 0.0;
  this.inputs = inputs;
  this.W = new Array(inputs);
  for (var i=0; i<inputs; i++){ this.W[i] = 0.0;} //random(-1, 1); }
  // in-weights
  this.addWeight  = function(k,weight){
    this.W[k] = weight;
  }

  this.initialize = function(){
    this.value = 0.0;
  }

  this.call       = function(){
    return this.value;
  }

  this.wrapValue = function(){
    this.value = 1.0/(1+exp(-1.0*this.value));
  }

  this.inputFrom = function(k,signal){
    this.value += this.W[k]*signal;
  }

  this.mutate = function(m,p){
    for (var i=0; i<this.inputs; i++) {
      if(random(100)<p){
        if(random(100)<killAxonProb){
          this.W[i] = 0.0;
        }else{
          this.W[i] = this.W[i]+random(-m,m);
        }
      }
    }
  }

  this.similarTo = function(neuron){
    for (var i=0; i<min(neuron.inputs,this.inputs); i++) {
        this.W[i] = neuron.W[i];
    }
  }

  this.display = function(n,m,sx,sy){
    for (var i=0; i<this.inputs; i++){
      if(atan(this.W[i])<0){
        strokeWeight(5*atan(-this.W[i]));
        stroke(255,0,0,180);
      }else{
        strokeWeight(5*atan(this.W[i]));
        stroke(0,255,0,180);
      }
      noFill();
      bezier(sx*n,sy*i, sx*n,sy*(i+0.5*(m-i) ), sx*(n+1),sy*(m-0.5*(m-i)), sx*(n+1),sy*m);
      //line(sx*n,sy*i, sx*(n+1),sy*m);
    }
    noStroke();
    textSize(8);
    fill(255);
    // ellipse(sx*n,sy*m,50*(abs(this.value)+0.5),50*(abs(this.value)+0.5));
    text(this.value,sx*n,sy*m);
  }
}





// ============ HELPER FUNCTIONS ============
// colorwheel
function colorwheel(a,theta,x){return a*(1+cos(theta+x))}


// ============ EVENTS ============
function keyPressed(){
  print(keyCode)

  if(keyCode==37){ // LEFT
    I -= 5;
  }else if(keyCode==39){ // RIGHT
    I += 5;
  }else if(keyCode==38){ // UP
    J -= 5;
  }else if(keyCode==40){ // DOWN
    J += 5;
  }else if(keyCode==90){ // Z
    windowX += 5; dx = width/windowX;
    windowY += 5; dy = height/windowY;
  }else if(keyCode==88){ // X
    windowX -= 5; dx = width/windowX;
    windowY -= 5; dy = height/windowY;
  }else if(keyCode==49){ // 1
    Screen = "MAIN";
  }else if(keyCode==50){ // 2
    Screen = "BRAIN";
  }

}

function mousePressed(){

}



// ============ COLORS ============
function defineColors(){
  Cdirt1  = color(64,50,25);
  Cdirt2  = color(89,73,42);
  Cgrass1 = color(39,89,2);
  Cgrass2 = color(85,140,3);
  // DIRT1    rgb(64,50,25);
  // DIRT2    rgb(89,73,42);
  // GRASS2   rgb(39,89,2);
  // GRASS1   rgb(85,140,3);

}
