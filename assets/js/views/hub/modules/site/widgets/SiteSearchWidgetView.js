//siteSearchWidget
define([
    'jquery',
    'underscore',
    'backbone',
    'bootMetro',
    'erp',
    'mediator',
    'bootstrapDateRangepicker',
    'text!/templates/hub/modules/site/widgets/site_search_widget.html'
], function ($, _, Backbone, MetroUi, Erp, Mediator, DaterangePicker, searchWidgetTemplate) {
    var erp = window.Erp,
        mSel = "#siteSearchWidgetTemplate",
        mediator = erp.mediator,
        setupDateRangePicker = function() {
            $('#siteSearchWidgetDaterangePicker').daterangepicker(
                /*{
                    ranges: {
                        'Today': ['today', 'today'],
                        'Yesterday': ['yesterday', 'yesterday'],
                        'Last 7 Days': [Date.today().add({ days: -6 }), 'today'],
                        'Last 30 Days': [Date.today().add({ days: -29 }), 'today'],
                        'This Month': [Date.today().moveToFirstDayOfMonth(), Date.today().moveToLastDayOfMonth()],
                        'Last Month': [Date.today().moveToFirstDayOfMonth().add({ months: -1 }), Date.today().moveToFirstDayOfMonth().add({ days: -1 })]
                    },
                    opens: 'left',
                    format: 'MM/dd/yyyy',
                    separator: ' to ',
                    startDate: Date.today().add({ days: -29 }),
                    endDate: Date.today(),
                    minDate: '01/01/2012',
                    maxDate: '12/31/2013',
                    locale: {
                        applyLabel: 'Submit',
                        fromLabel: 'From',
                        toLabel: 'To',
                        customRangeLabel: 'Custom Range',
                        daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                        firstDay: 1
                    },
                    showWeekNumbers: true,
                    buttonClasses: ['btn-danger']
                },
                function (start, end) {
                    $('#siteSearchWidgetDaterangePicker span').html(start.toString('MMMM d, yyyy') + ' - ' + end.toString('MMMM d, yyyy'));
                }*/
            );

            //Set the initial state of the picker label
            //$('#siteSearchWidgetDaterangePicker span').html(Date.today().add({ days: -29 }).toString('MMMM d, yyyy') + ' - ' + Date.today().toString('MMMM d, yyyy'));
        },
        SiteSearchWidgetView = Backbone.View.extend({
            eltSel: "#siteSearchWidget",
            el: $("#siteSearchWidget"),
            mInitialized: false,
            initialize : function() {
                /* define the state machine ... */
                _.extend(this, Backbone.StateMachine, Backbone.Events, {
                    states : {
                        /* define all states available in the view and their respective callbacks for enter and leave state */
                        'ready' : {
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
                    transitions : {
                        /* define all transitions for states */
                        'init' : {
                            'initialized' : {
                                enterState: 'ready',
                                triggers: 'site:widget:search:ready', // only one can be defined ...
                                callbacks: [] // no callback for this state.
                            }
                        },
                        'busy': {
                            // if release event is fire when the view is in the busy state ...
                            'relase' : {
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
                    doBusy: function() {

                    },
                    doRelease: function() {

                    }
                });
                this.startStateMachine({debugStateMachine: false});
                this.trigger('initialized');
            },
            render: function () {
                if(!this.mInitialized) {
                    $(this.eltSel).html(searchWidgetTemplate);
                    setupDateRangePicker();
                    this.mInitialized = true;
                }
            }
        });
    return SiteSearchWidgetView;
});