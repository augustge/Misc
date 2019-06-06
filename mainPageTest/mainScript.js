//

// HEADER
var pageContainer;
var PAGEStexts = ["Animations","Documents","Images","Notes from Courses"]
var PAGES = []

// TITLE
var titleContainer;
var titletext = "AUGUSTG";
var LETTERS   = [];

// QUOTE
var quote;
var quoteText = "Euclid taught me that without assumptions there is no proof. Therefore, in any argument, examine the assumptions."
var quoteCite = "E. T. Bell"
function setup() {
  // canvas = createCanvas(windowWidth,windowHeight,WEBGL);
  // canvas.parent('mainScriptContainer');
  pageContainer = createDiv("");
  pageContainer.id('pageContainer');
  pageContainer.class('container');
  pageContainer.style('position:fixed;');

  // MAKE HEADER
  for(var i=0; i<PAGEStexts.length; i++){
    var p = createA(PAGEStexts[i]+"/",PAGEStexts[i]);
    p.parent("pageContainer")
    p.class("menuElement box");
    // PAGES.push(p);
  }


  // MAKE TITLE
  titleContainer = createDiv("");
  titleContainer.id("titleContainer");
  titleContainer.class("letterContainer");
  // titleContainer.position(300,300);
  for(var i=0; i<titletext.length; i++){
   var l = titletext[i].charAt(0); // letter
   var spanBlock = '<span class="letter" data-letter="'+l+'">'+l+'</span>';
   // add to titleContainer
   titleContainer.html(titleContainer.html()+spanBlock);
  }

  // MAKE BLOCKQUOTE
  quote = createElement("blockquote",quoteText+"<cite>"+quoteCite+"</cite>");

}

function draw() {


}
