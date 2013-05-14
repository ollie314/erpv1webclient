define([
    'jquery',
    'underscore',
    'backbone',
    'bootMetro',
    'erp',
    'mediator',
    'viewManager',
    'views/navigation/topnav/UserNavView',
    'views/navigation/bottomnav/BottomBarHubView',
    'views/sidebars/help/SidebarHelpSimpleView',
    'text!/templates/hub/hub.html'
], function ($, _, Backbone, MetroUi, Erp, Mediator, ViewManager, UserNavView, BottomBarHubView, SidebarHelpSimpleView, hubTemplate) {
    var erp = window.Erp,
        fxDuration = 1000,
        viewManager = erp.viewManager,
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
                        //mediator.publish('hub:rendering:complete');
                    });
                },
                doHide: function () {
                    var mediator = window.Erp.mediator;
                    elt.fadeOut(fxDuration, function () {
                    });
                    //mediator.publish("application:loading:start");
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
                window.log.debug(hubTemplate);
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
            if (!viewManager.has(viewNames.HUB_BOTTOM_BAR)) {
                viewManager.push(viewNames.HUB_BOTTOM_BAR, new BottomBarHubView());
            }
            bottomBarHubView = viewManager.get(viewNames.HUB_BOTTOM_BAR);
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
                    $elt = self.$el;
                //erp.mediator.publish('hub:rendering:start', {date: new Date().getTime(), target: $elt});
                if ($elt.currentState != 'visible') {
                    $elt.fadeOut(fxDuration, function() {
                        $elt.html(hubTemplate);
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

