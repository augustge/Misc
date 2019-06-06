var originX, originY;

var slider;

var b, g;
var theta, t;
var A;
var s;
var txt = "fish"

function setup() {
    originX = 300;
    originY = 150;

    b = 200;
    g = 9.81;

    omega = sqrt((3*g)/(2*b));

    theta = 0;
    t = 0;
    A = 0.5;

    createCanvas(600, 600);

    slider = createSlider(0, 2, 0.5, 0.1);
    slider.position(20, 450);
}

function draw() {
    background('#38d1a8');

    strokeWeight(4)
    textSize(32)
    text("Rod anchored at endpoints", 20, 50)
    text(txt, 20, 80)

    line(originX-200, originY, originX+200, originY);
    line(originX, originY, originX, originY+250);

    A = slider.value()

    line(originX, originY+b*cos(theta), originX+b*sin(theta), originY);

    updateTheta();
}


function updateTheta() {
    t += 0.1;
    theta = A*(cos(omega*t) + sin(omega*t));
}

function keyPressed(){
  txt = str(keyCode);
}
