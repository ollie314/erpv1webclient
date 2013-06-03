define([
    'jquery',
    'underscore',
    'backbone',
    'bootMetro',
    'text!/templates/manager/usersandgroups.html',
    'views/users/UserListView',
    'views/groups/GroupListView',
    'views/roles/RoleListView',
    'views/manager/UsersAndGroupsSettingsView'
], function ($, _, Backbone, MetroUi, usersAndGroupsTemplate,
             UserListView, GroupListView, RoleListView, UserAndGroupsSettingsView) {
    var initTabs = function () {
        // prepare tab contents
        var sel = "#usersandgroupsTab",
            userListView = new UserListView();

        $("a[data-toggle='tab']", sel).on('show', function( evt ) {
            var currentTab = evt.target,
                previousTab = evt.relatedTarget,
                viewToRender;
            switch ($(currentTab).attr('href')) {
                case '#ugUsersTab' :
                    viewToRender = new UserListView();
                    break;
                case '#ugGroupsTab' :
                    viewToRender = new GroupListView();
                    break;
                case '#ugRolesTab' :
                    viewToRender = new RoleListView();
                    break;
                case '#ugSettingsTab' :
                    viewToRender = new UserAndGroupsSettingsView();
                    break;
            }
            if(null !== viewToRender) {
                viewToRender.render();
            }
        } );
        // arm click handler to enable UI
        $('a', sel).on('click', function (e) {
            e.preventDefault();
            $(this).tab('show');
        });

        userListView.render(); // rendered by default

    }, UsersAndGroupsView = Backbone.View.extend({
        el: $("#pageContainer"),
        render: function () {
            this.$el.html(usersAndGroupsTemplate);
            $(".metro").metro();
            initTabs();
        }
    });
    return UsersAndGroupsView;
});

