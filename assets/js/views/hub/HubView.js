define([
    'jquery',
    'underscore',
    'backbone',
    'bootMetro',
    'erp',
    'views/navigation/topnav/UserNavView',
    'views/navigation/bottomnav/BottomBarHubView',
    'views/sidebars/help/SidebarHelpSimpleView',
    'text!/templates/hub/hub.html',
    'i18n!views/hub/modules/nls/hub'
], function ($, _, Backbone, MetroUi,
             Erp, UserNavView, BottomBarHubView,
             SidebarHelpSimpleView, hubTemplate, I18nObject) {
    var erp = window.Erp,
        fxDuration = 1000,
        tplVars = {
            modules_label:I18nObject.modules_label,
            material_manager_label:I18nObject.material_manager_label,
            material_manager_caption:I18nObject.material_manager_caption,
            timesheet_manager_label:I18nObject.timesheet_manager_label,
            timesheet_manager_caption:I18nObject.timesheet_manager_caption,
            addressbook_label:I18nObject.addressbook_label,
            addressbook_caption:I18nObject.addressbook_caption,
            manage_modules_label:I18nObject.manage_modules_label,
            manage_modules_caption:I18nObject.manage_modules_caption,
            install_new_module_label:I18nObject.install_new_module_label,
            check_for_update_label:I18nObject.check_for_update_label
        },
        viewNames = Erp.ViewNames,
        setupStateMachine = function(view, elt) {
            _.extend(elt, Backbone.StateMachine, Backbone.Events, {

                states: {
                    'visible': {enter: ['doShow'], leave: []},
                    'hidden': {enter: ['doHide'], leave: []}
                },

                transitions: {
                    'init': {
                        'initialized': {enterState: 'visible'}
                    },
                    'visible': {
                        'hide': {
                            enterState: 'hidden',
                            triggers: 'hub:hidding:start'
                        }
                    },
                    'hidden': {
                        'show': {
                            enterState: 'visible',
                            triggers: 'hub:showing:start'
                        }
                    }
                },
                doShow: function () {
                    var mediator = window.Erp.mediator;
                    elt.fadeIn(fxDuration, function () {
                        mediator.publish('hub:rendering:complete');
                    });
                },
                doHide: function () {
                    var mediator = window.Erp.mediator;
                    elt.fadeOut(fxDuration, function () {
                    });
                    mediator.publish("hub:hiding");
                }
            });
            elt.on('shown', function () {
                erp.mediator.publish('hub:rendered', {date: new Date().getTime()});
            });
            elt.on('hidded', function () {
                erp.mediator.publish('hub:hidded', {date: new Date().getTime()});
            });
            erp.mediator.subscribe('hub:rendering:start', function () {

            });
            erp.mediator.subscribe('hub:rendering:complete', function () {
                erp.mediator.publish("hub:ready", {target: elt, template: hubTemplate});
                elt.trigger('show');
                initNavbars();
            });
            elt.startStateMachine();
            elt.trigger('initialized');
        },
        initNavbars = function () {
            var userNavView = new UserNavView(),
                sidebarHelpSimpleView = new SidebarHelpSimpleView(),
                bottomBarHubView;
            userNavView.render();
            sidebarHelpSimpleView.render();
            if (!erp.viewManager.has(viewNames.HUB_BOTTOM_BAR)) {
                erp.viewManager.push(viewNames.HUB_BOTTOM_BAR, new BottomBarHubView());
            }
            bottomBarHubView = erp.viewManager.get(viewNames.HUB_BOTTOM_BAR);
            bottomBarHubView.render();
        },
        HubView = Backbone.View.extend({
            el: $("#pageContainer"),
            initialize: function () {
                erp.mediator.publish('hub:intializing', {date: new Date().getTime()});
                var view = this,
                    elt = $(view.el);
                setupStateMachine(view, elt);
                erp.viewManager.push(Erp.ViewNames.HUB_VIEW, view);
                erp.mediator.publish('hub:intialized', {date: new Date().getTime()});
            },
            render: function () {
                var self = this,
                    $elt = self.$el,
                    compiledTpl = _.template(hubTemplate, tplVars);
                //erp.mediator.publish('hub:rendering:start', {date: new Date().getTime(), target: $elt});
                if (self.currentState != 'visible') {
                    $elt.fadeOut(fxDuration, function() {
                        $elt.html(compiledTpl);
                        $elt.fadeIn(fxDuration, function() {
                            erp.mediator.publish('hub:rendering:complete');
                        });
                    });
                } else {
                    setTimeout(function () {
                        erp.mediator.publish('hub:rendering:complete');
                    }, 1000);
                }
            }
        });
    return HubView;
});

