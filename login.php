<?php
include('views/login_header.php');
include('views/navbars/login.php');
?>
<div class="container-fluid metro">
    <div class="row-fluid login">
        <div class="tile wide app offset2">
            <header class="form">
                <div class="offset1 span9">
                    <h2>Identification</h2>
                    <div class="pull-right">
                        <i class="icon-user"></i>
                    </div>
                </div>
                <div class="clearfix"></div>
            </header>
            <form class="form-horizontal">
                <div class="control-group">
                    <label class="control-label" for="inputEmail">Email</label>

                    <div class="controls">
                        <input type="text" id="inputEmail" placeholder="Email">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="inputPassword">Password</label>

                    <div class="controls">
                        <input type="password" id="inputPassword" placeholder="Password">
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <label class="checkbox padding-bottom">
                            <input type="checkbox"><span class="metro-checkbox">Remember me</span>
                        </label>
                        <button type="submit" class="btn padding-bottom" id="signinBtn">Sign in</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<div id="charms" class="win-ui-dark">
    <div id="theme-charms-section" class="charms-section">
        <div class="charms-header">
            <a href="#" class="close-charms win-command">
                <span class="win-commandimage win-commandring">&#xe15f;</span>
            </a>
            <h2>Help</h2>
        </div>
        <div class="row-fluid">
            <div class="span12">
                <span>Request new Feature</span>
                <span>Update</span>
                <span>Request new Feature</span>
            </div>
        </div>
    </div>
</div>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script>window.jQuery || document.write("<script src='/assets/js/back/jquery-1.9.1.min.js'>\x3C/script>")</script>

<script type="text/javascript" src="/assets/js/google-code-prettify/prettify.js"></script>
<script type="text/javascript" src="/assets/js/back/jquery.mousewheel.js"></script>
<script type="text/javascript" src="/assets/js/back/jquery.scrollTo.js"></script>
<script type="text/javascript" src="/assets/js/back/bootstrap.min.js"></script>
<script type="text/javascript" src="/assets/js/back/bootmetro.js"></script>
<script type="text/javascript" src="/assets/js/back/bootmetro-charms.js"></script>
<script type="text/javascript" src="/assets/js/demo.js"></script>
<script type="text/javascript" src="/assets/js/holder.js"></script>
<script type="text/javascript" src="/assets/js/back/bootstrap-datepicker.js"></script>
<script type="text/javascript" src="/assets/js/back/daterangepicker.js"></script>
<script type="text/javascript" src="/assets/js/back/underscore.js"></script>
<script type="text/javascript" src="/assets/js/back/backbone.js"></script>

<script type="text/javascript">
    $(".metro").metro();
    $("#signinBtn").on('click', function() {
        document.location.href = "/hub.php";
        return false;
    });
</script>

</body>
</html>