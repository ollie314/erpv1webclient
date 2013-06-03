define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/groups/list.html'
], function ($, _, Backbone, groupListTemplate) {
    var GroupListView = Backbone.View.extend({
        el: undefined,
        render: function () {
            this.$el = $("#ugGroupsTab");
            this.$el.html(groupListTemplate);
        }
    });

    return GroupListView;
});
