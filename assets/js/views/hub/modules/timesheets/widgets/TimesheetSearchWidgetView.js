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
    'text!/templates/hub/modules/site/widgets/timesheet_search_widget.html',
    'i18n!views/hub/modules/timesheets/nls/main'
], function ($, _, Backbone, MetroUi, Erp, Mediator, DaterangePicker, searchWidgetTemplate, I18nObject) {
    var erp = window.Erp,
        mSel = "#siteSearchWidgetTemplate",
        mediator = erp.mediator,
        setupDateRangePicker = function () {
            $('#siteSearchWidgetDaterangePicker').daterangepicker();
            //Set the initial state of the picker label
            //$('#siteSearchWidgetDaterangePicker span').html(Date.today().add({ days: -29 }).toString('MMMM d, yyyy') + ' - ' + Date.today().toString('MMMM d, yyyy'));
        },
        TimesheetSearchWidgetView = Backbone.View.extend({
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
                                triggers: 'site:widget:search:ready', // only one can be defined ...
                                callbacks: [] // no callback for this state.
                            }
                        },
                        'busy': {
                            // if release event is fire when the view is in the busy state ...
                            'relase': {
                                enterState: 'free', // enter in free state
                                triggers: 'site:widget:search:released', // trigger this event
                                callbacks: []
                            }
                        },
                        'free': {
                            'working': {
                                enterState: 'busy',
                                triggers: 'site:widget:search:busy', // trigger this event
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
                var vars = {
                        reservation_date_label: I18nObject.reservation_date_label
                    },
                    tpl = _.template(searchWidgetTemplate, vars);
                $(this.eltSel).html(tpl);
                if (!this.mInitialized) {
                    setupDateRangePicker();
                    this.mInitialized = true;
                }
            }
        });
    return TimesheetSearchWidgetView;
});