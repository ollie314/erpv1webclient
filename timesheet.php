<?php
include('conf.php');
include('views/header.php');
include('views/navbars/subpage.php');
$date = date("d/m/Y");
?>
<div class="container-fluid">

    <div id="content-filters" class="row-fluid">
        <div class="span12">
            <h3>Filter</h3>
        </div>
    </div>
    <div id="content-filters" class="row-fluid">
        <div class="span12">
            <ul class="nav nav-pills">
                <li class="dropdown">
                    <a class="dropdown-toggle accent-color" data-toggle="dropdown" href="#">
                        All projects
                        <b class="caret" href="#"></b>
                    </a>
                    <ul id="projects-filter" class="dropdown-menu">
                        <li><a href="#">All Collaborators</a></li>
                        <li><a href="#">G. Simon</a></li>
                        <li><a href="#">M. Simon</a></li>
                        <li><a href="#">L. Simon</a></li>
                        <li><a href="#">M. Lefebvre</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a class="dropdown-toggle accent-color" data-toggle="dropdown" href="#">
                        All Type
                        <b class="caret" href="#"></b>
                    </a>
                    <ul id="budget-filter" class="dropdown-menu">
                        <li><a href="#">All Type</a></li>
                        <li><a href="#">Atelier</a></li>
                        <li><a href="#">Sur site</a></li>
                    </ul>
                </li>
                <li class="">
                    <a>&nbsp;|&nbsp;</a><span>Sort by&nbsp;</span>
                </li>
                <li class="dropdown">

                    <a class="dropdown-toggle accent-color" data-toggle="dropdown" href="#">
                        Date
                        <b class="caret" href="#"></b>
                    </a>
                    <ul id="sort-filter" class="dropdown-menu">
                        <li><a href="#">Date</a></li>
                        <li><a href="#">Collaborators</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>

    <div class="row-fluid list-search-widget">
        <div class="input-append pull-right">
            <div class="control-group search-range-inline">
                <label class="control-label" for="reservation">Reservation dates:</label>
                <div class="controls">
                    <div class="input-prepend">
                        <span class="add-on"><i class="icon-calendar"></i></span><input type="text" name="reservation" id="reservation" />
                    </div>
                </div>
            </div>
            <input class="span4 search-input" id="appendedInputButtons" type="text">
            <button class="btn btn-primary" type="button"><i class="icon-search"></i></button>
            <div class="btn-group">
                <button class="btn dropdown-toggle" data-toggle="dropdown">
                    Option
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                    <li><a href="#">First</a></li>
                    <li><a href="#">Second</a></li>
                    <li><a href="#">Third</a></li>
                    <li><a href="#">Fourth</a></li>
                </ul>
            </div>
        </div>
    </div>

    <div class="row-fluid">
        <div class="metro span12">
            <table class="table">
                <thead>
                <tr>
                    <th>
                        <label class="checkbox">
                            <input type="checkbox"><span class="metro-checkbox"></span>
                        </label>
                    </th>
                    <th>Date de creation</th>
                    <th>Collaborateur</th>
                    <th>Prestation</th>
                    <th>Dur&eacute;e</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td class="align-center">
                        <label class="checkbox">
                            <input type="checkbox"><span class="metro-checkbox"></span>
                        </label>
                    </td>
                    <td>11-04-2013</td>
                    <td>
                        <a href="#"
                           class="inline-editable"
                           id="username"
                           data-type="text"
                           data-mode="inline"
                           data-send="never"
                           data-pk="1"
                           data-url="/post"
                           data-original-title="Enter username">G. Simon</a>
                    </td>
                    <td>53 - Reparation diverses</td>
                    <td>85min</td>
                    <td>
                        <a href="#" class="btn btn-small btn-info">
                            <i class="icon-search"></i>
                        </a>
                        <a href="#" class="btn btn-small btn-info">
                            <i class="icon-report">&#x0038;</i>
                        </a>
                        <a class="btn btn-small btn-info" href="#">
                            <i class="icon-edit">&#xe164;</i>
                        </a>
                        <a class="action delete btn btn-small btn-info" data-toggle="modal" href="#deleteConfirm"
                            data-target="#deleteConfirm">
                            <i class="icon-remove"></i>
                        </a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="row-fluid">

    </div>
