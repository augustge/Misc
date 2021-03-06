
<!-- TOGGLE DROPDOWNTEXT -->
<script language="JavaScript" type="text/javascript">

var idVals = [];

// function for deciding whether an array a contains an element obj
function notContains(a,obj){
  for(var i=0; i<a.length; i++){if(a[i]===obj){return false;}}
  return true; }

// function for vizibilizing elements with id theID. All others will be closed
function openClose(theID) {
   if (document.getElementById(theID).style.display == "block") {
    document.getElementById(theID).style.display = "none";
    document.getElementById('Basic').style.display = "block";
  }
   else {
    document.getElementById(theID).style.display  = "block";
    document.getElementById('Basic').style.display = "none";
    var numtrue = 0;
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
      <TITLE>AUGUST GEELMUYDEN</TITLE>

      <!-- css file -->
      <link rel="stylesheet" type="text/css" href="mystyle.css">

      <!-- MATHJAX for latex display -->
      <script type="text/x-mathjax-config">MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});</script>
      <script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

      <!-- jQuery -->
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

      <!-- for unicode utf-8 display -->
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <META name="author" content="August Geelmuyden">

   </HEAD>
   <BODY>


<!--
     <h1 class="title">August Geelmuyden</h1> -->

     <div class="letterContainer">
      <span class="letter" data-letter="A">A</span>
      <span class="letter" data-letter="U">U</span>
      <span class="letter" data-letter="G">G</span>
      <span class="letter" data-letter="U">U</span>
      <span class="letter" data-letter="S">S</span>
      <span class="letter" data-letter="T">T</span><br>
      <span class="letter" data-letter="G">G</span>
      <span class="letter" data-letter="E">E</span>
      <span class="letter" data-letter="E">E</span>
      <span class="letter" data-letter="L">L</span>
      <span class="letter" data-letter="M">M</span>
      <span class="letter" data-letter="U">U</span>
      <span class="letter" data-letter="Y">Y</span>
      <span class="letter" data-letter="D">D</span>
      <span class="letter" data-letter="E">E</span>
      <span class="letter" data-letter="N">N</span>
    </div>


     <blockquote>
       Euclid taught me that without assumptions there is no proof. Therefore, in any
       argument, examine the assumptions.
       <cite>E. T. Bell</cite>
     </blockquote>


      <h2 class="topic">Pages</h2>

      <div class="container">
        <?php
        $excludedFiles = array_merge($excludedFiles,array('.','..'));
        $path = "/uio/hume/student-u74/augustg/www_docs/";
        if ($handle = opendir($path)) {
            while (false !== ($file = readdir($handle))) {
                $extn = explode('_TAG1_',$file);
                if ( $file === "." || $file === ".."
                  // || $file === ".index.php"
                  // || $file === ".index.html.swp"
                  // || $file === "#index.html#"
                  // || $file === "._.DS_Store"
                  // || $file === ".DS_Store"
                  // || $file === "notToBeShown"
                  // || $file === "indexInnlegg.txt"
                  // || $file === "output01.txt"
                  // || $file === "ELINE"
                  || filetype($file) != "dir"
                  || $extn[0] === "notShow"
                  || strpos($file, 'hided_') !== false //hided is in filename
                  ) continue;
                if (    preg_match('/(php|html|js|htm|css)/'        , $file))    continue;
                else if(preg_match('/(txt)/'                        , $file))    continue;
                else

                // echo "<div class='box'><a class='menuElement' href='".$file."'>".$file."</a></div>";
                echo "<a class='menuElement box' href='".$file."'>".$file."</a>";
                // echo "<li class='hexagonal'><a class='menuElement' href='".$file."'>".$file."</a></li>";
            }
            closedir($handle);
        }
        ?>
      </div>




      <h2 class="topic">Texts</h2>
      <div class="container" id="tekstMenu">
      <?php
        $path = "/uio/hume/student-u74/augustg/www_docs";
        if ($handle = opendir($path)) {
            $j = 0;
            while (false !== ($file = readdir($handle))) {
                $extn = explode('_tag000_',$file);
                $extn_f = array_pop($extn); // extension
                if($extn[0]==="Innlegg"){
                  // printing in order
                  $ending = explode('.',$extn_f);
                        // write text from file
                        echo '<a class="box" onClick="openClose(\'a'.(string)$j.'\')" style="cursor:hand; cursor:pointer;">'.$ending[0].'</a>';
                }
                $j = $j+1;
            }


            closedir($handle);
        }
      ?>
    </div>


    <ul id="messageList">
      <div id='Basic' class="texter" style="display: block;">
        <!--  ComplexMappingExponential.gif -->
        <!-- DLAmov500x500.gif -->
        <p class="image"><img src="Animations/biljards2.gif" width='80%' height='70%'><p>
          </div>

          <?php
              $path = "/uio/hume/student-u74/augustg/www_docs";
              if ($handle = opendir($path)) {
                  $j = 0;
                  while (false !== ($file = readdir($handle))) {
                      $extn = explode('_tag000_',$file);
                      $extn_f = array_pop($extn); // extension
                      if($extn[0]==="Innlegg"){
                        // printing in order
                        $ending = explode('.',$extn_f);
                              // write text from file
                              // echo '<li><div id="topicHeader" onClick="openClose(\'a'.(string)$j.'\')" style="cursor:hand; cursor:pointer;">'.$ending[0].'</div>';
                              $textchunk = file_get_contents($file);
                              echo '<div id="a'.(string)$j.'" class="texter"><h2 id="inText">'.$ending[0].'</h2>'.$textchunk.'</div>';


                      }
                      $j = $j+1;
                  }


                  closedir($handle);
              }
            ?>
          </ul>








   </BODY>
<!--
   <footer>
    <p>Posted by: August Geelmuyden</p>
    <p>Contact information: <a href="mailto:someone@example.com">
    someone@example.com</a>.</p>
  </footer> -->

</HTML>
