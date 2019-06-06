

var dTheta = 5
var dSteer = 5
var dt     = 0.2

var S, W, T;

function setup(){
  canvas = createCanvas(windowWidth,windowHeight);

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

  Cwater = color("rgb(86, 190, 215)"); // rgb(86, 190, 215)
  Cwave  = color("rgb(96, 200, 225)");

  T = new Terrain();
  S = new Sailboat(0,0,1,0,0)
  W = new Wind(10.,1,0.3);

  // var fs = fullscreen()
  // fullscreen(!fs)
}

function draw(){
  translate(width/2,height/2)
  background(c10);


  push()
  translate(-S.r[0],-S.r[1])

  W.move(dt)
  W.display() // fix this

  T.doRipples(dt)
  pop()

  S.move(dt)
  S.display()
  // fix this:
  //  - sail bending \propto force on sail
  //  - turning physicalize
  // S.displayForces()

}


//==============================================================================


function Wind(v,m,theta){
  this.t      = 0
  this.v      = v
  this.m      = m
  this.theta  = theta
  this.dW     = 50; // wave length

  this.move = function(dt){
    this.t += dt
  }

  this.display = function(){ // fix this
    var dix = cos(this.theta)
    var diy = sin(this.theta)
    var odx = -sin(this.theta)
    var ody = cos(this.theta)
    strokeWeight(5)
    stroke(Cwave)
    for(var j=-50; j<50; j++){
      var X = (this.v*this.t%this.dW + this.dW*j)*dix
      var Y = (this.v*this.t%this.dW + this.dW*j)*diy
      line(X-1000*odx,Y-1000*ody,X+1000*odx,Y+1000*ody)
    }
  }

  this.getForce = function(V){
    var X = this.m*(this.v*cos(this.theta)-V[0])
    var Y = this.m*(this.v*sin(this.theta)-V[1])
    return [X,Y]
  }

}

//==============================================================================

function Ripple(x,y){
  this.x = x
  this.y = y
  this.R = 0
  this.killable = false

  this.move = function(dt){
    this.R += 8.0 * dt
    if(this.R>500){
      this.killable = true
    }
  }

  this.display = function(){
    noFill()
    strokeWeight(5)
    stroke(255,255/(this.R/5))
    ellipse(this.x,this.y,this.R,this.R)
  }
}


//==============================================================================


function Terrain(){
  this.ripples = []

  this.noiseFunction =function(x,y){
    return noise(x/200. , y/200.)
  }

  this.addRipple = function(x,y){
    this.ripples.push( new Ripple(x,y) )
  }

  this.doRipples = function(dt){
    for(var i=0; i<this.ripples.length; i++){
      this.ripples[i].display()
      this.ripples[i].move(dt)
    }

    var newRipples = []
    for(var i=this.ripples.length-1; i>=0; i--){
      if(!this.ripples[i].killable){
        newRipples.push(this.ripples[i])
      }
    }
    delete this.ripples
    this.ripples = newRipples
  }

  this.display =function(){
    var Nx = 100
    var Ny = 100
    var dR = 10
    noStroke()
    for(var i=0; i<Nx; i++){
      for(var j=0; j<Ny; j++){
        var X = dR*(i-Nx/2)+S.r[0]
        var Y = dR*(j-Ny/2)+S.r[1]
        var I = this.noiseFunction(X,Y)
        if(I>0.6){
          fill(255)
          rect(X,Y,dR,dR)
        }else if(I>0.5){
          fill(155)
          rect(X,Y,dR,dR)
        }

      }
    }
  }
}


//==============================================================================

