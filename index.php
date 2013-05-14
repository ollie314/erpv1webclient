<!DOCTYPE html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]>
<html class="no-js ie6 oldie" lang="en"><![endif]-->
<!--[if IE 7]>
<html class="no-js ie7 oldie" lang="en"><![endif]-->
<!--[if IE 8]>
<html class="no-js ie8 oldie" lang="en"><![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="en"><!--<![endif]-->
<head>
    <meta charset="utf-8"/>
    <!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <!-- Mobile viewport optimized: h5bp.com/viewport -->
    <meta name="viewport" content="width=device-width">

    <title>Corthay test application.</title>

    <meta name="robots" content="index, nofollow">
    <meta name="description"
          content="MetroUI-Web : Simple and complete web UI framework to create web apps with Windows 8 Metro user interface."/>
    <meta name="keywords"
          content="metro, metroui, metro-ui, metro ui, windows 8, metro style, bootstrap, framework, web framework, css, html"/>
    <meta name="author" content="Simnet S.A."/>

    <link rel="stylesheet" type="text/css" href="/assets/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/bootstrap-responsive.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/bootmetro.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/bootmetro-tiles.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/bootmetro-charms.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/metro-ui-light.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/icomoon.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/datepicker.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/daterangepicker.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/bootstrap-timepicker.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/bootstrap-editable.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/bootstrap-wysihtml5.css">

    <link rel="stylesheet" type="text/css" href="/assets/css/erp.css">
    <link rel="stylesheet" type="text/css" href="/assets/scss/site.css">

    <!-- Le fav and touch icons -->
    <link rel="shortcut icon" href="/assets/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/assets/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/assets/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/assets/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="/assets/ico/apple-touch-icon-57-precomposed.png">

    <!-- All JavaScript at the bottom, except for Modernizr and Respond.
       Modernizr enables HTML5 elements & feature detects; Respond is a polyfill for min/max-width CSS3 Media Queries
       For optimal performance, use a custom Modernizr build: www.modernizr.com/download/ -->
    <script type="text/javascript" src="/assets/js/libs/log4javascript/log4javascript.js"></script>
    <script src="/assets/js/back/modernizr-2.6.1.min.js"></script>
    <script>
        // define the application run mode out of any file and before including any of these.
        /*
            Run modes :
                - production    : 0,
                - staging       : 1,
                - testiing      : 2,
                - development   : 3
         */
        window.appRunMode = 3;
    </script>
</head>
<body data-accent="blue" class="metro">
<!-- Prompt IE 6 users to install Chrome Frame. Remove this if you support IE 6.
       chromium.org/developers/how-tos/chrome-frame-getting-started -->
<p class=chromeframe>Your browser is <em>not compatible!</em> <a href="http://browsehappy.com/">Upgrade to a
    different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a>
    to experience this site.</p>
<header id="nav-bar" class="container-fluid"></header>
<div id="pageContainer" class="container-fluid"></div>
<footer id="pageFooter" class="win-ui-dark win-commandlayout navbar-fixed-bottom"></footer>
<div id="charms" class="win-ui-dark"></div>
<div id="dialogPlaceholder"></div>
<script src="/assets/js/libs/mediatorjs/mediator.js"></script>
<script data-main="/assets/js/main" src="/assets/js/libs/require/require.js"></script>
<script type="text/javascript" src="/assets/js/libs/canvas/canvas.js"></script>
<script type="text/javascript">
    // TODO : send this behavior to the spin view. It will replace spinjs.
    // This code take place here to happend at the same time of require_js processing to avoid waiting on a blank screen
    var cSpeed=15;
    var cWidth=200;
    var cHeight=200;
    var cTotalFrames=20;
    var cFrameWidth=200;
    var cImageSrc='/assets/images/sprites/sprites.png';

    var cImageTimeout=false;

    function startAnimation(){
        var loaderId = 'loaderImage',
            container = document.getElementById('pageContainer'),
            loader = document.createElement('div');
        loader.setAttribute('id',loaderId);
        container.appendChild(loader);
        document.getElementById(loaderId).innerHTML='<canvas id="canvas" width="'+cWidth+'" height="'+cHeight+'"><p>Your browser does not support the canvas element.</p></canvas>';

        //FPS = Math.round(100/(maxSpeed+2-speed));
        FPS = Math.round(100/cSpeed);
        SECONDS_BETWEEN_FRAMES = 1 / FPS;
        g_GameObjectManager = null;
        g_run = genImage;

        g_run.width=cTotalFrames*cFrameWidth;
        genImage.onload = function (){cImageTimeout = setTimeout(fun, 0)};
        initCanvas();
    }


    function imageLoader(s, fun)//Pre-loads the sprites image
    {
        clearTimeout(cImageTimeout);
        cImageTimeout=0;
        genImage = new Image();
        genImage.onload = function (){cImageTimeout=setTimeout(fun, 0)};
        genImage.onerror = new Function('alert(\'Could not load the image\')');
        genImage.src = s;
    }

    //The following code starts the animation
    new imageLoader(cImageSrc, 'startAnimation()');
</script>
</body>
</html>