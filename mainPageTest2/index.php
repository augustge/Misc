
<!-- TOGGLE DROPDOWNTEXT -->
<script language="JavaScript" type="text/javascript">

var idVals = [];

// function for deciding whether an array a contains an element obj
function notContains(a,obj){
  for(var i=0; i<a.length; i++){if(a[i]===obj){return false;}}
  return true; }

// function for visibilizing elements with id theID. All others will be closed
function openClose(theID) {
  var div = document.getElementById(theID);
  if (div.style.display == "block") {
    div.style.display   = "none";
    document.getElementById("Basic").style.display = "block";
  } else {
    div.style.display   = "block";
    document.getElementById("Basic").style.display = "none";
    for (var i=0; i<idVals.length;i++){
      if(idVals[i]!=theID){
          document.getElementById(idVals[i]).style.display = "none";
      }
    }
  }
  if(notContains(idVals,theID)){idVals.push(theID);}
}
</script>


<HTML>
   <HEAD>
      <TITLE>augustg</TITLE>
      <!-- css file -->
      <link rel="stylesheet" type="text/css" href="minimalisticStyle.css">

      <!-- Prettyprint of code snippets -->
      <script src="https://rawgit.com/google/code-prettify/master/loader/run_prettify.js?autoload=true&amp;skin=desert&amp;lang=python" defer=""></script>

      <!-- MATHJAX for latex display -->
      <script type="text/x-mathjax-config">MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});</script>
      <script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

      <!-- jQuery -->
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

      <!-- for unicode utf-8 display -->
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
      <META name="author" content="August Geelmuyden">

      <!--  For Google font: Almendra Display -->
      <link href='https://fonts.googleapis.com/css?family=Almendra Display' rel='stylesheet'>

      <!--  P5.js -->
      <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/p5.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/addons/p5.dom.js"></script>
      <script src="mainPageScript2.js"></script> -->
   </HEAD>
   <BODY>


     <div class="page-wrapper">

     	<section class="intro">
     		<header role="banner">
     			<h1 id="design">AUGUSTG</h1>
     			<h2 id="design">For thoughts and other stuff </h2>
     		</header>

        <div class="summary" role="article">
            <blockquote><p>
            Euclid taught me that without assumptions there is no proof. Therefore, in any
            argument, examine the assumptions.
            <cite>E. T. Bell</cite>
            </p></blockquote>
     		</div>

        <aside class="sidebar" role="complementary">
       		<div class="wrapper">

       			<div class="page-selection" id="page-selection">
       				<h3 id="design" class="select" title="Pages">Select a Design:</h3>
       				<nav role="navigation">
       					<ul>
                  <?php
                  $path = ".";
                  if ($handle = opendir($path)) {
                      while (false !== ($file = readdir($handle))) {
                          if ( $file === "."
                            || $file === ".."
                            || filetype($file) != "dir"
                            || strpos($file, 'hided_') !== false //hided is in filename
                            ) continue;
                          if (    preg_match('/(php|html|js|htm|css)/'        , $file))    continue;
                          else if(preg_match('/(txt)/'                        , $file))    continue;
                          else
                          echo "<li><a class='link-entry' href='".$file."'>".$file."</a></li>";
                      }
                      closedir($handle);
                  }
                  ?>
              </ul>
              <h3 id="design" class="select" title="Posts">Select a Design:</h3>
              <ul>
                <?php
                  $path = ".";
                  if ($handle = opendir($path)) {
                      $j = 0;
                      while (false !== ($file = readdir($handle))) {
                          $extn = explode('_tag000_',$file);
                          $extn_f = array_pop($extn); // extension
                          if($extn[0]==="Innlegg"){
                            // printing in order
                            $ending = explode('.',$extn_f);
                            $textchunk = file_get_contents($file);
                            echo "<li><a class='link-entry' onClick='openClose(".(string)$j.")' style='cursor:hand; cursor:pointer;'>".$ending[0]."</a></li>";
                            $j = $j+1;
                          }
                      }
                      closedir($handle);
                  }
                ?>
            </ul>
       				</nav>
       			</div>

       		</div>
       	</aside>


     	</section>
      <!--  POSTS -->

      <div id="Basic"></div>

        <?php
          $path = ".";
          if ($handle = opendir($path)) {
              $j = 0;
              while (false !== ($file = readdir($handle))) {
                  $extn = explode('_tag000_',$file);
                  $extn_f = array_pop($extn); // extension
                  if($extn[0]==="Innlegg"){
                    // printing in order
                    $ending = explode('.',$extn_f);
                    $textchunk = file_get_contents($file);
                    // write text from file
                    echo '<div class="post texter" role="article" id="'.(string)$j.'">';
                    echo '<h3 id="design" title="'.$ending[0].'" onClick="openClose('.(string)$j.')" style="cursor:hand; cursor:pointer;">'.$ending[0].'</h3>';
                    echo '<p>'.$textchunk.'</p></div>';
                    $j = $j+1;
                  }
              }
              closedir($handle);
          }
        ?>


   </BODY>

   <!-- <footer>
    <p>Posted by: August Geelmuyden</p>
    <p>Contact information: <a href="mailto:someone@example.com">
    someone@example.com</a>.</p>
  </footer> -->


   <!-- <div id="HCB_comment_box"><a href="http://www.htmlcommentbox.com">Comment Box</a> is loading comments...</div>
   <link rel="stylesheet" type="text/css" href="//www.htmlcommentbox.com/static/skins/bootstrap/twitter-bootstrap.css?v=0" />
   <script type="text/javascript" id="hcb">
   if(!window.hcb_user){hcb_user={};}
   (function(){
     var s=document.createElement("script"),
     l=hcb_user.PAGE || (""+window.location).replace(/'/g,"%27"),
     h="//www.htmlcommentbox.com";
     s.setAttribute("type","text/javascript");
     s.setAttribute("src", h+"/jread?page="+encodeURIComponent(l).replace("+","%2B")+"&mod=%241%24wq1rdBcg%24CelJ.IwARkGXIzGHrVSLT."+"&opts=16862&num=10&ts=1517766590175");
     if (typeof s!="undefined")
     document.getElementsByTagName("head")[0].appendChild(s);})();
   </script> -->


</HTML>
