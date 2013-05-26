define([
    'jquery',
    'underscore',
    'backbone',
    'bootMetro',
    'bootMetroCharms',
    'models/material/MaterialModel',
    'text!/templates/hub/modules/site/forms/site_table_entry.html',
    'i18n!views/hub/modules/site/nls/list'
], function ($, _, Backbone, MetroUi, BootMetroChams, MaterialModel, eltTemplate, I18nObject)  {
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
            subtotal_label_placeholder: I18nObject.subtotal_label_placeholder
        },
        SiteTableEntryForMaterialModel= Backbone.View.extend({
            scopeContainer: "",
            el: containerSel,
            tagName: 'tr',
            model: MaterialModel,
            template: null,
            initialize: function() {
                mediator.publish('site:material:item:initializing', {item : this});
            },
            save: function() {
                console.log("Saving item");
            },
            destroy: function() {
                console.log("Destroy item");
            },
            update: function() {
                console.log("Update item");
            },
            render: function(container) {
                container = (null == container || container == "") ?  this.$el : $(container);

                var that = this,
                    emptyModel = {id: 0, code: "", label: "", unit: "", quantity: 0, price: 0, subtotal: 0},
                    item = (null == this.model) ? emptyModel : this.model;
                this.template = _.template(eltTemplate, $.extend(vars, item));

                mediator.once("site:list:bysite:rendering:complete", function() {
                    setTimeout(function () {
                        // TODO : fi this since we may have to render this view under another DOM element
                        $("table.erp-listing tbody", "#listBySite").append($(that.template));
                        $("table.erp-listing tbody tr:first").addClass("success");
                    }, 500);
                });
//                $("table.erp-listing tbody", "#listBySite").append($(that.template));
                mediator.publish('site:material:item:rendering', {item : this});
            }
        });
    return SiteTableEntryForMaterialModel;
});