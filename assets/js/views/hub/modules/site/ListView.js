define([
    'jquery',
    'underscore',
    'backbone',
    'erp',
    'mediator',
    'views/navigation/topnav/UserNav2View',
    'views/hub/modules/site/sidebars/SiteMainSidebarView',
    'views/hub/modules/site/navigation/SiteManagerBottomBarView',
    'views/hub/modules/site/filter/ListFilterBarView',
    'text!/templates/hub/modules/site/list.html'
], function ($, _, Backbone, Erp, Mediator, UserNav2View, SiteMainSidebarView, SiteManagerBottomBarView, SiteListFilterBarView, listTemplate) {
    var erp = window.Erp,
        fxDuration = 400,
        mediator = erp.mediator,
        sidebarView,
        userNavView,
        filterBarView,
        bottomBarNavView,
        initNavbars = function () {
            sidebarView = new SiteMainSidebarView();
            userNavView = new UserNav2View();
            filterBarView = new SiteListFilterBarView;
            bottomBarNavView = new SiteManagerBottomBarView();
            mediator.subscribe("site:list:rendered", function () {
                userNavView.render(); // top bar
                bottomBarNavView.render(); // bottom bar
                filterBarView.render(); // filter bar
            });
            mediator.subscribe("site:navbar:top:rendered", function () {
                sidebarView.render();
            });
        },
        ListView = Backbone.View.extend({
            el: $("#pageContainer"),
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
                        mediator.publish("site:list:rendered");
                    });
                });
            }
        });
    return ListView;
});