function Sailboat(x,y,phi,theta){
  this.r      = [x,y]
  this.phi    = phi;
  this.theta  = theta
  this.vTheta = 0
  this.R      = 100 // length of sail
  this.L      = 200 // length of boat
  this.B      = 40 // width of boat
  this.v      = [0,0]
  this.fin    = 0.0 // fin blocks 90 percent
  this.M      = 5.0 // kg
  this.A      = 5.
  this.rope   = this.R

  this.move = function(dt){
    var nF = this.netForce()
    var dvx = this.A*nF[0]/this.M*dt
    var dvy = this.A*nF[1]/this.M*dt
    this.v = [this.v[0]+dvx,this.v[1]+dvy]
    this.r = [this.r[0]+this.v[0]*dt,this.r[1]+this.v[1]*dt]
    this.sailResponse(dt)

    if(random(100)<20){
      var b = [ cos(this.phi)   , sin(this.phi) ]
      T.addRipple(this.r[0]-0.5*this.L*b[0],this.r[1]-0.5*this.L*b[1])
      T.addRipple(this.r[0]+0.5*this.L*b[0],this.r[1]+0.5*this.L*b[1])
    }
  }

  this.sailResponse = function(dt){
    var s  = [cos(this.theta),sin(this.theta)]
    var Fw = this.windPushOnSail(W)
    // var torque = 0. //5.*(s[0]*Fw[1]-s[1]*Fw[0])
    var vThetaWind =  0.05*(s[0]*Fw[1]-s[1]*Fw[0])
    var s     = [ cos(this.theta) , sin(this.theta) ]
    var b     = [ cos(this.phi)   , sin(this.phi) ]
    var ropeV = [ this.R*s[0]-0.5*this.L*b[0],this.R*s[1]-0.5*this.L*b[1]]
    var ropeL = len(ropeV)
    if( ropeL>this.rope ){
      var elasticity = 1.0/this.rope
      var torque = -(s[0]*ropeV[1]-s[1]*ropeV[0])*elasticity
    }else{
      var torque = 0
    }

    this.vTheta += torque*dt
    this.vTheta /= 1.2
    this.theta += (this.vTheta+vThetaWind)*dt
  }

  this.netForce = function(){
    var Fpull_ = this.windPushOnDir(W)
    var Fpull = [this.fin*Fpull_[0],this.fin*Fpull_[1]]

    var Fpush_ = this.windPushAlongDir(W)
    var Fpush = [Fpush_[0],Fpush_[1]]
    var Fdrag = [-0.01*this.v[0],-0.01*this.v[1]]

    var Fnet = [Fpush[0]+Fpull[0]+Fdrag[0], Fpush[1]+Fpull[1]+Fdrag[1]]

    return Fnet
  }

  this.display = function(){

    // BOAT
    noStroke()
    fill(c1)
    rotate(this.phi)
    ellipse(0,0,this.L,this.B)
    rotate(-this.phi)

    // ROPE
    var s = [ cos(this.theta) , sin(this.theta) ]
    var b = [ cos(this.phi)   , sin(this.phi) ]
    var ropeV = [ this.R*s[0]-0.5*this.L*b[0],this.R*s[1]-0.5*this.L*b[1]]
    var ropeL = len(ropeV)
    if( ropeL>this.rope ){
      var fak = this.rope/ropeL
    }else{
      var fak = 1.0
    }
    stroke(0)
    strokeWeight(8*fak)
    line(0.5*this.L*b[0],0.5*this.L*b[1],this.R*s[0],this.R*s[1])

    // SAIL
    var R = this.R
    noFill()
    strokeWeight(8)
    stroke(c8)
    var sailEnd = [R*cos(this.theta),R*sin(this.theta)]
    var wdp = this.windPushOnSail(W)
    var wdpL = len(wdp)
    var Psail = [3.,4.,3.]
    beginShape()
      vertex(0,0);
      vertex(0.25*sailEnd[0]+Psail[0]*wdp[0]/sqrt(wdpL),0.25*sailEnd[1]+Psail[0]*wdp[1]/sqrt(wdpL));
      vertex(0.50*sailEnd[0]+Psail[1]*wdp[0]/sqrt(wdpL),0.50*sailEnd[1]+Psail[1]*wdp[1]/sqrt(wdpL));
      vertex(0.75*sailEnd[0]+Psail[2]*wdp[0]/sqrt(wdpL),0.75*sailEnd[1]+Psail[2]*wdp[1]/sqrt(wdpL));
      vertex(sailEnd[0],sailEnd[1]);
    endShape()


  }


  this.windPushAlongSail = function(w){
    var r   = [ cos(this.theta)  , sin(this.theta) ] // par to sail
    var Fw = w.getForce(this.v)
    return proj(Fw,r)//[dot(Fw,r)*r[0],dot(Fw,r)*r[1]]
  }

  this.windPushOnSail = function(w){
    var r   = [ cos(this.theta)  , sin(this.theta) ] // par to sail
    var Fw = w.getForce(this.v) // should be relative speed !!!
    var projFwR = normalized(proj(Fw,r))
    return [Fw[0]-len(Fw)*projFwR[0],Fw[1]-len(Fw)*projFwR[1]] // dp
  }

  this.windPushAlongDir = function(w){
    var d   = [ cos(this.phi)    , sin(this.phi)   ]
    var Fw = w.getForce(this.v) // should be relative speed !!!
    var wdp = this.windPushOnSail(W)
    var wdpL = len(wdp)
    return [dot(wdp,d)*d[0]/wdpL,dot(wdp,d)*d[1]/wdpL] // wind push along dir
  }

  this.windPushOnDir = function(w){
    var d   = [ -sin(this.phi) , cos(this.phi) ]
    var Fw = w.getForce(this.v)
    var wdp = this.windPushOnSail(W)
    var wdpL = len(wdp)
    return [dot(wdp,d)*d[0]/wdpL,dot(wdp,d)*d[1]/wdpL] // wind push along dir
  }


  this.displayForces = function(){
    var R = this.R/10.
    strokeWeight(3)

    stroke(255,255,0)
    var Fw  = W.getForce(this.v) // wind push
    line(0,0,R*Fw[0],R*Fw[1])
    // text("wind direction",1.1*R*Fw[0],1.1*R*Fw[1])


    stroke(0,255,0)
    // var plp = this.windPushAlongSail(W)
    // line(0,0,R*plp[0]+R*plp[1])

    var wdp = this.windPushOnSail(W)
    line(0,0,R*wdp[0],R*wdp[1])
    // text("wind push on sail",1.1*R*wdp[0],1.1*R*wdp[1])

    var was = [Fw[0]-wdp[0],Fw[1]-wdp[1]]
    line(0,0,R*was[0],R*was[1])

    stroke(0)
    var wP = this.windPushAlongDir(W)
    line(0,0,R*wP[0],R*wP[1])

    var wPo = this.windPushOnDir(W)
    line(0,0,R*wPo[0]+R*wPo[1])

  }

  this.steer = function(dPhi){
    var vLen = len(this.v)
    this.phi += dPhi*vLen
    this.v = rotateVec(this.v,dPhi*vLen)
  }

  this.pullPushRope = function(dL){
    if(this.rope+dL>0 && this.rope+dL<2*this.R){
      this.rope += dL
    }
  }

}

