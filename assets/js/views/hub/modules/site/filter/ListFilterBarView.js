define([
    'jquery',
    'underscore',
    'backbone',
    'erp',
    'mediator',
    'text!/templates/hub/modules/site/filter/list_filter_bar.html'
], function ($, _, Backbone, Erp, Mediator, filterTemplate) {
    var erp = window.Erp,
        mediator = erp.mediator,
        fxDuration = 400,
        mediator = erp.mediator,
        SiteListFilterBarView = Backbone.View.extend({
            mSel: "#siteContentFiltersContent",
            el: $("#siteContentFiltersContent"),
            initialize: function () {
                // no state machine for this bar.
                erp.viewManager.push(Erp.ViewNames.SITE_MANAGER_LIST_FILTER_VIEW, this);
            },
            render: function () {
                $(this.mSel).html(filterTemplate);
            }
        });
    return SiteListFilterBarView;
});