
var n0        = 1.0 // outside refractive
var raySpan   = 3.14; // PI/8
var raySep    = 0.1
var nRays     = 0;
var numItr    = 5
var rayWidth  = 2

var rayPoint = [0,0];

var source;
var LENSES  = [];
var ray;
var controlpanel;

function setup(){
  createCanvas(windowWidth, windowHeight);

  c1 = color("rgb(47, 52, 59)");
  c2 = color("rgb(166, 121, 61)");
  c3 = color("rgb(255, 149, 11)");
  c4 = color("rgb(199, 121, 102)");
  c5 = color("rgb(227, 205, 164)");
  c6 = color("rgb(112, 48, 48)");
  c7 = color("rgb(126, 130, 122)");
  c8 = color("rgb(247, 239, 246)");
  c9 = color("rgb(196, 196, 189)");
  c10= color("rgb(86, 190, 215)");
  c11= color("rgb(212, 50, 21)");
  c12= color("rgb(69, 59, 61)");
  c13= color("rgb(255, 0, 0)");
  c14= color("rgb(255, 149, 11)");

  lensColor       = c7
  rayColor        = c11 // color(10)//
  normalLineColor = c12 // color(255,0,0)

  var lens = new Lens(-200,0,200,600,600,7)
  lens.initiate()
  LENSES.push( lens )

  var lens = new Lens(200,0,300,-800.,-800.,7)
  lens.initiate()
  LENSES.push( lens )

  source = new Source(-width/3,0)
  ray = new Ray(source.x,source.y,1,0)

  controlpanel = new ControlPanel()
  controlpanel.initiate()

  // noLoop()
}



function draw(){
  translate(width/2,height/2)
  background(c5)
  controlpanel.update()

  for(var i=0; i<LENSES.length; i++){
      LENSES[i].display()
  }

  // blendMode(ADD)
  source.display()
  source.displayRayTo(rayPoint[0],rayPoint[1],numItr)
  // blendMode(NORMAL)

}






//------------------------------------------------------------------------------
// HELPERS

function intersectCircle(x0,y0,dx,dy,Cx,Cy,R){
  var Dx = x0-Cx
  var Dy = y0-Cy
  var B = 2*( dx*Dx + dy*Dy )
  var C = sq(Dx)+sq(Dy)-sq(R)
  if(sq(B)>4*C){ // solution exist
    var L = [-B/2.+sqrt(sq(B)-4*C)/2.,-B/2.-sqrt(sq(B)-4*C)/2.]
    return L.filter(function(x){ return x > 0.5 }) // filter out negative
  }else{
    return []
  }
}

//------------------------------------------------------------------------------


function Lens(x,y,R,R1,R2,f){
  this.n      = 1.5 //1.5
  this.d      = 10
  this.x      = x
  this.y      = y
  this.R      = R
  this.R1     = R1
  this.R2     = R2
  this.f      = f

  this.initiate = function(){
    this.t1 = asin(this.R/abs(this.R1))
    this.t2 = asin(this.R/abs(this.R2))
    this.sgn1 = this.R1/abs(this.R1)
    this.sgn2 = this.R2/abs(this.R2)
    if(this.sgn1>0){
      this.shift1 = this.d/2.
    }else{
      this.shift1 = this.d/2.+abs(this.R1)-sqrt(sq(this.R1)-sq(this.R))
    }
    this.C1x = this.x + this.shift1 - this.R1*sqrt(1-sq(this.R/this.R1))
    this.C1y = this.y

    if(this.sgn2>0){
      this.shift2 = -this.d/2.
    }else{
      this.shift2 = -this.d/2.-abs(this.R2)+sqrt(sq(this.R2)-sq(this.R))
    }
    this.C2x = this.x + this.shift2 + this.R2*sqrt(1.-sq(this.R/this.R2))
    this.C2y = this.y
  }

  this.display = function(){
    fill(lensColor)
    noStroke()
    beginShape()
    for(var t=-this.t1; t<this.t1; t+=this.t1/50.){
      var Xt = this.R1*cos(this.sgn1*t) + this.C1x
      var Yt = this.R1*sin(this.sgn1*t) + this.C1y
      vertex(Xt,Yt)
    }
    vertex(this.R1*cos(this.sgn1*this.t1) + this.C1x,
           this.R1*sin(this.sgn1*this.t1) + this.C1y)
    for(var t=-this.t2; t<this.t2; t+=this.t2/50.){
      var Xt = this.R2*cos(this.sgn2*(t+PI)) + this.C2x
      var Yt = this.R2*sin(this.sgn2*(t+PI)) + this.C2y
      vertex(Xt,Yt)
    }
    vertex(this.R2*cos(this.sgn2*(this.t2)) + this.C2x,this.y-this.R,
           this.R2*sin(this.sgn2*(this.t2+PI)) + this.C2y)
    endShape(CLOSE)

    noStroke()
  }

  this.normalTo = function(x,y){
    var eps = 3
    var d1 = sqrt(sq(x-this.C1x)+sq(y-this.C1y))
    var d2 = sqrt(sq(x-this.C2x)+sq(y-this.C2y))
    if(d1-abs(this.R1)>d2-abs(this.R2)){
      var nx = -this.sgn1*(x-this.C1x)/d1
      var ny = -this.sgn1*(y-this.C1y)/d1
    }else{
      var nx = this.sgn2*(x-this.C2x)/d2
      var ny = this.sgn2*(y-this.C2y)/d2
    }
    return [nx,ny]
  }

  this.inside = function(x0,y0){ // bad!!!
    if(this.sgn1 && this.sgn2){
      var inside1 = sq(x0-this.C1x)+sq(y0-this.C1y)<sq(this.R1);
      var inside2 = sq(x0-this.C2x)+sq(y0-this.C2y)<sq(this.R2);
      return inside1 && inside2
    }
  }

  this.intersectsWith = function(x0,y0,dx,dy){
    // first circle
    var result1 = intersectCircle(x0,y0,dx,dy,this.C1x,this.C1y,abs(this.R1))
    // second circle
    var result2 = intersectCircle(x0,y0,dx,dy,this.C2x,this.C2y,abs(this.R2))
    var result = result1.concat(result2)
    var L = 2*width
    for(var i=0; i<result.length; i++){
      var Ln = result[i]
      // ellipse(x0+Ln*dx,y0+Ln*dy,5,5)
      if(Ln<L){
        var eps = 1
        var xn = x0 + Ln*dx
        var yn = y0 + Ln*dy
        var t1n = this.sgn1*atan2(yn-this.C1y,xn-this.C1x)
        var t2n = this.sgn2*atan2(yn-this.C2y,xn-this.C2x)
        if(abs(t1n)<this.t1 || abs(t2n)<this.t2){
          L = Ln
        }
      }
    }
    // ellipse(x0+L*dx,y0+L*dy,25,25)
    return L
  }
}

