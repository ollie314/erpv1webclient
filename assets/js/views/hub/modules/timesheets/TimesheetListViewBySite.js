/**
 * $($$ID : corthay_201306031258-$$)
 * User: mlefebvre
 * Date: 03.06.13
 * Time: 12:58
 */
/*global define*/
/*global window*/
define([
    'jquery',
    'underscore',
    'backbone',
    'bootMetro',
    'bootMetroCharms',
    'mediator',
    'models/material/MaterialModel',
    'views/hub/modules/timeheets/modelViews/ListViewByTimesheetModelCollection',
    'text!/templates/hub/modules/timeheets/site_list.html',
    'i18n!views/hub/modules/timeheets/nls/list'
], function ($, _, Backbone, MetroUi, BootMetroChams, Mediator, MaterialModel, ListViewByTimesheetModelCollection, eltTemplate, I18nObject) {
    'use strict';
    var erp = window.Erp,
        containerSel = "#timesheetlistBySite",
        mediator = erp.mediator,
        TimesheetListViewBySite = Backbone.View.extend({
            el: $("#timesheetlistBySite"),
            initialize: function () {
                var view = this,
                    elt = $(this.el);

                _.extend(elt, Backbone.StateMachine, Backbone.Events, {
                    states: {
                        'ready': {enter: ['prepare', 'doLoad'], leave: []},
                        'visible': {enter: ['doShow'], leave: ['doUnload']},
                        'hidden': {enter: ['doHide'], leave: ['doLoad']},
                        'disposed': {enter: ['dispose'], leave: []}
                    },
                    transitions: {
                        'init': {
                            'initialized': {
                                enterState: 'ready',
                                triggers: 'timeheets:list:viewbydate:ready',
                                callbacks: ['listViewBySiteReadyStateReached']
                            }
                        },
                        'visible': {
                            'hide': {
                                enterState: 'hidden',
                                triggers: 'timeheets:list:viewbydate:show'
                            }
                        },
                        'hidden': {
                            'show': {
                                enterState: 'visible',
                                triggers: 'timeheets:list:viewbydate:hide'
                            }
                        }
                    },
                    prepare: function () {
                        mediator.subscribe('timesheets:list:tab:change', function (data) {
                            var target = data.destination;
                            if (target === containerSel) {
                                elt.trigger('show');
                            } else {
                                elt.trigger('hide');
                            }
                        });

                        // create the collection to embed items.
                        var timesheetEntries = [
                            {
                                id: 1,
                                date: '2013-02-11',
                                code: "02",
                                label: "Pose element de plafond",
                                quantity: 1,
                                unit: 'pce',
                                price: 180.00,
                                subtotal: 180
                            }
                        ], collection = new ListViewByTimesheetModelCollection({
                            // assign the initial collection
                            collection: timesheetEntries,
                            // assign the container for the list.
                            el: $("table.erp-listing", containerSel)
                        });

                        collection.render();
                        // TODO : add this method to the right view (list item view)
                        /*mediator.subscribe("nav:bottom:add:click", function() {
                         view.createItem(elt);
                         });*/
                    },
                    dispose: function () {
                        mediator.off('timeheets:list:tab:change');
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
                    listViewBySiteReadyStateReached: function () {
                    }
                });
                elt.startStateMachine({debugStateMachine: false});
                elt.trigger('initialized');
                //erp.viewManager.push(Erp.ViewNames.SITE_MANAGER_LIST_VIEW, this);
            },
            render: function () {
                var tpl,
                // (?<label>\w+)\s*\:\s*\"(?<name>[^\"]+)"
                    vars = {
                        /*timeheets: I18nObject.timeheet_label,
                        help_label: I18nObject.help_label,
                        timeheet_input_placeholder: I18nObject.timeheet_input_placeholder,
                        date_table_header: I18nObject.date_table_header,
                        code_table_header: I18nObject.code_table_header,
                        label_table_header: I18nObject.label_table_header,
                        quantity_table_header: I18nObject.quantity_table_header,
                        unit_table_header: I18nObject.unit_table_header,
                        price_table_header: I18nObject.price_table_header,
                        total_table_header: I18nObject.total_table_header,
                        action_table_header: I18nObject.action_table_header,
                        date_label_placeholder: I18nObject.date_label_placeholder,
                        code_label_placeholder: I18nObject.code_label_placeholder,
                        label_label_placeholder: I18nObject.label_label_placeholder,
                        quantity_label_placeholder: I18nObject.quantity_label_placeholder,
                        unit_label_placeholder: I18nObject.unit_label_placeholder,
                        price_label_placeholder: I18nObject.price_label_placeholder,
                        subtotal_label_placeholder: I18nObject.subtotal_label_placeholder,
                        timeheet_label: I18nObject.timeheet_label,
                        subtimeheet_label: I18nObject.subtimeheet_label,
                        concern_label: I18nObject.concern_label,
                        client_label: I18nObject.client_label,
                        subtimeheet_input_placeholder : I18nObject.subtimeheet_input_placeholder,
                        client_input_placeholder : I18nObject.client_input_placeholder,
                        concern_input_placeholder : I18nObject.concern_input_placeholder*/
                    };
                //this.$el.html(eltTemplate);
                tpl = _.template(eltTemplate, vars);
                $(containerSel).html(tpl);
                mediator.publish("timeheets:list:bytimeheet:rendering:complete");
            }
        });
    return TimesheetListViewBySite;
});