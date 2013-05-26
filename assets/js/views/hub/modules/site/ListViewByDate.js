define([
    'jquery',
    'underscore',
    'backbone',
    'bootMetro',
    'bootMetroCharms',
    'erp',
    'text!/templates/hub/modules/site/date_list.html'
], function ($, _, Backbone, MetroUi, BootMetroChams, Erp, eltTemplate) {
    var erp = window.Erp,
        containerSel = "#listByDate",
        mediator = erp.mediator,
        ListViewByDate = Backbone.View.extend({
            el: $("#listByDate"),
            initialize : function() {
                var elt = $(this.el);
                _.extend(elt, Backbone.StateMachine, Backbone.Events, {
                    states: {
                        'ready': {enter: ['prepare'], leave: []},
                        'visible': {enter: ['doShow'], leave: ['doUnload']},
                        'hidden': {enter: ['doHide'], leave: ['doLoad']},
                        'disposed' : {enter:['dispose'], leave: []}
                    },
                    transitions: {
                        'init': {
                            'initialized': {
                                enterState: 'ready',
                                triggers: 'site:list:viewbydate:ready',
                                callbacks: ['listViewByDateReadyStateReached']
                            }
                        },
                        'visible': {
                            'hide': {
                                enterState: 'hidden',
                                triggers: 'site:list:viewbydate:show'
                            }
                        },
                        'hidden': {
                            'show': {
                                enterState: 'visible',
                                triggers: 'site:list:viewbydate:hide'
                            }
                        }
                    },
                    prepare: function () {
                        mediator.subscribe('site:list:tab:change', function(data) {
                            var target = data.destination;
                            if(target == containerSel) {
                                elt.trigger('show');
                            } else {
                                elt.trigger('hide');
                            }
                        });
                    },
                    dispose: function() {
                        mediator.off('site:list:tab:change');
                    },
                    doShow: function () {
                    },
                    doUnload: function () {
                        // unload process will check if any non persisted changes still exists
                    },
                    doHide: function () {
                        // hide the element.
                        if($(this.el).is(":visible")) {
                            $(this.el).hide();
                        }
                    },
                    doLoad: function () {
                    },
                    listViewByDateReadyStateReached: function () {
                    }
                });
                elt.startStateMachine({debugStateMachine: false});
                elt.trigger('initialized');
                erp.viewManager.push(Erp.ViewNames.SITE_MANAGER_LIST_VIEW_BY_DATE, this);
            },
            render: function () {
                //this.$el.html(eltTemplate);
                $(containerSel).html(eltTemplate);
            }
        });
    return ListViewByDate;
});