//------------------------------------------------------------------------------

function Ray(x,y,dx,dy,outside){
  this.outside = outside;
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;

  this.findNextPoint = function(){
    var L = 2*width
    this.hitLens = -1
    var nVec = [1,0]
    for(var i=0; i<LENSES.length; i++){
      var Ls = LENSES[i].intersectsWith(this.x,this.y,this.dx,this.dy)
      if(Ls<L){
        L = Ls;
        this.hitLens=i;
      }
    }
    return L
  }

  this.bend = function(){
    var r   = [this.dx,this.dy]
    var n   = LENSES[this.hitLens].normalTo(this.x,this.y);
    var nRel = n0/LENSES[this.hitLens].n;
    // if(!this.outside){
    //   // nRel = 1.0/nRel;
    //   // n[0] = -n[0]; n[1] = -n[1];
    // }
    var c   = n[0]*this.dx+n[1]*this.dy;
    var fak = 1.0-sq(nRel)*(1-sq(c))
    if(fak>0){
      var Dx = nRel*this.dx + (nRel*c-sqrt(fak))*n[0];
      var Dy = nRel*this.dy + (nRel*c-sqrt(fak))*n[1];
      var Dl = sqrt(sq(Dx)+sq(Dy))
      this.dx = Dx/Dl
      this.dy = Dy/Dl;
      this.outside = !this.outside;
    }else{
      var Dx = -this.dx + 2*(this.dx*n[0]+this.dy*n[1])*n[0]
      var Dx = -this.dy + 2*(this.dx*n[0]+this.dy*n[1])*n[1]
      var Dl = sqrt(sq(Dx)+sq(Dy))
      this.dx = Dx/Dl
      this.dy = Dy/Dl;
    }

  }

  this.iterate = function(num){
    if(num>0){
      var L = this.findNextPoint()
      this.display(L)
      this.x = this.x+L*this.dx
      this.y = this.y+L*this.dy
      if(this.hitLens>-1){
        this.bend()
      }
      this.iterate(num-1)
    }

  }

  this.display = function(L){
    var xNew = this.x+L*this.dx
    var yNew = this.y+L*this.dy
    if(this.hitLens>-1 && controlpanel.drawNormals.checked()){ // normal line
      strokeWeight(1)
      stroke(normalLineColor)
      var nVec = LENSES[this.hitLens].normalTo(xNew,yNew);
      if(this.outside){
        line(xNew-25*nVec[0],yNew-25*nVec[1],xNew+50*nVec[0],yNew+50*nVec[1])
      }else{
        line(xNew+25*nVec[0],yNew+25*nVec[1],xNew-50*nVec[0],yNew-50*nVec[1])
      }
    }
    // if(this.outside){
    //   stroke(0,0,255)
    // }else{
    //   stroke(rayColor)
    // }
    stroke(rayColor)
    // strokeWeight(3)
    // line(this.x,this.y,this.x+50*this.dx,this.y+50*this.dy)
    strokeWeight(rayWidth)
    line(this.x,this.y,xNew,yNew)
    // noStroke()
    // fill(rayColor)
    // ellipse(xNew,yNew,5,5)
  }
}

