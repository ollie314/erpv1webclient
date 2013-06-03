define([
    'jquery',
    'underscore',
    'backbone',
    'bootMetro',
    'text!/templates/hub/modules/site/form.html'
], function ($, _, Backbone, MetroUi, formTemplate) {
    var SiteFormView = Backbone.View.extend({
        initialize : function() {
            window.Erp.mediator.publish('hub:intializing', {date : new Date().getTime()});
        },
        el: $("#pageContainer"),
        render: function () {
            this.$el.appendTo(formTemplate);
        }
    });
    return SiteFormView;
});


