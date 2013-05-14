define([
    'jquery',
    'underscore',
    'backbone',
    'bootMetro',
    'bootMetroCharms',
    'text!/templates/sidebars/help/simple.html'
], function ($, _, Backbone, MetroUi, BootMetroChams, sidebarAuthentSimpleTemplate) {
    var SidebarHelpSimpleView = Backbone.View.extend({
        el: $("#charms"),
        render: function () {
            this.$el.html(sidebarAuthentSimpleTemplate);

            // arm behavior
            $("#sidebarSettingsButton").off('click').on('click', function (e) {
                e.preventDefault();
                $('#charms').charms('showSection', 'theme-charms-section');
                return false;
            });

            $('.close-charms').off('click').on('click', function(e){
                e.preventDefault();
                $("#charms").charms('close');
                return false;
            });
        }
    });
    return SidebarHelpSimpleView;
});