//==============================================================================
// --> helpers

function dot(a,b){
  return( a[0]*b[0]+a[1]*b[1] )
}

function len(a){
  return sqrt( sq(a[0])+sq(a[1]) )
}

function proj(a,b){ // a,b normalized
  var d = dot(a,b)
  return [d*b[0],d*b[1]]
}

function normalized(a){
  var aLen = len(a)
  return [a[0]/aLen,a[1]/aLen]
}

function rotateVec(a,phi){
  var ax = a[0]*cos(phi)-a[1]*sin(phi)
  var ay = a[1]*cos(phi)+a[0]*sin(phi)
  return [ax,ay]
}

//==============================================================================

function mouseDragged(){
  var dx = mouseX-pmouseX ;
  var dy = mouseY-pmouseY ;
  // S.theta += dx/180.*PI;
  S.pullPushRope(0.1*dx)
  S.steer(dy/1500.);
}

function keyPressed(){
  if(keyCode==38){ // UP
    S.pullPushRope(10)
  }

  if(keyCode==40){ // DOWN
    S.pullPushRope(-10)
  }

  if(keyCode==37){ // LEFT
    S.steer(-dSteer/1000.);
  }

  if(keyCode==39){ // RIGHT
    S.steer(dSteer/1000.);
  }

}
