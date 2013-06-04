/*global define*/
/*global window*/
/*global document*/
define([
    'jquery',
    'underscore',
    'backbone',
    'stateMachine',
    'erp',
    'bootMetro',
    'text!/templates/hub/modules/timesheets/navigation/bottom_bar.html',
    'i18n!views/hub/modules/timesheets/nls/main'
], function ($, _, Backbone, StateMachine, Erp, MetroUi, bottombarTemplate) {
    'use strict';
    var erp = window.Erp,
        mediator = erp.mediator,
        fxDuration = 1000,
        createStateMachine = function (view) {
            var elt = view.$el;
            _.extend(elt, Backbone.StateMachine, Backbone.Events, {
                states: {
                    'visible': {enter: ['doShow'], leave: ['doHide']}
                },
                transitions: {
                    'init': {
                        'initialized': {
                            enterState: 'visible',
                            callbacks: ['initClickHandlers']
                        }
                    },
                    'visible': {
                        'hide': {
                            enterState: 'hidden',
                            triggers: 'timesheets:nav:bottom:hide',
                            callbacks: []
                        }
                    },
                    'hidden': {
                        'show': {
                            enterState: 'visible',
                            triggers: 'timesheets:nav:bottom:show',
                            callbacks: []
                        }
                    }
                },
                doShow: function () {
                    elt.fadeIn(fxDuration);
                },
                doHide: function () {
                    elt.fadeOut(fxDuration);
                },
                initClickHandlers: function () {
                    mediator.on("timesheets:bottombar:showing", function () {
                        // arm save button click
                        $("#saveDialog").on('click', function () {
                            mediator.publish('timesheets:nav:bottom:save:click');
                        });
                        // arm navigation buttons ...
                        $(".win-command", "#timesheetManagerBottomBar").on('click', function () {
                            var href = $(this).attr('data-href');
                            if (null === href || undefined === href) {
                                return;
                            }
                            document.location.href = href;
                            return false;
                        });
                        $("#addDialNavBarBtn").on('click', function () {
                            mediator.publish("nav:bottom:add:click");
                        });
                    });
                }
            });
            elt.startStateMachine();
            elt.trigger('initialized');
            erp.viewManager.push(Erp.ViewNames.TIMESHEET_MANAGER_BOTTOM_BAR, view);
        },
        TimesheetBottomBarHubView = Backbone.View.extend({/*StatefulView.extend({*/
            el: $("#pageFooter"),
            debugStateMachine: true,
            render: function () {
                this.$el.html(bottombarTemplate);
                this.$el.fadeIn(fxDuration);
                mediator.publish('timesheets:bottombar:showing');
            },
            initialize: function () {
                createStateMachine(this);
            },
            hide: function () {
                this.trigger('hide');
                mediator.publish('timesheets:bottombar:hiding');
            },
            detach: function () {
                // should remove element from the dom but keep it in the view stack
                if (!erp.viewManager.has(Erp.ViewNames.TIMESHEET_MANAGER_BOTTOM_BAR)) {
                    erp.viewManager.push(Erp.ViewNames.TIMESHEET_MANAGER_BOTTOM_BAR, this);
                }
                this.$el.html('');
                mediator.publish('timesheets:bottombar:detached');
            },
            attach: function () {
                // attach the view to the DOM. It should look for view into the view stack
                if (erp.viewManager.has(Erp.ViewNames.TIMESHEET_MANAGER_BOTTOM_BAR)) {
                    var view = erp.viewManager.get(Erp.ViewNames.TIMESHEET_MANAGER_BOTTOM_BAR);
                    view.render();
                    mediator.publish('timesheets:bottombar:attached');
                }

            }
        });
    return TimesheetBottomBarHubView;
});

