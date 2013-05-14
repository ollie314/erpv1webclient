define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/roles/list.html'
], function ($, _, Backbone, roleListTemplate) {
    var RoleListView = Backbone.View.extend({
        el: undefined,
        initialize: function() {
        },
        render: function () {
            this.$el = $("#ugRolesTab")
            this.$el.html(roleListTemplate);
        }
    });

    return RoleListView;
});
