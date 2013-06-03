define([
    'jquery',
    'underscore',
    'backbone',
    'bootMetro',
    'bootMetroCharms',
    'views/hub/modules/site/modelViews/SiteTableEntryForMaterialModel'
], function ($, _, Backbone, MetroUi, BootMetroChams, SiteTableEntryForMaterialModel) {
    var erp = window.Erp,
        containerSel = "table.erp-listing",
        mediator = erp.mediator,
        ListViewBySiteModelCollection = Backbone.View.extend({
            scopeContainer: "",
            el: containerSel,
            tagName: 'tr',
           // model: MaterialModel,
            template: null,
            initialize: function() {
                var that = this;
                /*this.listenTo(this.model, 'change', this.render);
                this.listenTo(this.model, 'destroy', this.destroy());*/
                //this.model.on('change', this.render);
                this._materialViews = [];

                _(this.collection).each(function(material) {
                    that._materialViews.push(new SiteTableEntryForMaterialModel({
                        model: material,
                        tagName: 'tr'
                    }));
                });
            },
            add: function() {
                console.log("Add element into the collection");
            },
            remove: function() {
                console.log("Remove element from the collection");
            },
            render: function() {
                var that = this,
                    container = (this.el == undefined) ? $(containerSel) : $(this.el);

                this.$el = container;
                this.$el.empty();
                _(this._materialViews).each(function(subview) {
                    //$(that.el).append(subview.$el);
                    subview.render($("table.erp-listing tbody", that.$el));
                });

                /*var emptyModel = {id: 0, code: "", label: "", unit: "", quantity: 0, price: 0, subtotal: 0};
                this.template = _.template(eltTemplate, $.extend(vars, emptyModel));
                if(this.scopeContainer == "") {
                    this.scopeContainer = $("#listBySite");
                }*/
                // display the container ...
                container.show();
            }
        });
    return ListViewBySiteModelCollection;
});