define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrapDatepicker',
    'erp',
    'views/navigation/topnav/UserNav2View',
    'views/hub/modules/site/sidebars/SiteMainSidebarView',
    'views/hub/modules/site/navigation/SiteManagerBottomBarView',
    'views/hub/modules/site/filter/ListFilterBarView',
    'views/hub/modules/site/widgets/SiteSearchWidgetView',
    'views/hub/modules/site/ListViewBySite',
    'views/hub/modules/site/ListViewByDate',
    'text!/templates/hub/modules/site/list.html',
    'i18n!views/hub/modules/site/nls/main'
], function ($, _, Backbone, BootstrapDatepicker, Erp, UserNav2View, SiteMainSidebarView, SiteManagerBottomBarView, SiteListFilterBarView, SiteSearchWidgetView, ListViewBySite, ListViewByDate, listTemplate, TranslationObject) {
        var erp = window.Erp,
            fxDuration = 400,
            mediator = erp.mediator,
            sidebarView,
            userNavView,
            filterBarView,
            bottomBarNavView,
            searchWidget,
            listViewBySite,
            listViewByDate,
            manageTabBar = function (data) {
                var view = data.view,
                    now = Date.today();
                $("#siteTabManager").tab()
                    .on('click', function (e) {
                        var elt = $("a", "#siteTabManager li.active"),
                            href = elt.attr("href");
                        e.preventDefault();
                        $(this).tab('show');
                        mediator.publish('site:list:tab:change', {target: elt, destination: href});
                    });
                $('a:first', '#siteTabManager').tab('show');
                $("#siteDateWidgetDateInput, #siteSelectDateWidget").each(function (index, elt) {
                    $(elt).attr('data-date', now.toString("dd-MM-yyyy"));
                });
                $("#siteSelectDateWidget").datepicker();
            },
            initNavbars = function () {
                listViewBySite = new ListViewBySite();
                listViewByDate = new ListViewByDate();
                sidebarView = new SiteMainSidebarView();
                userNavView = new UserNav2View();
                filterBarView = new SiteListFilterBarView;
                bottomBarNavView = new SiteManagerBottomBarView();
                searchWidget = new SiteSearchWidgetView();
                mediator.subscribe("site:list:rendered", function () {
                    userNavView.render(); // top bar
                    bottomBarNavView.render(); // bottom bar
                    filterBarView.render(); // filter bar
                    searchWidget.render(); // search widget
                    listViewBySite.render(); // rendering the first tab in the middle of the page
                    listViewByDate.render(); // rendering the second tab in the middle of the page
                });
                mediator.subscribe("site:navbar:top:rendered", function () {
                    sidebarView.render();
                });

                // manage
                mediator.subscribe("site:list:rendered", manageTabBar);
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
                    var elt = this.$el,
                    // compiled template reference
                        tpl,
                    // list of variables and their respective translations
                        vars = {
                            list_title: TranslationObject.list_page_invite,
                            filter_title: TranslationObject.filter_title,
                            site_tab_title: TranslationObject.site_tab_title,
                            date_tab_title: TranslationObject.date_tab_title
                        };

                    elt.fadeOut(fxDuration, function () {
                        tpl = _.template(listTemplate, vars);
                        elt.html(tpl);
                        elt.fadeIn(fxDuration, function () {
                            initNavbars();
                            mediator.publish("site:list:rendered", {view: this});
                        });
                    });
                }
            });
        return ListView;
    },
    /**
     * Handling module loading error.
     *
     * @param err : loading error
     */
        function (err) {
        console.log("Error during module loading [%o]", err);
    }
);