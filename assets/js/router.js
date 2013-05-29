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
    'views/utils/SpinView',
    'views/hub/modules/site/forms/AddProviderFormView',
    'views/hub/modules/site/forms/AddUnitFormView',
    'views/hub/modules/site/forms/AddCodeFormView',
    'views/hub/modules/site/forms/AddSiteFormView',
    'views/hub/modules/site/ListView',
    'views/connection/SigninView',
    'views/manager/UsersAndGroupsView',
    'views/hub/HubView'
], function ($, _, Backbone, ViewManager,
             StateMachine, Mediator, MetroUi,
             BrowserDetect, Erp, SpinView,
             AddProviderFormView, AddUnitFormView, AddCodeFormView, AddSiteFormView, ListView,
             SigninView, UsersAndGroupsView, HubView /*, FooterView*/) {

    String.isNullOrEmpty = function (str) {
        return (null == str || str == "");
    };

    var initLoading = function () {
            var spinView = new SpinView();
            window.Erp.mediator.subscribe('hub:ready', function (data) {
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
                var hubView = new HubView();
                hubView.render();
            },
            manageUsers: function () {
                var usersAndGroupsView = new UsersAndGroupsView();
                usersAndGroupsView.render();
            },
            siteManager: function () {
                var listView = new ListView(),
                    forms = {
                        addProvider: new AddProviderFormView(),
                        addUnit: new AddUnitFormView(),
                        addCode: new AddCodeFormView(),
                        addSite: new AddSiteFormView()
                    };
                listView.forms = forms;
                listView.render();
            },
            timesheets: function () {

            },
            addressbook: function () {

            }
        });

    var initialize = function () {
        Erp.initialize();
        window.Erp.runMode = window.appRunMode;
        ViewManager.initialize();
        window.Erp.mediator = new Mediator();
        window.Erp.router = new AppRouter();
        window.Erp.mediator.subscribe('hub:rendering:start', initLoading);
        window.Erp.router.on('route:defaultAction', function (actions) {
            var signinView = new SigninView();
            signinView.render();
        });
        $(".metro").metro();
        $("#charms").charms();
        Erp.Utils.checkBrowserCompatibility();
        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
})
;
