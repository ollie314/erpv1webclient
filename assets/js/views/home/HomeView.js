define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/users/list.html'
], function ($, _, Backbone, homeTemplate) {
    var HomeView = Backbone.View.extend({
        el: $("#userPageContainer"),
        render: function () {
            $('.menu li').removeClass('active');
            $('.menu li a[href="#"]').parent().addClass('active');
            this.$el.html(homeTemplate);
        }
    });

    return HomeView;
});
