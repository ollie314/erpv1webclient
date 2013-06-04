/**
 * $($$ID : corthay_201306031308-$$)
 * User: mlefebvre
 * Date: 03.06.13
 * Time: 13:08
 */
/*global define*/
/*global window*/
/*global console*/
define([
    'jquery',
    'underscore',
    'backbone',
    'bootMetro',
    'bootMetroCharms',
    'views/hub/modules/site/modelViews/TimesheetTableEntry'
], function ($, _, Backbone, MetroUi, BootMetroChams, TimesheetTableEntry) {
    'use strict';
    var erp = window.Erp,
        containerSel = "table.erp-listing",
        mediator = erp.mediator,
        ListViewByCollabModelCollection = Backbone.View.extend({
            scopeContainer: "",
            el: containerSel,
            tagName: 'tr',
            // model: MaterialModel,
            template: null,
            initialize: function () {
                var that = this;
                /*this.listenTo(this.model, 'change', this.render);
                 this.listenTo(this.model, 'destroy', this.destroy());*/
                //this.model.on('change', this.render);
                this._entriesViews = [];

                _(this.collection).each(function (material) {
                    that._entriesViews.push(new TimesheetTableEntry({
                        model: material,
                        tagName: 'tr'
                    }));
                });
            },
            add: function () {
                console.log("Add element into the collection");
            },
            remove: function () {
                console.log("Remove element from the collection");
            },
            render: function () {
                var that = this,
                    container = (this.el === undefined) ? $(containerSel) : $(this.el);

                this.$el = container;
                this.$el.empty();
                _(this._entriesViews).each(function (subview) {
                    subview.render($("table.erp-listing tbody", that.$el));
                });
                container.show();
            }
        });
    return ListViewByCollabModelCollection;
});