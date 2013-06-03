<?php
include('../views/header.php');
include('../views/navbars/subpage.php');
?>
<div class="container-fluid">
    <div class="row-fluid">
        <div class="metro span12">
            <div class="metro-sections">
                <div id="section1" class="metro-section tile-span-7">
                    <h2>Plugins</h2>
                    <a class="tile wide imagetext bg-color-orange2" href="/manager/users.php">
                        <div class="image-wrapper">
                            <img src="/assets/img/user_accounts.png"/>
                        </div>
                        <div class="column-text">
                            <div class="text4">
                                Manage User
                            </div>
                        </div>
                        <div class="app-label">Manage your user</div>
                    </a>
                    <a class="tile wide imagetext bg-color-green2" href="/addressbook.php">
                        <div class="image-wrapper">
                            <img src="/assets/img/Notifications.png"/>
                        </div>
                        <div class="column-text">
                            <div class="text4">
                                Manage specific information
                            </div>
                        </div>
                        <div class="app-label">Manage all specific informations such as code, post, ...</div>
                    </a>
                    <a class="tile wide imagetext bg-color-aquaLight" href="/timesheet.php">
                        <div class="image-wrapper">
                            <img src="/assets/img/task_manager.png"/>
                        </div>
                        <div class="column-text">
                            <div class="text4">
                                Logs and stats
                            </div>
                        </div>
                        <div class="app-label">Access to system logs and stats</div>
                    </a>
                    <a class="tile wide imagetext bg-color-yellow2" href="/addressbook.php">
                        <div class="image-wrapper">
                            <img src="/assets/img/sticky_notes.png"/>
                        </div>
                        <div class="column-text">
                            <div class="text4">
                                Sticky notes
                            </div>
                        </div>
                        <div class="app-label">Consult your personnal notes</div>
                    </a>
                    <a class="tile wide imagetext bg-color-gray" href="/addressbook.php">
                        <div class="image-wrapper">
                            <img src="/assets/images/icons/iPhone.png"/>
                        </div>
                        <div class="column-text">
                            <div class="text4">
                                Authorized Devices
                            </div>
                        </div>
                        <div class="app-label">Consult system information</div>
                    </a>
                    <a class="tile wide imagetext bg-color-aqua3" href="/addressbook.php">
                        <div class="image-wrapper">
                            <img src="/assets/img/Info.png"/>
                        </div>
                        <div class="column-text">
                            <div class="text4">
                                System information
                            </div>
                        </div>
                        <div class="app-label">Consult system information</div>
                    </a>
                    <a class="tile wide imagetext bg-color-aqua3" href="/addressbook.php">
                        <div class="image-wrapper">
                            <img src="/assets/img/Help.png"/>
                        </div>
                        <div class="column-text">
                            <div class="text4">
                                Help
                            </div>
                        </div>
                        <div class="app-label">Consult online Help and online FAQ</div>
                    </a>
                </div>
                <div id="section2" class="metro-section tile-span-1">
                    <h2>System</h2>
                    <a class="tile app bg-color-aquaLight" href="#">
                        <div class="image-wrapper">
                            <img src="/assets/img/cd_rom_drive.png" alt=""/>
                        </div>
                        <span class="app-label">Backup your system</span>
                    </a>
                    <a class="tile app bg-color-aquaMiddle" href="#">
                        <div class="image-wrapper">
                            <img src="/assets/img/administrative_tools.png" alt=""/>
                        </div>
                        <span class="app-label">Application account</span>
                    </a>
                </div>
            </div>
        </div>
    </div>

</div>
<?php
include("../views/toolbars/hub.php");
include("../views/bottom.php");
?>
</body>
</html>