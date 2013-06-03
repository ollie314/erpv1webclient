define([
    'jquery',
    'underscore',
    'backbone',
    'bootMetro',
    'text!/templates/navigation/topnav/anon.html'
], function ($, _, Backbone, MetroUi, anonTemplate) {
    var AnonNavView = Backbone.View.extend({
        el: $("#nav-bar"),
        render: function () {
            this.$el.html(anonTemplate);
        }
    });
    return AnonNavView;
});

