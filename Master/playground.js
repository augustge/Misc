function setup() {

  var width = 700,
      height = 300,
      margin = 30;

  createCanvas(width + margin*2, height + margin*2);

  push();
  translate(margin,margin);

  //
  //y axis
  var D3yscale = d3.scale.linear()
    .domain([0, 10])
    .range([height,0]);
  // 
  // var D3yaxis = d3.svg.axis()
  //   .scale(D3yscale)
  //   .orient('left')
  //
  // var p5yaxis = D3p5axis(D3yaxis);

  // p5yaxis.drawTicks(function(txt) {
  //   stroke('#ddd');
  //   line(0,0,width,0);
  //   noStroke();
  //   fill('black');
  //   textAlign(RIGHT);
  //   text(txt, -5, 5);
  // });
  //
  // p5yaxis.drawConnectingLine(function(startX, endX) {
  //   //no line connecting
  // });
  //
  //   //x axis
  // var D3xscale = d3.scale.ordinal()
  //   .domain(['planes','trains','automobiles', 'ferries', 'subways', 'taxis', 'ubers', 'lyft'])
  //   .rangeRoundBands([0,width], .1);
  //
  // var D3xaxis = d3.svg.axis()
  //   .scale(D3xscale)
  //
  // var p5axis = D3p5axis(D3xaxis, 0, height);
  //
  // p5axis.drawTicks(function(txt) {
  //   fill('black');
  //   noStroke();
  //   textAlign(CENTER);
  //   text(txt, 0, 23);
  //   stroke('black');
  //   line(0,3,0,10);
  //
  // });
  //
  // p5axis.drawConnectingLine(function(startX, endX) {
  //   stroke('black');
  //   strokeWeight(2);
  //   line(startX, 0, endX, 0);
  // });
  //
  //
  // var data = [1,2,3,4,5,4.5,5,9.5];
  //
  // for(var i = 0; i < data.length; i++) {
  //   fill('blue');
  //   var xOffset = D3xscale.range()[i];
  //   var barWidth = D3xscale.rangeBand();
  //   var barHeight = D3yscale(data[i]);
  //   var maxHeight = D3yscale(0);
  //   push();
  //   translate(xOffset, 0);
  //   rect(0, barHeight, barWidth, maxHeight-barHeight);
  //   pop();
  // }
  //
  // pop();
  //
  //
  // //Add a title
  // fill('#000');
  // noStroke();
  // textSize(15);
  // text("Drawing D3 axes using p5 canvas methods", 30, 20);

}

function draw(){
  background(0);
}

//
//Function for converting D3 axis to p5 drawing methods
p5.prototype.D3p5axis = function(d3Axis, x, y) {
  x = x || 0;
  y = y || 0;
  var D3scaleObj = d3Axis.scale();
  var customDOMaxis = d3.select('body').append('custom').style('display', 'none').call(d3Axis);
  var ticks = customDOMaxis.selectAll('g');

  var returnFunction = function() {}

  returnFunction.drawTicks = function(drawFunction) {
    push();
    translate(x,y);
    ticks.each(function() {
      var translateObj = d3.transform(d3.select(this).attr('transform'));
      var translateX = translateObj.translate[0];
      var translateY = translateObj.translate[1];
      push();
      translate(translateX, translateY);
      var txt = d3.select(this).select('text').text();
      drawFunction(txt);
      pop();
    });
    pop();
  }

  returnFunction.drawConnectingLine = function(drawFunction) {
    push();
    translate(x,y);
    drawFunction(D3scaleObj.range()[0],D3scaleObj.range()[1]);
    pop();
  }

  return returnFunction;
}
