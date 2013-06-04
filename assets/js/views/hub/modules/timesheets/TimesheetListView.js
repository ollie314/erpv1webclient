/*global define*/
/*global window*/
/*global console*/
define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrapDatepicker',
    'erp',
    'views/navigation/topnav/UserNav2View',
    'views/hub/modules/timesheets/sidebars/TimesheetMainSidebarView',
    'views/hub/modules/timesheets/navigation/TimesheetManagerBottomBarView',
    'views/hub/modules/timesheets/filter/TimesheetListFilterBarView',
    'views/hub/modules/timesheets/widgets/TimesheetSearchWidgetView',
    'views/hub/modules/timesheets/TimesheetListViewByCollab',
    'views/hub/modules/timesheets/TimesheetListViewBySite',
    'text!/templates/hub/modules/timesheets/list.html',
    'i18n!views/hub/modules/timesheets/nls/main'
], function ($, _, Backbone, BootstrapDatepicker, Erp, UserNav2View, TimesheetMainSidebarView, TimesheetManagerBottomBarView, TimesheetListFilterBarView, TimesheetSearchWidgetView, TimesheetListViewByCollab, TimesheetListViewBySite, listTemplate, I18nObject) {

    'use strict';

    var erp = window.Erp,
        fxDuration = 400,
        mediator = erp.mediator,
        sidebarView,
        userNavView,
        filterBarView,
        bottomBarNavView,
        searchWidget,
        listViewBySite,
        listViewByCollab,
        manageTabBar = function (data) {
            var view = data.view,
                now = Date.today();
            $("#timesheetTabManager").tab()
                .on('click', function (e) {
                    var elt = $("a", "#timesheetTabManager li.active"),
                        href = elt.attr("href");
                    e.preventDefault();
                    $(this).tab('show');
                    mediator.publish('timesheet:list:tab:change', {target: elt, destination: href});
                });
            $('a:first', '#timesheetTabManager').tab('show');
            $("#timesheetDateWidgetDateInput, #timesheetSelectDateWidget").each(function (index, elt) {
                $(elt).attr('data-date', now.toString("dd-MM-yyyy"));
            });
            $("#timesheetSelectDateWidget").datepicker();
        },
        initNavbars = function () {
            listViewBySite = new TimesheetListViewBySite();
            listViewByCollab = new TimesheetListViewByCollab();
            sidebarView = new TimesheetMainSidebarView();
            userNavView = new UserNav2View();
            filterBarView = new TiemsheetListFilterBarView;
            bottomBarNavView = new TimesheetManagerBottomBarView();
            searchWidget = new TimesheetSearchWidgetView();
            mediator.subscribe("timesheet:list:rendered", function () {
                userNavView.render(); // top bar
                bottomBarNavView.render(); // bottom bar
                filterBarView.render(); // filter bar
                searchWidget.render(); // search widget
                listViewBySite.render(); // rendering the first tab in the middle of the page
                listViewByCollab.render(); // rendering the second tab in the middle of the page
            });
            mediator.subscribe("timesheet:navbar:top:rendered", function () {
                sidebarView.render();
            });

            // manage
            mediator.subscribe("timesheet:list:rendered", manageTabBar);
        },
        TimesheetListView = Backbone.View.extend({
            el: $("#pageContainer"),
            mInitialized: false,
            forms: {},
            initialize: function () {
                var view = this,
                    elt = view.el;
                _.extend(this.el, Backbone.StateMachine, Backbone.Events, {
                    states: {
                        'ready': {enter: ['prepare'], leave: []},
                        'visible': {enter: ['doShow'], leave: ['doUnload']},
                        'hidden': {enter: ['doHide'], leave: ['doLoad']}
                    },
                    transitions: {
                        'init': {
                            'initialized': {
                                enterState: 'ready',
                                triggers: 'timesheet:listview:ready',
                                callbacks: ['listViewReadyStateReached']
                            }
                        },
                        'visible': {
                            'hide': {
                                enterState: 'hidden',
                                triggers: 'timesheet:list:hidding:start'
                            }
                        },
                        'hidden': {
                            'show': {
                                enterState: 'visible',
                                triggers: 'timesheet:list:showing:start'
                            }
                        }
                    },
                    prepare: function () {
                        mediator.subscribe('hub:timesheet:access:request', function () {
                            view.render();
                        });
                    },
                    doShow: function () {
                        var $elt = $(elt);
                        $elt.fadeIn(fxDuration, function () {
                            mediator.publish("modules:timesheet:shown");
                        });
                    },
                    doUnload: function () {
                        mediator.publish("modules:timesheet:unloaded");
                    },
                    doHide: function () {
                        var $elt = $(elt);
                        $elt.fadeIn(fxDuration, function () {
                            mediator.publish("modules:timesheet:shown");
                        });
                    },
                    doLoad: function () {
                        mediator.publish("modules:timesheet:loaded");
                    },
                    listViewReadyStateReached: function () {
                    }
                });
                this.el.startStateMachine({debugStateMachine: false});
                this.el.trigger('initialized');
                erp.viewManager.push(Erp.ViewNames.SITE_MANAGER_LIST_VIEW, this);
            },
            render: function () {
                var elt = this.$el,
                // compiled template reference
                    tpl,
                // list of variables and their respective translations
                    vars = {
                        list_title: I18nObject.list_page_invite,
                        filter_title: I18nObject.filter_title,
                        collaborator_tab_title: I18nObject.collaborator_tab_title,
                        site_table_title: I18nObject.site_table_title
                    };

                elt.fadeOut(fxDuration, function () {
                    tpl = _.template(listTemplate, vars);
                    elt.html(tpl);
                    elt.fadeIn(fxDuration, function () {
                        initNavbars();
                        mediator.publish("timesheet:list:rendered", {view: this});
                    });
                });
            }
        });
    return TimesheetListView;
},
    /**
     * Handling module loading error.
     *
     * @param err : loading error
     */
    function (err) {
        'use strict';
        console.log("Error during module loading [%o]", err);
    }
    );
