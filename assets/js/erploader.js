/*global define*/
/*global require*/
/*global window*/
/*global alert*/
/*global ErpLoader*/
define([
], function () {

    'use strict';

    var mediator = window.Erp.mediator;

    function ErpLoader() {
        this.loadSiteModule = function () {
            require([
                'jquery',
                'underscore',
                'backbone',
                'views/hub/modules/site/forms/AddProviderFormView',
                'views/hub/modules/site/forms/AddUnitFormView',
                'views/hub/modules/site/forms/AddCodeFormView',
                'views/hub/modules/site/forms/AddSiteFormView',
                'views/hub/modules/site/ListView'
            ], function ($, _, Backbone, AddProviderFormView, AddUnitFormView, AddCodeFormView, AddSiteFormView, ListView) {
                var listView = new ListView(),
                    forms = {
                        addProvider: new AddProviderFormView(),
                        addUnit: new AddUnitFormView(),
                        addCode: new AddCodeFormView(),
                        addSite: new AddSiteFormView()
                    };
                listView.forms = forms;
                listView.render();
            });
        };

        this.loadTimesheetModule = function () {
            alert("Timesheet request");
        };

        this.loadUsermanagerModule = function () {
            alert("Load user module");
        };

        this.loadAddressbookModule = function () {
            require([
                'jquery',
                'underscore',
                'backbone',
                'views/manager/UsersAndGroupsView'
            ], function (UsersAndGroupsView) {
                var usersAndGroupsView = new UsersAndGroupsView();
                usersAndGroupsView.render();
                alert("Addressbook request");
            });
        };

        this.loadHubModule = function () {
            require([
                'jquery',
                'underscore',
                'backbone',
                'views/hub/HubView'
            ], function ($, _, Backbone, HubView) {
                var hubView = new HubView();
                hubView.render();
            });
        };

        this.loadSigninModule = function () {
            require([
                'jquery',
                'underscore',
                'backbone',
                'views/connection/SigninView'
            ], function ($, _, Backbone, SigninView) {
                var signinView = new SigninView();
                signinView.render();
            });
        };
    }

    ErpLoader.prototype.initialize = function () {
        var that = this;
        mediator.subscribe('hub:timesheet:access:request', function () {
            that.loadTimesheetModule.call(that, arguments);
        });
        mediator.subscribe('hub:addressbook:access:request', function () {
            that.loadAddressbookModule.call(that, arguments);
        });
        mediator.subscribe('hub:sitemodule:access:request', function () {
            that.loadSiteModule.call(that, arguments);
        });
        mediator.subscribe('hub:access:request', function () {
            that.loadHubModule.call(that, arguments);
        });
        mediator.subscribe('application:signin:access:request', function () {
            that.loadSigninModule.call(that, arguments);
        });
        mediator.subscribe('hub:usermanagermodule:access:request', function () {
            that.loadUsermanagerModule.call(that, arguments);
        });
    };

    return ErpLoader;
});