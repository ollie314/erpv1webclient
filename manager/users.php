<?php
include('../views/header.php');
include('../views/navbars/subpage.php');
?>
<div id="pageContainer" class="container-fluid metro"></div>

<div id="deleteConfirm" class="modal message hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
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

<div id="addDialog" class="modal message hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h3>Add new User</h3>
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

<div id="searchForm" class="modal message hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
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
include("../views/toolbars/site_manager.php");
include("../views/bottom.php");
?>
</body>
</html>