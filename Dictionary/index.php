

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

      </script>
	 </HEAD>

   <body>

     <div class="navigation">
       <a class="navEntry" href="entryAdder.php">ADD ENTRY</a>
     </div>

    <?php
    foreach (glob("entries/*.html") as $filename){
      echo '<div class="container" onclick="entryclicked(this)">';
      echo '<div class="title">'.basename($filename,".html").'</div>';
      include $filename;
      echo '</div>';
    }
    ?>


   </body>

</HTML>
