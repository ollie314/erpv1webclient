/*global define*/
/*global window*/
define([
    'jquery',
    'underscore',
    'backbone',
    'bootMetro',
    'erp',
    'mediator',
    'bootstrapDateRangepicker',
    'text!/templates/hub/modules/timesheet/widgets/timesheet_search_widget.html',
    'i18n!views/hub/modules/timesheets/nls/sidebar'
], function ($, _, Backbone, MetroUi, Erp, Mediator, DaterangePicker, searchWidgetTemplate, I18nObject) {
    'use strict';
    var erp = window.Erp,
        mSel = "#timesheetSearchWidgetTemplate",
        mediator = erp.mediator,
        setupDateRangePicker = function () {
            $('#timesheetSearchWidgetDaterangePicker').daterangepicker();
            //Set the initial state of the picker label
            //$('#timesheetSearchWidgetDaterangePicker span').html(Date.today().add({ days: -29 }).toString('MMMM d, yyyy') + ' - ' + Date.today().toString('MMMM d, yyyy'));
        },
        TimesheetMainSidebarView = Backbone.View.extend({
            eltSel: "#timesheetSearchWidget",
            el: $("#timesheetSearchWidget"),
            mInitialized: false,
            initialize: function () {
                /* define the state machine ... */
                _.extend(this, Backbone.StateMachine, Backbone.Events, {
                    states: {
                        /* define all states available in the view and their respective callbacks for enter and leave state */
                        'ready': {
                            enter: [],
                            leave: []
                        },
                        'busy': {
                            enter: ['doBusy'],
                            leave: []
                        },
                        'free': {
                            enter: ['doRelease'],
                            leave: []
                        }
                    },
                    transitions: {
                        /* define all transitions for states */
                        'init': {
                            'initialized': {
                                enterState: 'ready',
                                triggers: 'timesheets:widget:search:ready', // only one can be defined ...
                                callbacks: [] // no callback for this state.
                            }
                        },
                        'busy': {
                            // if release event is fire when the view is in the busy state ...
                            'relase': {
                                enterState: 'free', // enter in free state
                                triggers: 'timesheets:widget:search:released', // trigger this event
                                callbacks: []
                            }
                        },
                        'free': {
                            'working': {
                                enterState: 'busy',
                                triggers: 'timesheets:widget:search:busy', // trigger this event
                                callbacks: []
                            }
                        }
                    },

                    // define handlers to setup behavior.
                    doBusy: function () {

                    },
                    doRelease: function () {

                    }
                });
                this.startStateMachine({debugStateMachine: false});
                this.trigger('initialized');
            },
            render: function () {
                if (!this.mInitialized) {
                    $(this.eltSel).html(searchWidgetTemplate);
                    setupDateRangePicker();
                    this.mInitialized = true;
                }
            }
        });
    return TimesheetMainSidebarView;
});