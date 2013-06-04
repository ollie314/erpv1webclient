/*global define*/
/*global define*/
/*global window*/
define([
    'jquery',
    'underscore',
    'backbone',
    'bootMetro',
    'bootMetroCharms',
    'erp',
    'text!/templates/hub/modules/site/collab_list.html',
    'i18n!views/hub/modules/timesheets/nls/list'
], function ($, _, Backbone, MetroUi, BootMetroChams, Erp, eltTemplate, I18nObject) {
    'use strict';
    var erp = window.Erp,
        containerSel = "#listByDate",
        tplVars = {
            timesheet_table_title: I18nObject.timesheet_table_title,
            help_label: I18nObject.help_label,
            client_table_title: I18nObject.client_table_title,
            unit_table_title: I18nObject.unit_table_title,
            quantity_table_title: I18nObject.quantity_table_title,
            price_table_title: I18nObject.price_table_title,
            total_table_title: I18nObject.total_table_title,
            action_table_title: I18nObject.action_table_title,
            label_table_title: I18nObject.label_table_title,
            id: 0,
            delete_item_label: I18nObject.delete_item_label,
            duplicate_item_label: I18nObject.duplicate_item_label
        },
        mediator = erp.mediator,
        TimesheetListViewByCollab = Backbone.View.extend({
            el: $("#timeshettListByDate"),
            initialize: function () {
                var elt = $(this.el);
                _.extend(elt, Backbone.StateMachine, Backbone.Events, {
                    states: {
                        'ready': {enter: ['prepare'], leave: []},
                        'visible': {enter: ['doShow'], leave: ['doUnload']},
                        'hidden': {enter: ['doHide'], leave: ['doLoad']},
                        'disposed': {enter: ['dispose'], leave: []}
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
                        mediator.subscribe('site:list:tab:change', function (data) {
                            var target = data.destination;
                            if (target === containerSel) {
                                elt.trigger('show');
                            } else {
                                elt.trigger('hide');
                            }
                        });
                    },
                    dispose: function () {
                        mediator.off('site:list:tab:change');
                    },
                    doShow: function () {
                    },
                    doUnload: function () {
                        // unload process will check if any non persisted changes still exists
                    },
                    doHide: function () {
                        // hide the element.
                        if ($(this.el).is(":visible")) {
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
                var tpl = _.template(eltTemplate, tplVars);
                $(containerSel).html(tpl);
            }
        });
    return TimesheetListViewByCollab;
});
