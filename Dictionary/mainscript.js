

function entryclicked(elm){
  console.log("CLICKED")
  for (var i = 0; i < elm.childNodes.length; i++) {
    if (elm.childNodes[i].className == "description") {
      var child = elm.childNodes[i];
      child.style.display = child.style.display == 'block' ? 'none':'block';
    }
  }
}

function getContent(){

  var title = document.getElementById("title").innerHTML
  return title
}




function delete_cookie( name, content ) {
  // document.cookie = escape(name)+"="+escape(content);
}

function delete_cookie( name ) {
  // document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
