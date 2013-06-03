<?php
include('views/header.php');
include('views/navbars/subpage.php');
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
                        <li><a href="#">All projects</a></li>
                        <li><a href="#">ACME</a></li>
                        <li><a href="#">Surface</a></li>
                        <li><a href="#">OSX</a></li>
                        <li><a href="#">WinRT</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a class="dropdown-toggle accent-color" data-toggle="dropdown" href="#">
                        All clients
                        <b class="caret" href="#"></b>
                    </a>
                    <ul id="budget-filter" class="dropdown-menu">
                        <li><a href="#">All clients</a></li>
                        <li><a href="#">Corthay</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a class="dropdown-toggle accent-color" data-toggle="dropdown" href="#">
                        All Prestataires
                        <b class="caret" href="#"></b>
                    </a>
                    <ul id="budget-filter" class="dropdown-menu">
                        <li><a href="#">All prestataires</a></li>
                        <li><a href="#">Simnet</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a class="dropdown-toggle accent-color" data-toggle="dropdown" href="#">
                        All employee
                        <b class="caret" href="#"></b>
                    </a>
                    <ul id="budget-filter" class="dropdown-menu">
                        <li><a href="#">All employee</a></li>
                        <li><a href="#">G. Simon</a></li>
                        <li><a href="#">M. Simon</a></li>
                        <li><a href="#">L. Simon</a></li>
                    </ul>
                </li>
                <li class="">
                    <a>&nbsp;|&nbsp;</a><span>Sort by&nbsp;</span>
                </li>
                <li class="dropdown">

                    <a class="dropdown-toggle accent-color" data-toggle="dropdown" href="#">
                        Project name
                        <b class="caret" href="#"></b>
                    </a>
                    <ul id="sort-filter" class="dropdown-menu">
                        <li><a href="#">Project name</a></li>
                        <li><a href="#">Budget Cost</a></li>
                        <li><a href="#">Duration</a></li>
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
                    <th>Ouvrage</th>
                    <th>Sous ouvrage</th>
                    <th>Libell&eacute;</th>
                    <th>Unit&eacute;</th>
                    <th>Qt&eacute;</th>
                    <th>Prix/u</th>
                    <th>Total</th>
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
                    <td>Mini Erp</td>
                    <td>Corthay</td>
                    <td>Mini Erp</td>
                    <td>Pce</td>
                    <td>1</td>
                    <td>2500.00</td>
                    <td>2500.00</td>
                    <td>
                        <a href="#" class="btn btn-small">
                            <i class="icon-search"></i>
                        </a>
                        <a href="#" class="btn btn-small">
                            <i class="icon-report">&#x0038;</i>
                        </a>
                        <a class="btn btn-small" href="#">
                            <i class="icon-edit">&#xe164;</i>
                        </a>
                        <a class="action delete btn btn-small" data-toggle="modal" href="#deleteConfirm"
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

<div id="addDialog" class="modal message hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
        $('#reservation').daterangepicker();
    });
</script>
</body>
</html>