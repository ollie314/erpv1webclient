define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/users/list.html'
], function ($, _, Backbone, userListTemplate) {
    var UserListView = Backbone.View.extend({
        initialize : function() {

        },
        el: undefined,
        render: function () {
            this.$el = $("#ugUsersTab");
            this.$el.html(userListTemplate);
            $("li:first-child","#usersandgroupsTab").addClass('active');
        }
    });

    return UserListView;
});
