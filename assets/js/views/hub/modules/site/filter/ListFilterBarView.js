define([
    'jquery',
    'underscore',
    'backbone',
    'erp',
    'mediator',
    'text!/templates/hub/modules/site/filter/list_filter_bar.html',
    'i18n!views/hub/modules/site/nls/filter'
], function ($, _, Backbone, Erp, Mediator, filterTemplate, I18nObject) {
    var erp = window.Erp,
        mediator = erp.mediator,
        vars = {
            all_employee_label: I18nObject.all_employee_label,
            all_client_label: I18nObject.all_client_label,
            all_provider_label: I18nObject.all_provider_label,
            all_project_label: I18nObject.all_project_label,
            project_name_label: I18nObject.project_name_label,
            sort_by_label: I18nObject.sort_by_label
        },
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
                var tpl = _.template(filterTemplate, vars);
                $(this.mSel).html(tpl);
            }
        });
    return SiteListFilterBarView;
});