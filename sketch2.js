
var t = 0;


function setup() {
  createCanvas(windowWidth, windowHeight,WEBGL);

  // ortho(-width, width, height, -height/2, 0.1, 100);
  var fov = 60 / 180 * PI;
  var cameraZ = (height/2.0) / tan(fov/2.0);
  perspective(60 / 180 * PI, width/height, cameraZ * 0.1, cameraZ * 10);
}

function draw() {
    background(100);

    // textSize(32);
    // text("word", 10, 30);

    t += 0.0005
    // lights();
    ambientLight(100);
    directionalLight(150,150,120, 0, 0, 1)

    for(var i=-1; i<70; i++){
      for(var j=-1; j<35; j++){
        // pushMatrix();
        translate(-width/2+20*i,-height/2+20*j);
        rotate(i*t, [1,0,0]);
        rotate(j*t, [0,1,0]);
        box(15);
        resetMatrix();
      }
    }

}


function mousePressed(){


}


function keyPressed() {

}







//
