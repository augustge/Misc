
var t = 0;
var num = 30;
var Const = 1;
var Sm  = 0.1;
var Ss = 40;
var dt = 0.1;
var rotX = 0;
var rotY = 0;
var rotVX = 0;
var rotVY = 0;

var lightX = 1.;
var lightY = 0.;
var lightZ = 0.;

// points on block
var bP = new Array(8);
bP[0] = [0,0,0]
bP[1] = [0,0,1]
bP[2] = [0,1,0]
bP[3] = [1,0,0]
bP[4] = [0,1,1]
bP[5] = [1,0,1]
bP[6] = [1,1,0]
bP[7] = [1,1,1]

// neighbor id's
var bN = new Array(8);
bN[0] = [1,2,3]
bN[1] = [0,2,4]
bN[2] = [6,4,6]
bN[3] = [0,5,6]
bN[4] = [1,2,7]
bN[5] = [1,7,3]
bN[6] = [7,2,3]
bN[7] = [4,5,6]

// neighbors
var nP = new Array(8);
nP[0] = [bP[1],bP[2],bP[3]]
nP[1] = [bP[0],bP[2],bP[4]]
nP[2] = [bP[6],bP[4],bP[6]]
nP[3] = [bP[0],bP[5],bP[6]]
nP[4] = [bP[1],bP[2],bP[7]]
nP[5] = [bP[1],bP[7],bP[3]]
nP[6] = [bP[7],bP[2],bP[3]]
nP[7] = [bP[4],bP[5],bP[6]]
// nP[point][neigh][ax]


var pg;

function setup() {
  createCanvas(windowWidth, windowHeight,WEBGL);
  // ortho(-width, width, height, -height/2, 0.1, 100);
  var fov = 60 / 180 * PI;
  var cameraZ = (height/2.0) / tan(fov/2.0);
  // perspective(60 / 180 * PI, width/height, cameraZ * 0.1, cameraZ * 10);

  pg = createGraphics(width,height);

}

function draw() {
    // background(0);
    camera(0,0,0);
    // textSize(32);
    // text("word", 10, 30);

    t += 0.1
    // lights();


    rotX += rotVX*dt;
    rotVX /= 1.1;
    rotY += rotVY*dt;
    rotVY /= 1.1;

    handleOverlay();

    push();
    translate(-100,100,0);
    ambientLight(100,100,100);
    directionalLight(150,150,150, 0,0, 1)
    pop();

    showShape();

}

function handleOverlay(){
  resetMatrix();
  pg.background(255);
  pg.text('hello world!', 50, 50);
  pg.text(bP[1][0], 50, 80);
  texture(pg);
  plane(width,height);
}

function showShape(){
  // stroke(0);
  // strokeWeight(10);
  rotate(rotX,[1,0,0]);
  rotate(rotY,[0,1,0]);

  for(var i=-num/2; i<num/2; i++){
    for(var j=-num/2; j<num/2; j++){
      for(var k=-num/2; k<num/2; k++){

        var b = getMarchingCube(Sm*i,Sm*j,Sm*k,Sm);
        var numtrue = getNumTrue(b);

        // normalMaterial()
        // basicMaterial(150)
        // ambientMaterial(i,j,k)
        // specularMaterial(255,0,0)
        var len = sqrt(sq(i)+sq(j)+sq(k))
        var dotColor = (lightX*i+lightY*j+lightZ*k)/len
        ambientMaterial(100*abs(dotColor))
        if(numtrue==3 || numtrue==4){//(numtrue==3 && numtrue==4){
          beginShape(TRIANGLE_STRIP);
          for(var l=0; l<8; l++){
            if(b[l]){
              vertex(Ss*i+Ss*bP[l][0],Ss*j+Ss*bP[l][1],Ss*k+Ss*bP[l][2]);
            }
          }
          endShape(CLOSE);
        }
        else if(numtrue==7 || numtrue==6){
          beginShape(TRIANGLE_STRIP);
          for(var l=0; l<8; l++){ // locate unactive
            if(!b[l]){
              for(var n=0; n<3; n++){ // loop over neighbors
                if(b[bN[n]]) // if neighbor active
                vertex(Ss*i+Ss*nP[l][n][0],Ss*j+Ss*nP[l][n][1],Ss*k+Ss*nP[l][n][2]);
              }
            }
          }
          endShape(CLOSE);
        }
        //
        // if(!b[0] &&!b[1] &&!b[2] &&!b[3] &&!b[4] &&!b[5] &&!b[6] && b[7]){
        //   beginShape(TRIANGLE_STRIP);
        //   vertex(Ss*(i-0.5),Ss*(j-0.5),Ss*(k-0.0));
        //   vertex(Ss*(i-0.5),Ss*(j-0.0),Ss*(k-0.5));
        //   vertex(Ss*(i-0.0),Ss*(j-0.5),Ss*(k-0.5));
        //   endShape(CLOSE);
        // }


      }
    }
  }

}


function getMarchingCube(x, y, z, s){
   var cube = new Array(8);
   for(var i = 0; i<8; i++){
     cube[i] = f(x+s*bP[i][0],y+s*bP[i][1],z+s*bP[i][2]) < Const;
   }
   return cube;
}

function getNumTrue(cube){
  var numtrue = 0;
  for(var i=0; i<8; i++){
    if(cube[i]){ numtrue+=1; }
  }
  return numtrue;
}




// ========================================================================
function f(x,y,z){
  return sq(x)+sq(y)+sq(z);
}
// ========================================================================






function keyPressed() {
  if(keyCode==37){ // left
    rotVY -= 0.1;
  }
  if(keyCode==39){ // right
    rotVY += 0.1;
  }
  if(keyCode==38){ // up
    rotVX -= 0.1;
  }
  if(keyCode==40){ // down
    rotVX += 0.1;
  }

}







//
