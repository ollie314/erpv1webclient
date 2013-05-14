define([
    'browserDetect',
    'mediator',
], function (BrowserDetect, Mediator) {

    function Erp() {
        this.runMode = 0;
        this.authenticated = false;
        this.lastSessionEnd = null;
        this.session = {}
        this.Views = {};
        this.Collections = {};
        this.Models = {};
        this.auth = {
            secret: '',
            states: {}
        };
    }

    Erp.prototype.onSigninSuccess = function(user, event, date) {
        if(this.authenticated) {
            // task has been already performed
            return;
        }
        date = date || new Date();
        this.authenticated = true;
        this.session.user = user;
        this.session.loginDate = date;
    }

    Erp.prototype.onSignoutSuccess = function(user, event, date) {
        date = date || new Date();
        this.authenticated = false;
        this.session = {}
        this.lastSessionEnd = date;
    }

    Erp.initialize = function () {
        if (window.Erp == undefined) {
            window.Erp = new Erp();
        }
        if(window.Erp.mediator == undefined) {
            window.Erp.mediator = new Mediator();
        }

        var erp = window.Erp,
            mediator = erp.mediator;

        mediator.on(Erp.Events.SIGNIN_SUCCESS, erp.onSigninSuccess);
        mediator.on(Erp.Events.AUTHENT_SUCCESS, erp.onSigninSuccess);
        mediator.on(Erp.Events.SIGNOUT_SUCCESS, erp.onSignoutSuccess);
    };

    Erp.RunMode = {
        PROD : 0,
        STAGING : 1,
        TESTING : 2,
        DEV : 3
    }

    Erp.Events = {
        ERP_START: 'erp:start',
        ERP_STOP: 'erp:stop',
        AUTHENT_SUCCESS: 'erp:authent:success',
        AUTHENT_FAILURE: 'erp:authent:failure',
        SIGNIN_SUCCESS: 'erp:signin:success',
        SIGNOUT_SUCCESS: 'erp:singout:success',
        AJAX_LOADING_START: 'ajax:loadingstart',
        AJAX_LOADING_COMPLETE: 'ajax:loadingcomplete',
        AJAX_LOADING_SUCCESS: 'ajax:loadingssuccess',
        AJAX_LOADING_FAILURE: 'ajax:loadingfailure'
    };

    Erp.ViewNames = {
        HUB_BOTTOM_BAR: "bottomBarHubView",
        HUB_VIEW: "hubView",
        SITE_MANAGER_LIST_VIEW: 'siteManagerListView',
        SITE_MANAGER_BOTTOM_BAR: 'siteManagerBottomBarView',
        SITE_MANAGER_LIST_FILTER_VIEW: 'siteManagerListFilterView'
    };

    Erp.Utils = {
        checkBrowserCompatibility: function () {
            var detector = new BrowserDetect();
            detector.init();
            if (detector.browser == "Explorer") {
                $(".chromeframe").show();
            }
        }
    };

    Erp.initialize();

    return Erp;
});