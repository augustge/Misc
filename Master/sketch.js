

/*

  Fermi-Dirac and Bose-Einstein distributions (number densities)
    Thermal evolution
    Internal degrees of freedom

  Phase space plots
    time evolution
    Annihilation processes and phase space volume ?


*/



var t = 0;
var plotfig;
var nDensity = [];
var nBoltzmann;
var nBose;
var nFermi;

function setup() {
  plotfig = createGraphics(600,400);
  mainCanvas = createCanvas(windowWidth, windowHeight);


  // nDensity.push(new numberDensity(plotfig,-1,1));
  nBoltzmann  = new NumberDensity(plotfig,0);
  nBose       = new NumberDensity(plotfig,+1);
  nFermi      = new NumberDensity(plotfig,-1);

  sliderYm = createSlider(-5,0,10,0.1);
  sliderYm.position(20,20);

  sliderYM = createSlider(0,5,2,0.1);
  sliderYM.position(20,40);

  sliderM = createSlider(0,1,0,0.01);
  sliderM.position(20,60);

}

function draw() {
    background(0);

    t+= 1

    // plotfig.position(100,100);
    plotfig.background(255);
    nBose.setParameters(     sliderM.value(),1);
    nFermi.setParameters(    sliderM.value(),1);
    nBoltzmann.setParameters(sliderM.value(),1);
    var ym = sliderYm.value();
    var yM = sliderYM.value();
    addGrid(plotfig,0,5,-0.5,2,0.1,0.1);
    nBose.plotVsT(ym,yM,255,0,0);
    nFermi.plotVsT(ym,yM,0,255,0);
    nBoltzmann.plotVsT(ym,yM,0,0,255);
    plotfig.text(sliderYm.value(),10,10);
    plotfig.text(sliderYM.value(),10,20);
    image(plotfig, 150, 50);


}

// === CLASS NUMBER DENSITY
function NumberDensity(canvas,statistics){
  this.canvas = canvas;
  this.statistics = statistics;
}

NumberDensity.prototype.setParameters = function(m,g){
  this.m = m;
  this.mSq = m*m;
  this.g = g;
}

NumberDensity.prototype.f = function(pSq,mSq,T){
  return 1/(exp(sqrt(pSq+mSq)/T)+this.statistics);
}

NumberDensity.prototype.plotVsT = function(ym,yM,r,g,b){
  var Tm = 0.001;
  var TM = 10;
  var NT = 100;
  var dT = (TM-Tm)/float(NT-1);
  var pM = 10;
  var pm = 0;
  var dp = 0.05;
  var I = 0;

  this.canvas.stroke(r,g,b);
  this.canvas.noFill();
  this.canvas.beginShape();
  for(var T=Tm; T<TM; T+=dT){
    var nT = 0;
    for(var p=pm; p<pM; p+=dp){
          var pSq = p*p
          var f   = this.f(pSq,this.mSq,T);
          nT += f*dp;
    }
    nT *= this.g/(2*sq(PI));
    var x = map(T,Tm,TM,0,this.canvas.width);
    var y = map(nT,ym,yM,0,this.canvas.height);
    vertex(x,y);
  }
  this.canvas.endShape();
}

function addGrid(canvas,xm,xM,ym,yM,dx,dy){
  plotfig.stroke(230);
  for(var xi=xm; xi<=xM; xi+=dx){
    var x = map(xi,xm,xM,0,canvas.width);
    plotfig.line(x,0,x,canvas.height);
  }
  for(var yi=ym; yi<=yM; yi+=dy){
    var y = map(yi,ym,yM,0,canvas.height);
    plotfig.line(0,y,canvas.width,y);
  }
  stroke(190);
  var y = map(0,ym,yM,0,canvas.height);
  plotfig.line(0,y,canvas.width,y);
  var x = map(0,xm,xM,0,canvas.width);
  plotfig.line(x,0,x,canvas.height);
}






//
