define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/manager/userandgroupssettings.html'
], function ($, _, Backbone, userAndGroupsSettingsTemplate) {
    var UserAndGroupsSettingsView = Backbone.View.extend({
        el: undefined,
        initialize : function() {
        },
        render: function () {
            this.$el = $("#ugSettingsTab");
            this.$el.html(userAndGroupsSettingsTemplate);
        }
    });

    return UserAndGroupsSettingsView;
});
