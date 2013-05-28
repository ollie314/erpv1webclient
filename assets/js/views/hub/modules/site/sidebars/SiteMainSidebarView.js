define([
    'jquery',
    'underscore',
    'backbone',
    'bootMetro',
    'bootMetroCharms',
    'erp',
    'mediator',
    'text!/templates/hub/modules/site/sidebars/list.html'
], function ($, _, Backbone, MetroUi, BootMetroChams, Erp, Mediator, sidebarTemplate) {
    var erp = window.Erp,
        charmsSel = "#charms",
        mediator = erp.mediator,
        SiteMainSidebarView = Backbone.View.extend({
            el: $("#charms"),
            render: function () {
                this.$el.html(sidebarTemplate);
                // arm behavior
                $("#sidebarSettingsButton").off('click').on('click', function (e) {
                    e.preventDefault();
                    $(charmsSel).charms('showSection', 'theme-charms-section');
                    return false;
                });

                $('.close-charms').off('click').on('click', function (e) {
                    e.preventDefault();
                    $(charmsSel).charms('close');
                    return false;
                });

                $(".site-add-provider-btn").on('click', function () {
                    mediator.publish("site:provider:form:show");
                });
                $(".site-add-btn").on('click', function() {
                    mediator.publish("site:unit:form:show");
                });
                $(".site-add-code-btn").on('click', function() {
                    mediator.publish("site:code:form:show");
                });
                $(".site-add-site-btn").on('click', function() {
                    mediator.publish("site:code:form:show");
                });
            }
        });
    return SiteMainSidebarView;
});