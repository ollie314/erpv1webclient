<?php
include('../../conf.php');
include('../../views/header.php');
include('../../views/navbars/subpage.php');
?>
<div class="container-fluid">
    <div class="row-fluid wizard pivot slide">
        <div class="span3">
            <div id="wizard-steps-container">
                <h2>Wizard Title</h2>

                <ul id="wizard-steps">
                    <li class="active">
                        <a href="#pivot-item-1">Step 1 lorem ipsum</a>
                    </li>
                    <li class="">
                        <a href="#pivot-item-2">Step 2 lorem ipsum</a>
                    </li>
                    <li>
                        <a href="#pivot-item-3">Step 3 lorem ipsum</a>
                    </li>
                    <li>
                        <a href="#pivot-item-4">Step 4 lorem ipsum</a>
                    </li>
                    <li>
                        <a href="#pivot-item-5">Step 5 lorem ipsum</a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="span9">
            <section id="wizard-step-content">
                <div class="sliding-items">
                    <div id="sliding-item-1" class="sliding-item active">
                        <h2>Choose a colaborator</h2>
                        <h3>Select a callborator in the table above</h3>
                        <form class="form-horizontal">
                            <fieldset>
                                <legend>Legend</legend>
                                <label>Label name</label>
                                <input type="text" placeholder="Type something…">
                                <span class="help-block">Example block-level help text here.</span>
                                <label class="checkbox">
                                    <input type="checkbox"><span class="metro-checkbox">Check me out</span>
                                </label>
                                <button type="submit" class="btn">Submit</button>
                            </fieldset>
                        </form>
                    </div>
                    <div id="sliding-item-2" class="sliding-item">
                        <h2>Step 2 Title</h2>

                        <h3>Subtitle</h3>

                        <form class="form-horizontal">
                            <div class="clearme header">
                                <div class="col site"><input type="text" readonly="readonly" value="Chantier"/></div>
                                <div class="col type"><input type="text" readonly="readonly" value="Type"/></div>
                                <div class="col"><input type="text" readonly="readonly" value="Nb"/></div>
                                <div class="col"><input type="text" readonly="readonly" value="LU."/></div>
                                <div class="col"><input type="text" readonly="readonly" value="MA."/></div>
                                <div class="col"><input type="text" readonly="readonly" value="ME."/></div>
                                <div class="col"><input type="text" readonly="readonly" value="JE."/></div>
                                <div class="col"><input type="text" readonly="readonly" value="Ve."/></div>
                                <div class="col last"><input type="text" readonly="readonly" value="Total"/></div>
                            </div>
                            <div class="clearme">
                                <div class="col entry site">Ski Club Geneve</div>
                                <div class="col entry nb">
                                    <select name="type">
                                        <option value="1">ATE</option>
                                        <option value="2">POS</option>
                                    </select>
                                </div>
                                <div class="col entry day">
                                    <input type="text" value="0" />
                                </div>
                                <div class="col entry day">
                                    <input type="text" value="1" />
                                </div>
                                <div class="col entry day">
                                    <input type="text" value="2" />
                                </div>
                                <div class="col entry day">
                                    <input type="text" value="3" />
                                </div>
                                <div class="col entry day">
                                    <input type="text" value="2" />
                                </div>
                                <div class="col entry day">
                                    <input type="text" value="0" />
                                </div>
                                <div class="col sum">
                                    <input type="text" value="22" />
                                </div>
                            </div>
                        </form>
                        <div class="clearfix"></div>
                    </div>
                    <div id="sliding-item-3" class="sliding-item">
                        <h2>Step 3 Title</h2>

                        <h3>Subtitle</h3>

                        <form class="form-horizontal">

                        </form>
                    </div>
                    <div id="sliding-item-4" class="sliding-item">
                        <h2>Step 4 Title</h2>

                        <h3>Subtitle</h3>

                        <form class="form-horizontal">

                        </form>
                    </div>
                    <div id="sliding-item-5" class="sliding-item">
                        <h2>Step 5 Title</h2>

                        <h3>Subtitle</h3>

                        <form class="form-horizontal">

                        </form>
                    </div>
                </div>
            </section>
        </div>
    </div>
</div>

<footer class="win-ui-dark win-commandlayout navbar-fixed-bottom">
    <div class="container">
        <div class="row">
            <div class="span12 align-right">

                <button class="win-command">
                    <span class="win-commandimage win-commandring">&#xe1cd;</span>
                    <span class="win-label">Previous</span>
                </button>

                <button class="win-command">
                    <span class="win-commandimage win-commandring">&#xe1ca;</span>
                    <span class="win-label">Next</span>
                </button>

            </div>

        </div>
    </div>
</footer>
<?php
include("../../views/toolbars/site_manager.php");
include("../../views/bottom.php");
?>
<script>
    $(function () {
        var wizzController = $("#wizard-steps-container"),
            wizzContent = $("#wizard-step-content");
        $("a", wizzController).on('click', function () {
            var parentLi = $(this).closest('li');
            if (parentLi.hasClass('active')) {
                return;
            }

            $("li", wizzController).each(function (index, element) {
                $(element).removeClass('active');
            });
            $(".pivot-item", wizzContent).each(function(index, element) {
                $(element).removeClass('active');
            });
            parentLi.addClass('active');
            $($(this).attr("href")).addClass("active");
            return false;
        });
    });
</script>
</body>
</html>