</div>
<div id="deleteConfirm" class="modal message hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h3>Confirm</h3>
    </div>
    <div class="modal-body">
        <p>Do you realy want to delete this item ?</p>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal">Yes</button>
        <button class="btn btn-primary">No</button>
    </div>
</div>
<div id="saveDialog" class="modal message hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h3>Saving</h3>
    </div>
    <div class="modal-body">
        <p>Will display saving information ...</p>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal">Yes</button>
        <button class="btn btn-primary">No</button>
    </div>
</div>
<div id="printDialog" class="modal message hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h3>Printing</h3>
    </div>
    <div class="modal-body">
        <p>Will display printing information ...</p>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal">Yes</button>
        <button class="btn btn-primary">No</button>
    </div>
</div>

<div id="addDialog" class="modal message hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h3>Add Entry</h3>
    </div>
    <div class="modal-body">
        <div class="spinner-elt" id="addDlgSpinner"></div>
        <form class="form-horizontal" action="#" method="post" id="addSiteForm">
            <div class="control-group">
                <label class="control-label" for="inputDate">Date</label>
                <div class="controls">
                    <input type="text" id="dp2" data-date-format="dd/mm/yyyy" value="<?= $date ?>" class="span2 datepicker">
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="inputCollab">Collaborator</label>
                <div class="controls">
                    <select id="inputCollab">
                        <option value="1">G. Simon</option>
                        <option value="2">M. Simon</option>
                        <option value="3">L. Simon</option>
                        <option value="4">M. Lefebvre</option>
                    </select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="inputType">Prestation</label>
                <div class="controls">
                    <select id="inputType">
                        <option value="1">Divers</option>
                        <option value="2">R&eacute;paration</option>
                    </select>
                    <input type="text" id="inputLabelInput" placeholder="Label">
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="inputDuration">Duration</label>
                <div class="controls">
                    <input type="text" id="inputDuration"
                           placeholder="Duration" class="timepicker">
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <button class="btn btn-large" data-dismiss="modal">Cancel</button>
        <button class="btn btn-large btn-info btn-save">Save</button>
        <button class="btn btn-large btn-info btn-save-and-new">Save and add new</button>
    </div>
</div>

<div id="searchForm" class="modal message hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h3>Add new Site</h3>
    </div>
    <div class="modal-body">
        <form class="form-horizontal" action="#" method="post" id="addSiteForm">
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
        </form>
    </div>
    <div class="modal-footer">
        <button class="btn btn-large" data-dismiss="modal">Close</button>
        <button class="btn btn-large btn-primary">Save</button>
    </div>
</div>

<?php
include("views/toolbars/site_manager.php");
include("views/bottom.php");
?>
<script>
    $(function () {
        var spinnerElt = document.getElementById('addDlgSpinner'),
            spinnerAddDlgObj = new Spinner(spinnerOptions);
        $('#reservation').daterangepicker();
        $('.datepicker').datepicker();
        $(document).on('keyup', function( evt ) {
            evt.preventDefault();
            evt.stopPropagation();
            if( !evt.shiftKey  || evt.keyCode != 65 ) {
                return;
            }
            $("#addDialNavBarBtn").trigger('click');
        } );

        $(".btn-save-and-new","#addDialog").on('click', function( evt ) {
            var btn = $(this),
                container = $("#addDialog"),
                body = $('.modal-body form', container)
                $spinner = $('.spinner-elt', container),

            $spinner.height(body.height());

            spinnerAddDlgObj.spin(spinnerElt);
            body.fadeToggle(500, 'swing', function() {
                $spinner.fadeIn(100);
                setTimeout(function() {
                    $spinner.hide();
                    spinnerAddDlgObj.stop(spinnerElt);
                    body.fadeToggle(500);
                }, 3000);
            } );
        } );
        //$('#myTa').wysihtml5();
    });
</script>
</body>
</html>