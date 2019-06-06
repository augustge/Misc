
var ym = -1.0;
var yM =  1.0;
var xm = -1.0;
var xM =  1.0;
var x0 = -0.8025;//0.0;
var y0 = 0.156;//0.0;
var mandelbrot = false
var N  = 128;
var S  = 2;
var toggle = 0;

var R0 = 217
var G0 = 177
var B0 = 102
var axX = 0 // 1/1.732050
var axY = 1/1.414 // 1/1.732050
var axZ = -1/1.414 // 1/1.732050

var myDiv;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  // c1 = color(0);
  // c2 = color(255,0,0);

  //
  dropdownType = createSelect();
  dropdownType.option("Mandelbrot",true);
  dropdownType.option("Julia",false);
  dropdownType.changed(dropdownTypeChanged);
  dropdownType.selected(mandelbrot)

  dropdown = createSelect();
  dropdown.option("Translate view",0);
  dropdown.option("Change initial condition",1);
  dropdown.option("Squeeze view",2);
  dropdown.changed(dropdownChanged);

  dropdownN = createSelect();
  for(var i=1; i<10; i++){
    dropdownN.option("N:"+str(pow(2,i)),pow(2,i))
  }
  dropdownN.changed(dropdownNChanged)
  dropdownN.selected(N)

  dropdownS = createSelect();
  dropdownS.option("pixel size: 1 ",1 )
  dropdownS.option("pixel size: 2 ",2 )
  dropdownS.option("pixel size: 4 ",4 )
  dropdownS.option("pixel size: 8 ",8 )
  dropdownS.option("pixel size: 16",16)
  dropdownS.option("pixel size: 32",32)
  dropdownS.changed(dropdownSChanged)
  dropdownS.selected(S)

  myDiv = createDiv(' ');

}

function draw() {
  // toggle = option.value();
  // pixelDensity(1./S);
  // S = dropdownS.value();
  loadPixels();
  var dx = (xM-xm)/N;
  var dy = (yM-ym)/N;
  var M   = (1.+sqrt(1+4*sqrt(sq(x0)+sq(y0))))/2.;
  if(mandelbrot){
    for(var   xi=0; xi<width;  xi+=S){
      for(var yi=0; yi<height; yi+=S){
        var x   = map(xi,0,width,xm,xM);
        var y   = map(yi,0,height,ym,yM);
        var c   = iterateTo(x0,y0,x,y,N,M);
        var V = {x:R0,y:G0,z:B0}
        axX = cos(PI*c)
        axY = sin(PI*c)
        var col = colorCycler(V,axX,axY,axZ,3*PI*c)
        for(var i=0; i<S;  i++){
          for(var j=0; j<S;  j++){
            setPixel(1,xi+i,yi+j,col.x,col.y,col.z,255)
          }
        }
        for(var i=0; i<S;  i++){
          for(var j=0; j<S;  j++){
            setPixel(1,xi+i,yi+j,R,G,B,255)
          }
        }
        // set(xi,yi,col);
      }
    }
  }else{
    for(var   xi=0; xi<width;  xi+=S){
      for(var yi=0; yi<height; yi+=S){
        var x   = map(xi,0,width,xm,xM);
        var y   = map(yi,0,height,ym,yM);
        var c   = iterateTo(x,y,x0,y0,N,M);
        var V = {x:R0,y:G0,z:B0}
        axX = cos(PI*c)
        axY = sin(PI*c)
        var col = colorCycler(V,axX,axY,axZ,3*PI*c)
        for(var i=0; i<S;  i++){
          for(var j=0; j<S;  j++){
            setPixel(1,xi+i,yi+j,col.x,col.y,col.z,255)
          }
        }
      }
    }
  }
  updatePixels();
  drawInfo();
}

function colorCycler(V,aX,aY,aZ,t){
  X = V.x-255/2.
  Y = V.y-255/2.
  Z = V.z-255/2.
  var c = cos(t)
  var s = sin(t)
  R = 255/2.+(c+sq(aX)*(1-c))*X    + (aX*aY*(1-c)-aZ*s)*Y  + (aX*aZ*(1-c)+aY*s)*Z
  G = 255/2.+(aX*aY*(1-c)+aZ*s)*X  + (c+sq(aY)*(1-c))*Y    + (aY*aZ*(1-c)-aX*s)*Z
  B = 255/2.+(aZ*aX*(1-c)-aY*s)*X  + (aY*aZ*(1-c)+aX*s)*Y  + (c+sq(aZ)*(1-c))*Z
  return {x:R,y:G,z:B}
}

function setPixel(d,x,y,R,G,B,A){
    var i = 0
    var j = 0
      var idx = 4 * ((y * d + j) * width * d + (x * d + i));
      pixels[idx]   = R;
      pixels[idx+1] = G;
      pixels[idx+2] = B;
      pixels[idx+3] = A;
}


function iterateTo(x,y,cx,cy,n,m){
  for(var i=0; i<n; i++){ // maximally n iterations
    xd = sq(x)-sq(y) + cx;
    yd = 2*x*y       + cy;
    x = xd;
    y = yd;

    if(sq(x)+sq(y)>sq(m)){
      return i/float(n);
      break;
    }
  }
  return 1.0;
}



function drawInfo(){
  dropdownType.position( 30,10);
  dropdown.position( 30,30);
  dropdownN.position(30,50);
  dropdownS.position(30,70);

  var line1 = " x0:"+nf(x0, 0, 3)+"<br> y0: "+nf(y0, 0, 3)+"<br>"
  var line2 = " x-min:"+nf(xm, 0, 3)+"<br> x-max: "+nf(xM, 0, 3)+" <br>"
  var line3 = " y-min:"+nf(ym, 0, 3)+"<br> y-max: "+nf(yM, 0, 3)+" <br>"
  myDiv.html(line1+line2+line3)
  myDiv.position(30,90);
}


function dropdownChanged(){
  toggle = this.value();
}

function dropdownNChanged(){
  N = this.value();
}

function dropdownSChanged(){
  S = int(this.value());
}

function dropdownTypeChanged(){
  mandelbrot = boolean(this.value());
  if(mandelbrot){
    x0 = 0.0;
    y0 = 0.0;
  }else{
    x0 = -0.8025;
    y0 = 0.156;
  }
}


function keyPressed(){
// left arrow	37
// up arrow	38
// right arrow	39
// down arrow	40
  if(keyCode==37){
    S *= 2;
    dropdownS.selected(S);
  }else if(keyCode==39){
    S /= 2;
    dropdownS.selected(S);
  }

  if(keyCode==38){
    N += 1;
    dropdownN.selected(N);
  }else if(keyCode==40 && N>1){
    N -= 1;
    dropdownN.selected(N);
  }

  if(keyCode==32){
    toggle ++;
    toggle %= 3;
    dropdown.selected(toggle);
  }
}

function mouseDragged(){
  var dx = (xM-xm)*(mouseX-pmouseX)/width;
  var dy = (yM-ym)*(mouseY-pmouseY)/height;
  if(toggle==0){
    xm -= dx;
    xM -= dx;
    ym -= dy;
    yM -= dy;
  }else if (toggle==1){
    x0 += dx
    y0 += dy;
  }else{
    xm -= dx;
    xM += dx;
    ym -= dy;
    yM += dy;
  }
}



//
