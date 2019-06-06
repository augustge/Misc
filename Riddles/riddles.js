

// var RIDDLES = [];
var yScroll = 0;
var t = 0;
var CONTAINER;

function setup(){
  createCanvas(windowWidth, windowHeight);
  defineColors();
  CONTAINER = new Container();
  textFont("Palatino");
}

function draw(){

  CONTAINER.do();

  if(mouseIsPressed){
    if(mouseY<height/3){
      yScroll+= 2;
    }else if(mouseY>2*height/3){
      yScroll-= 2;
    }
  }

}



// =============================================================================
function Container(){
  this.Nx = 7;
  this.RIDDLES = addRiddles();
  this.onDisplay = null;

  this.do = function(){
    if(this.onDisplay==null){
      this.overviewDisplay()
    }else{
      t += 1;
      if(t<80){
        this.overviewDisplay()
        fill(69, 59, 61,50)
        rect(0,0,width, 20*t);
        fill(69, 59, 61,100)
        rect(0,0,width,10*t);
        fill(69, 59, 61)
        rect(0,0,width,8*t);
      }else{
        background(c12);
        this.onDisplay.displayWhole()
      }
    }
  }

  this.overviewDisplay = function(){
    translate(0,yScroll);
    background(c12);
    for(var i=0; i<this.RIDDLES.length; i++){
        this.RIDDLES[i].displayTiny(i,this.Nx);
    }
  }

  this.mousePressed = function(X,Y){
    if(this.onDisplay==null){
      var dx = width/(this.Nx+1);
      var dy = dx;
      var f = 0.8;
      for(var i=0; i<this.RIDDLES.length; i++){
        var Xi = (i%this.Nx) * dx + dx;
        var Yi = int(i/this.Nx)* dy + dy;
        if(abs(Xi-X)<f*dx/2 && abs(Yi-Y)<f*dy/2){
          this.RIDDLES[i].onPress();
        }
      }
    }else{
      this.onDisplay = null;
      t = 0;
    }


  }

}


// =============================================================================

function Riddle(name,description,answer){
  this.name = name;
  this.description = description;
  this.answer = answer;
  this.pressed = false;

  this.setDescription = function(description){
    this.description = description
  }

  this.onPress = function(){
    this.pressed = !this.pressed;
    if(this.pressed){
      CONTAINER.onDisplay = this;
      t = 0;
    }
  }

  this.displayWhole = function(){
    textAlign(LEFT);
    textSize(40);
    fill(c10)
    text(this.name,30,50);
    textSize(18);
    fill(c8)
    text(this.description,30,100,width*0.8,height);
  }

  this.displayTiny = function(i,Nx){
    var f = 0.8
    var dx = width/(Nx+1);
    var dy = dx;
    textAlign(CENTER);
    textSize(18);
    var X = (i%Nx) * dx + dx;
    var Y = int(i/Nx)* dy + dy;
    noStroke();
    if(sq(X-mouseX)+sq(Y-mouseY+yScroll)<sq(f*dx/2)){
      fill(c11)
    }else{
      fill(c10)
    }
    push()
    translate(X,Y);
    ellipse(0,0,f*dx,f*dy);
    fill(c8)
    // rotate(-3.141592/8);
    text(this.name,-f*dx/2,-f*dy/4,f*dx,f*dy);
    pop();
  }
}



// =============================================================================
function addRiddles(){
  var ridl = [];

  // ---------------------------------------------------------------------------
  var r = new Riddle("Confusing hens",
      "A hen and a half lays an egg and a half in a day and a half. How many eggs does three hens lay in two days",
      "Three hens lay four eggs in two days. ( hen=egg/day )");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Colored pills",
      "A blind man is alone in a room and needs to eat exactly one red and one blue pill every day. If he eats too many, or to few, he will die. The problem is he has four pills, two red and two blue, and the only difference between them is their color, which he cannot see. What can he do to ensure the correct medication the following two days in the room?",
      "He can eat half of each pill the first day, then the remaining halves the other day.");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Wise men I",
      "dots and hands",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Wise men II",
      "hats in a line",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Wise men III",
      "Hats in the dark",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Lilys in pond",
      "doubles its size every day",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Distribution of goods",
      "100 chips for 5 people",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Weighing apples",
      "12 apples on balance scale",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Blue eyed Island",
      "Visitor, Brown eyes is a shame",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Switch prison",
      "100 prisoners picked random to one room with one switch",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Liar and truthteller",
      "The road to heaven",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Three wrong boxes",
      "Labelled wrong",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Four boxes",
      "Four boxes are labelled 'apples', 'pears', 'oranges' and 'lemons'. You know that only one box is correctly labelled, but not which one. What is the minimal number of objects you must pick from a chosen box to guarantee you know all the contents afterwords.",
      "2 times.");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Gardener I",
      "How to plant four equidistant tulips.",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Gardener II",
      "Plant 10 roses making 5 rows with 4 on each rows.",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Lightbulbs in cellar",
      "Three switches, three lightbulbs",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Touching coins",
      "Four spheres, five coins touching all others?",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Touching matches",
      "six matches touching every other",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Hunted bear I",
      "10km south, 10km west, 10km north, shoots bear at the same place as woke up. What color is the bear?",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Hunted bear II",
      "If he did not shoot bear, but only ended up in the same place. Why could he have woken up infinitely many places? Where?",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Sad dog",
      "Mathes display a sad dog, how can you make him happy by only moving one match?",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Cherry out",
      "To moves of match to take the cherry out of the glass with the glass remaining intact.",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("100 Chests",
      "100 prisoners outside room of 100 chests with unique prisoner-numbers in them",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Relationship of Ducks",
      "Ducks are monogamous. 2/3 of males have a mate, 3/5 of females have a mate, what proportion is ducks in couples vs singles?",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Soul swapping",
      "Two bodies can only use the machine once. Person 1 with person 2, person 2 with person 3. How can everything be restored by bringing in only two additional people?",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Tying Shoelaces",
      "Do you save time by tying shoelaces on fasttrack or off it?",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Bridges of Koningsberg",
      "Why is it not possible?",
      "answer");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Bats and balls",
      "A bat costs 100$ more than a ball. A bat and a ball costs 110$ total. What does the bat and the ball cost individually?",
      "5$ for ball, 105$ for bat.");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Colliding Camels",
      "5 camels one way meet 5 going the other. Only space inbetween for one camel. One camel can climb over another, but only if there is space immidiately behind that camel.",
      " ");
  ridl.push(r);

  // ---------------------------------------------------------------------------
  var r = new Riddle("Wine Mixing",
      "You have two equally large glasses, one filled white wine, the other with red wine. Suppose you take one spoon of red wine into the white wine, stir it, and then take one spoon of the white wine mix back into the red wine. Is it now more white wine in the red wine, or is it more red wine in the white wine?",
      "It is exactly as much white wine in the red wine as there is red wine in the white wine. ");
  ridl.push(r);


  // ---------------------------------------------------------------------------
  var r = new Riddle("",
      "",
      "answer");
  ridl.push(r);


  return ridl;
}




// =============================================================================
function mousePressed(){
  // CONTAINER.RIDDLES.push(new Riddle("TTT","BBB","QQQ"))
  CONTAINER.mousePressed(mouseX,mouseY-yScroll);
}







// =============================================================================
function defineColors(){
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
}
