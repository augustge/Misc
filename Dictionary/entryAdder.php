<?php
    // THIS IS WHERE THE STORAGE MAGIC HAPPENS
    if($_SERVER['REQUEST_METHOD'] == "POST"){savepost();}
    function savepost()
    {
      $content1 = '<div class="short">'.$_POST["short"].'</div>';
      $content2 = '<div class="description">'.$_POST["long"].'</div>';
      $content = $content1.$content2;
      $res = file_put_contents("entries/".$_POST["title"].".html",$content);

      // Redirect to root
      // $host  = $_SERVER['HTTP_HOST'];
      // $uri  = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
      // $extra = 'index.php';  // change accordingly
      // echo header("Location: ".$host.$extra, true, 302);
      // exit();
    }
?>

<HTML>
	 <HEAD>
			<TITLE>Thoughts and stuff</TITLE>
			<!-- for unicode utf-8 display -->
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
			<!-- meta description for imporoved SEO  -->
			<meta name="description" content="AugustG for thoughts and other stuff is a mathematics, physics and programming blog, or rather playground, intended for everyone and anyone. Here you find realtime animations, technical and historical texts about the workings of the natural and technical world.">
			<meta name="author" content="August Geelmuyden">

			<!-- css file -->
			<link rel="stylesheet" type="text/css" href="mystyle.css">

			<!-- MATHJAX for latex display -->
			<script type="text/x-mathjax-config">MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});</script>
			<script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML"></script>

			<!-- For Computer Modern (Serif) Font -->
			<link rel="stylesheet" media="screen" href="https://fontlibrary.org/face/cmu-serif" type="text/css"/>

			<!--  P5.js -->
			<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/p5.js"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/addons/p5.dom.js"></script>

      <!--  jQuery for proper AngularJS reloads -->
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>

      <script type="text/javascript" src="mainscript.js"></script>
      <script type="text/javascript" src="entryadderScript.js"></script>
      </script>
	 </HEAD>

   <body>

     <div class="navigation">
       <a class="navEntry" href="index.php">HOME</a>
     </div>

     <form class="entryAdder" method="post">
       <textarea id="title" name="title" onkeyup="addcontent(this,'title')">Insert title</textarea>
       <textarea id="short" name="short" onkeyup="addcontent(this,'short')">Insert short text</textarea>
       <textarea id="long"  name="long"  onkeyup="addcontent(this,'description')">Insert description</textarea>
       <input id="submit"   type="submit" value="Save Post">
     </form>





      <div class="container" onclick="entryclicked(this)">
        <div class="title">Insert title</div>
        <div class="short">Insert short text</div>
        <div class="description">Insert description</div>
      </div>


   </body>

</HTML>
