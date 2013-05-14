define([
    'jquery',
    'underscore',
    'backbone',
    'bootMetro',
    'text!/templates/navigation/topnav/user.html'
], function ($, _, Backbone, MetroUi, userTemplate) {
    var UserNavView = Backbone.View.extend({
        el: $("#nav-bar"),
        render: function () {
            this.$el.html(userTemplate);
        }
    });
    return UserNavView;
});

