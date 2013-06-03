/*global window */
/*global define */
define([
    'jquery',
    'underscore',
    'backbone',
    'viewManager',
    'stateMachine',
    'mediator',
    'bootMetro',
    'browserDetect',
    'erp',
    'erploader',
    'erpnotification',
    'bootMetroCharms',
    'views/utils/SpinView'
], function ($, _, Backbone, ViewManager, StateMachine, Mediator, MetroUi, BrowserDetect, Erp, ErpLoader, ErpNotification, BootMetroCharms, SpinView) {

    'use strict';

    String.isNullOrEmpty = function (str) {
        return (null === str || str === "");
    };

    var mediator = window.Erp.mediator,
        initLoading = function () {
            var spinView = new SpinView();
            mediator.subscribe('hub:ready', function (data) {
                spinView.stop();
                data.target.html(data.template);
                data.target.fadeIn(1000);
            });
            spinView.render();
        },
        AppRouter = Backbone.Router.extend({
            initialize: function () {
            },
            routes: {
                'manageUsers': 'manageUsers',
                'hub': 'hub',
                'hub/site-manager': 'siteManager',
                'hub/timesheets': 'timesheets',
                'hub/addressbook': 'addressbook',
                '*actions': 'defaultAction'
            },
            hub: function () {
                mediator.publish("hub:access:request");
            },
            manageUsers: function () {
                mediator.publish('hub:usermanagermodule:access:request', {module: "timesheets"});
            },
            siteManager: function () {
                mediator.publish('hub:sitemodule:access:request', {module: "timesheets"});
            },
            timesheets: function () {
                // TODO : add lazy loading behavior
                // fire event to inform about module access request.
                mediator.publish('hub:timesheet:access:request', {module: "timesheets"});
            },
            addressbook: function () {
                // fire event to inform about module access request.
                mediator.publish('hub:addressbook:access:request', {module: "addressbook"});
            }
        }),
        initialize = function () {
            Erp.initialize();
            window.Erp.runMode = window.appRunMode;
            ViewManager.initialize();
            window.Erp.mediator = new Mediator();
            window.Erp.router = new AppRouter();
            window.Erp.loader = new ErpLoader();
            window.Erp.loader.initialize();
            window.Erp.mediator.subscribe('hub:rendering:start', initLoading);
            window.Erp.router.on('route:defaultAction', function (actions) {
                mediator.publish('application:signin:access:request');
            });
            //$(".metro").metro();
            $("#charms").charms();
            window.Erp.mediator.subscribe("erp:notification", function (data) {
                var notification = new ErpNotification(),
                    header = data.hasOwnProperty('header') ? data.header : "Info",
                    message = data.hasOwnProperty('message') ? data.message : "@-@'";
                notification.show(header, message, data);
            });
            Erp.Utils.checkBrowserCompatibility();
            Backbone.history.start();
        };

    return {
        initialize: initialize
    };
});
