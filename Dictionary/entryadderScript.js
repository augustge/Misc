
function addcontent(elm,cls){
  var target = document.getElementsByClassName(cls)[0];
  target.innerHTML = elm.value;
  MathJax.Hub.Queue(["Typeset",MathJax.Hub,target]);
}
