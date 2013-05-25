define([
    'jquery',
    'underscore',
    'backbone',
    'erp',
    'mediator',
    'bootstrapDatepicker',
    'views/navigation/topnav/UserNav2View',
    'views/hub/modules/site/sidebars/SiteMainSidebarView',
    'views/hub/modules/site/navigation/SiteManagerBottomBarView',
    'views/hub/modules/site/filter/ListFilterBarView',
    'views/hub/modules/site/widgets/SiteSearchWidgetView',
    'text!/templates/hub/modules/site/list.html'
], function ($, _, Backbone, Erp, Mediator, BootstrapDatepicker, UserNav2View, SiteMainSidebarView, SiteManagerBottomBarView, SiteListFilterBarView, SiteSearchWidgetView, listTemplate) {
    var erp = window.Erp,
        fxDuration = 400,
        mediator = erp.mediator,
        sidebarView,
        userNavView,
        filterBarView,
        bottomBarNavView,
        searchWidget,
        manageTabBar = function(data) {
            var view = data.view,
                now = Date.today();
            $("#siteTabManager").tab()
                .on('click', function(e){
                    e.preventDefault();
                    $(this).tab('show');
                });
                $('a:first', '#siteTabManager').tab('show');
            $("#siteDateWidgetDateInput, #siteSelectDateWidget").each(function(index, elt){
                $(elt).attr('data-date', now.toString("dd-MM-yyyy"));
            });
            $("#siteSelectDateWidget").datepicker();
        },
        initNavbars = function () {
            sidebarView = new SiteMainSidebarView();
            userNavView = new UserNav2View();
            filterBarView = new SiteListFilterBarView;
            bottomBarNavView = new SiteManagerBottomBarView();
            searchWidget = new SiteSearchWidgetView();
            mediator.subscribe("site:list:rendered", function () {
                userNavView.render(); // top bar
                bottomBarNavView.render(); // bottom bar
                filterBarView.render(); // filter bar
                searchWidget.render();
            });
            mediator.subscribe("site:navbar:top:rendered", function () {
                sidebarView.render();
            });

            // manage
            mediator.subscribe("site:list:rendered",manageTabBar);
        },
        ListView = Backbone.View.extend({
            el: $("#pageContainer"),
            mInitialized: false,
            forms: {},
            initialize: function () {
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
                                triggers: 'site:listview:ready',
                                callbacks: ['listViewReadyStateReached']
                            }
                        },
                        'visible': {
                            'hide': {
                                enterState: 'hidden',
                                triggers: 'site:list:hidding:start'
                            }
                        },
                        'hidden': {
                            'show': {
                                enterState: 'visible',
                                triggers: 'site:list:showing:start'
                            }
                        }
                    },
                    prepare: function () {
                    },
                    doShow: function () {
                    },
                    doUnload: function () {
                    },
                    doHide: function () {
                    },
                    doLoad: function () {
                    },
                    listViewReadyStateReached: function () {
                    }
                });
                this.el.startStateMachine({debugStateMachine: false});
                this.el.trigger('initialized');
                erp.viewManager.push(Erp.ViewNames.SITE_MANAGER_LIST_VIEW, this);
            },
            render: function () {
                var elt = this.$el;
                elt.fadeOut(fxDuration, function () {
                    elt.html(listTemplate);
                    elt.fadeIn(fxDuration, function () {
                        initNavbars();
                        mediator.publish("site:list:rendered", {view: this});
                    });
                });
            }
        });
    return ListView;
});