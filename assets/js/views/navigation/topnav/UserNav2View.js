define([
    'jquery',
    'underscore',
    'backbone',
    'stateMachine',
    'erp',
    'stateMachine',
    'bootMetro',
    'text!/templates/navigation/topnav/user2.html'
], function ($, _, Backbone, StateMachine, Erp, ViewManager, MetroUi, userTemplate) {
    var fxDuration = 400,
        erp = window.Erp,
        mediator = erp.mediator,
        createStateMachine = function(view) {
            var elt = view.$el;
            _.extend(elt, Backbone.StateMachine, Backbone.Events, {
                states: {
                    visible: {
                        enter: ['doShow'],
                        leave: ['doHide']
                    },
                    lock: {
                        enter: ['lockBar'],
                        leave: ['unlockBar']
                    }
                },

                transitions: {
                    init: {
                        initialized: {
                            enterState: 'visible',
                            callbacks: [],
                            triggers : 'usernav2becomevisible'
                        }
                    },
                    visible: {
                        hide: {
                            enterState: 'hidden',
                            callbacks: ['cleanupEvents'],
                            triggers : 'usernav2becomehidden'
                        }
                    },
                    hidden: {
                        show: {
                            enterState: 'visible',
                            callbacks: [],
                            triggers : 'usernav2becomevisible'
                        }
                    }
                },
                lockBar: function() {

                },
                unlockBar: function() {

                },
                cleanupEvents: function() {
                    $("#backbutton", this.el).off('click');
                },
                doShow: function () {
                },
                doHide: function () {
                }
            });
            elt.startStateMachine();
            elt.trigger('initialized');
            erp.viewManager.push(Erp.ViewNames.HUB_BOTTOM_BAR, view);
        },
        initNavbars = function () {
            var sidebarHelpAuthentView = new SidebarHelpAuthentView();
            sidebarHelpAuthentView.render();
        },
        UserNav2View = Backbone.View.extend({
        el: $("#nav-bar"),
        initialize: function() {
            createStateMachine(this);
        },
        render: function () {
            this.$el.html(userTemplate);
            mediator.publish("site:navbar:top:rendered");
        }
    });
    return UserNav2View;
});

