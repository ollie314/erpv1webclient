<?php
include('views/header.php');
include('views/navbars/subpage.php');
?>
<div class="container-fluid">

    <div class="row-fluid list-search-widget">
        <div class="input-append pull-right">
            <input class="span4 search-input" id="appendedInputButtons" type="text">
            <button class="btn btn-primary" type="button"><i class="icon-search"></i></button>
        </div>
    </div>

    <div id="tabBar" class="row-fluid">
        <ul class="nav nav-tabs" id="myTab">
            <li class="active"data-toggle="tab"><a href="#home">All</a></li>
            <li><a href="#profile" data-toggle="tab">Clients</a></li>
            <li><a href="#messages" data-toggle="tab">Providers</a></li>
            <li><a href="#settings" data-toggle="tab">Collaborators</a></li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane active" id="home">
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
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Mail</th>
                            <th>Poste</th>
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
                            <td>Simon</td>
                            <td>Lucette</td>
                            <td>lsimon@simnetsa.ch</td>
                            <td>Comptable</td>
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
            <div class="tab-pane" id="profile">
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
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Mail</th>
                            <th>Poste</th>
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
                            <td>Simon</td>
                            <td>Matthieu</td>
                            <td>gsimon@simnetsa.ch</td>
                            <td>Responsable reseau et securite</td>
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
            <div class="tab-pane" id="messages">
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
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Mail</th>
                            <th>Poste</th>
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
                            <td>Simon</td>
                            <td>Guillaume</td>
                            <td>gsimon@simnetsa.ch</td>
                            <td>Responsable domotique &amp; video suvrveillance</td>
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
            <div class="tab-pane" id="settings">
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
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Mail</th>
                            <th>Poste</th>
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
                            <td>Simon</td>
                            <td>Guillaume</td>
                            <td>gsimon@simnetsa.ch</td>
                            <td>Responsable domotique</td>
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
        </div>
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
        <h3>Add new Contact</h3>
    </div>
    <div class="modal-body">
        <form class="form-horizontal" action="#" method="post" id="addSiteForm">
            <div class="control-group">
                <label class="control-label" for="inputFirstname">Firstname</label>
                <div class="controls">
                    <input type="text" id="inputFirstname" placeholder="Firstname">
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="inputLastname">Lastname</label>
                <div class="controls">
                    <input type="text" id="inputLastname" placeholder="Lastname">
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="inputEmail">Email</label>
                <div class="controls">
                    <input type="text" id="inputEmail" placeholder="Email">
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="inputType">Type</label>
                <div class="controls">
                    <select id="inputType">
                        <option value="1">Client</option>
                        <option value="2">Provider</option>
                        <option value="3">Collaborator</option>
                    </select>
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <button class="btn btn-large" data-dismiss="modal">Close</button>
        <button class="btn btn-large btn-primary">Save</button>
        <button class="btn btn-large btn-info">Save and new</button>
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