//------------------------------------------------------------------------------

function Source(x,y){
  this.x = x
  this.y = y
  this.outside = true
  for(var j=0; j<LENSES.length; j++){
    if(LENSES[j].inside(this.x,this.y)){
      this.outside = false
    }
  }

  this.display = function(){
    noStroke()
    fill(rayColor)
    ellipse(this.x,this.y,10,10)
  }

  this.displayRayTo = function(xp,yp,num){
    var dX = (xp- width/2)   - this.x
    var dY = (yp-height/2)  - this.y
    var dL = sqrt(sq(dX)+sq(dY))
    dX = dX/dL
    dY = dY/dL
    stroke(rayColor)
    line(this.x,this.y,this.x+100*dX,this.y+100*dY)
    // var ray = new Ray(this.x,this.y,dX,dY,this.outside)
    // ray.iterate(num)
    // //
    for(var t=0; t<raySpan; t+=raySep){
      var dxP = cos(t)*dX+sin(t)*dY
      var dyP = cos(t)*dY-sin(t)*dX
      var ray = new Ray(this.x,this.y,dxP,dyP,this.outside)
      ray.iterate(num)
      var dxP = cos(t)*dX-sin(t)*dY
      var dyP = cos(t)*dY+sin(t)*dX
      var ray = new Ray(this.x,this.y,dxP,dyP,this.outside)
      ray.iterate(num)
    }
  }
}


//------------------------------------------------------------------------------


function ControlPanel(){


  this.initiate = function(){
    this.modeSelector = createSelect();
    this.modeSelector.option("Source")
    this.modeSelector.option("Lens 1")
    this.modeSelector.option("Lens 2")
    this.modeSelector.position(90,30)

    this.raySpanSlider = createSlider(0.01, 3.141592, raySpan, 0.01)
    this.raySpanSlider.position(90,50);

    this.raySepSlider = createSlider(0.01, 3.141592, raySep, 0.01)
    this.raySepSlider.position(90,70);

    this.drawNormals = createCheckbox('Draw normals', true);
    this.drawNormals.position(90,90);
  }

  this.update = function(){
    raySpan = this.raySpanSlider.value()
    raySep  = this.raySepSlider.value()
  }

  this.inside = function(x,y){
    return (x<300)&&(y<100)
  }
}







//------------------------------------------------------------------------------

function mousePressed(){
  if(!controlpanel.inside(mouseX,mouseY)){
    if(controlpanel.modeSelector.value()=="Source"){
      if(mouseButton === LEFT){
        rayPoint = [mouseX,mouseY]
      }else{
        source.x = mouseX-width/2
        source.y = mouseY-height/2
      }
    }else if(controlpanel.modeSelector.value()=="Lens 1"){
      if(mouseButton === LEFT){
        LENSES[0].x = mouseX-width/2
        LENSES[0].y = mouseY-height/2
        LENSES[0].initiate()
      }
    }else if(controlpanel.modeSelector.value()=="Lens 2"){
      if(mouseButton === LEFT){
        LENSES[1].x = mouseX-width/2
        LENSES[1].y = mouseY-height/2
        LENSES[1].initiate()
      }
    }
  }
}

function doubleClicked() {
}

function mouseDragged(){
  // var nRays     = 100;
  var dx = mouseX-pmouseX
  var dy = mouseY-pmouseY
  // if(raySpan+dx/200.>0 && raySpan+dx/200.<PI){
  //   raySpan += dx/200.
  // }
  // if(nRays+int(dy/10.)<400 && nRays+int(dy/10.)>0){
  //   nRays += int(dy/10.)
  // }
  if(controlpanel.modeSelector.value()=="Lens 1"){
    if(abs(LENSES[0].R1)+dx>LENSES[0].R){ LENSES[0].R1 += dx }
    if(abs(LENSES[0].R2)+dy>LENSES[0].R){ LENSES[0].R2 += dy }
    LENSES[0].initiate()
  }else if(controlpanel.modeSelector.value()=="Lens 2"){
    if(abs(LENSES[1].R1)+dx>LENSES[0].R){ LENSES[1].R1 += dx }
    if(abs(LENSES[1].R2)+dy>LENSES[0].R){ LENSES[1].R2 += dy }
    LENSES[1].initiate()
  }


}

function keyPressed(){
  // redraw()
}
