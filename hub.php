<?php
include('views/header.php');
include('views/navbars/hub.php');
?>
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="metro span12">
                <div class="metro-sections">
                    <div id="section1" class="metro-section tile-span-4">
                        <h2>Modules</h2>
                        <a class="tile wide imagetext bg-color-blueLight" href="/site_manager.php">
                            <div class="image-wrapper">
                                <img src="/assets/images/icons/Libraries_alt.png"/>
                            </div>
                            <div class="column-text">
                                <div class="text4">
                                    Site manager
                                </div>
                            </div>
                            <div class="app-label">Manage your site</div>
                        </a>

                        <a class="tile wide imagetext bg-color-magenta" href="/timesheet.php">
                            <div class="image-wrapper">
                                <img src="/assets/images/icons/History.png"/>
                            </div>
                            <div class="column-text">
                                <div class="text4">
                                    Timesheet
                                </div>
                            </div>
                            <div class="app-label">Manage timesheets</div>
                        </a>

                        <a class="tile wide imagetext bg-color-pinky" href="/addressbook.php">
                            <div class="image-wrapper">
                                <img src="/assets/images/icons/Contacts_Folder.png"/>
                            </div>
                            <div class="column-text">
                                <div class="text4">
                                    Address book
                                </div>
                            </div>
                        </a>

                        <a class="tile app wide bg-color-darken" href="/manager.php">
                            <div class="image-wrapper win-ui-dark top-padding-tiles">
                                <button class="win-command">
                                    <span class="win-commandimage win-commandring">&#xe03e;</span>
                                </button>
                            </div>
                        </a>

                    </div>

                    <div id="section2" class="metro-section tile-span-2">
                        <h2>Erp</h2>
                        <a class="tile wide imagetext bg-color-blue" href="/manager/modules.php">
                            <div class="image-wrapper">
                                <img src="/assets/img/My Apps.png"/>
                            </div>
                            <div class="column-text">
                                <div class="text4">
                                    Manage modules, templates, users installed on your system
                                </div>
                            </div>
                            <span class="app-label">Manage your system</span>
                        </a>

                        <a class="tile app bg-color-orange" href="./components.html">
                            <div class="image-wrapper">
                                <img src="/assets/img/RegEdit.png" alt=""/>
                            </div>
                            <span class="app-label">Install new modules</span>
                        </a>

                        <a class="tile app bg-color-red" href="./javascript.html">
                            <div class="image-wrapper">
                                <img src="/assets/img/Devices.png" alt=""/>
                            </div>
                            <span class="app-label">Check for update </span>
                        </a>

                    </div>
                </div>
            </div>
        </div>

    </div>
<?php
include("views/toolbars/hub.php");
include("views/bottom.php");
?>
</body>
</html>