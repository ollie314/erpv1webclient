/**
 * $($$ID : corthay_201306031527-$$)
 * User: mlefebvre
 * Date: 03.06.13
 * Time: 15:27
 */
/*global define*/
/*global window*/
/*global console*/
/*global setTimeout*/
define([
    'jquery',
    'underscore',
    'backbone',
    'bootMetro',
    'bootMetroCharms',
    'models/timesheets/TimesheetEntryModel',
    'text!/templates/hub/modules/timesheets/forms/timesheet_table_entry.html',
    'i18n!views/hub/modules/timesheets/nls/list'
], function ($, _, Backbone, MetroUi, BootMetroChams, TimesheetEntryModel, eltTemplate, I18nObject) {
    'use strict';
    var erp = window.Erp,
        containerSel = "table.erp-listing tbody",
        mediator = erp.mediator,
        vars = {
            site: I18nObject.site_label,
            help_label: I18nObject.help_label,
            site_input_placeholder: I18nObject.site_input_placeholder,
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
            duplicate_item_label: I18nObject.duplicate_item_label,
            delete_item_label: I18nObject.delete_item_label
        },
        TimesheetTableEntry = Backbone.View.extend({
            scopeContainer: "",
            model: null, //is a TimesheetEntryModel
            el: containerSel,
            tagName: 'tr',
            template: null,
            initialize: function () {
                mediator.publish('site:material:item:initializing', {item: this});
            },
            save: function () {
                console.log("Saving item");
            },
            destroy: function () {
                console.log("Destroy item");
            },
            update: function () {
                console.log("Update item");
            },
            render: function (container) {
                container = (null === container || container === "") ? this.$el : $(container);
                var that = this,
                    emptyModel = {id: 0, code: "", label: "", unit: "", quantity: 0, price: 0, subtotal: 0},
                    item = (null === this.model) ? emptyModel : this.model;
                this.template = _.template(eltTemplate, $.extend(vars, item));

                mediator.once("site:list:bysite:rendering:complete", function () {
                    setTimeout(function () {
                        // TODO : fi this since we may have to render this view under another DOM element
                        $("table.erp-listing tbody", "#listBySite").append($(that.template));
                        //$("table.erp-listing tbody tr:first").addClass("success");
                        $(".date.material-entry:last").datepicker();
                    }, 500);
                });
//                $("table.erp-listing tbody", "#listBySite").append($(that.template));
                mediator.publish('site:material:item:rendering', {item: this});
            }
        });
    return TimesheetTableEntry;
});