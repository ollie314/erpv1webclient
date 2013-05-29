/**
 * AddSiteFormView - dedicated to add site. This is a modal dialog.
 *
 * @author mlefebvre@simnetsa.ch
 * @version 0.1
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'erp',
    'bootMetro',
    'models/site/SiteModel',
    'text!/templates/hub/modules/site/forms/add_site_form.html',
    'i18n!views/hub/modules/site/nls/dialog'
], function ($, _, Backbone, Erp, MetroUi, Site, viewTemplate, I18nObject) {
        var erp = window.Erp,
            mediator = erp.mediator,
            btns = {
                close: "#siteCloseBtn",
                save: "#siteSaveBtn",
                saveAndContinue: "#siteSaveAndHideBtn"
            },
            vars = {
                site_form_title: I18nObject.site_form_title,
                input_site_name_placeholder: I18nObject.input_site_name_placeholder,
                input_site_responsible_placeholder: I18nObject.input_site_responsible_placeholder,
                input_site_owner_placeholder: I18nObject.input_site_owner_placeholder,
                save: I18nObject.save,
                save_and_add: I18nObject.save_and_add,
                close: I18nObject.close,
                processing_invite: I18nObject.processing_invite,
                description_placeholder: I18nObject.description_placeholder,
                site_form_title: I18nObject.site_form_title
            },
            initStateMachine = function (view) {
                _.extend(view, Backbone.StateMachine, Backbone.Events, {
                    states: {
                        'ready': {enter: ['prepare'], leave: []},
                        'visible': {enter: ['doShow'], leave: ['setFree']},
                        'busy': {enter: ['setBusy'], leave: ['setFree']},
                        'hidden': {enter: ['doClear', 'doHideDialog'], leave: []}
                    },
                    transitions: {
                        'init': {
                            'initialized': {
                                enterState: 'ready',
                                triggers: 'site:site:form:ready',
                                callbacks: []
                            }
                        },
                        'ready': {
                            'show': {
                                enterState: 'visible',
                                triggers: 'site:site:form:showing:start'
                            }
                        },
                        'busy': {
                            'released': {
                                enterState: 'visible',
                                triggers: 'site:site:form:released',
                                callbacks: ['freeGui']
                            },
                            'hide': {
                                enterState: 'hidden',
                                triggers: 'site:site:form:released',
                                callbacks: []
                            }
                        },
                        'visible': {
                            'hide': {
                                enterState: 'hidden',
                                triggers: 'site:site:form:hidding:start'
                            },
                            'busy': {
                                enterState: 'busy',
                                triggers: 'site:site:form:busy',
                                callbacks: []
                            }
                        },
                        'hidden': {
                            'show': {
                                enterState: 'visible',
                                triggers: 'site:site:form:showing:start'
                            }
                        }
                    },
                    prepare: function () {
                        mediator.subscribe("site:site:form:saving:failure", function () {
                            alert("An error occurred during site saving process");
                        });
                        mediator.subscribe("site:site:form:saving:success", function () {
                            alert("New site successfully saved");
                        });
                        mediator.subscribe('site:site:form:saving:start', function (data) {
                            view.trigger('busy');
                            var result,
                                name= $("#inputSiteName").val(),
                                owner = $("#inputSiteOwner").val(),// TODO L fix, to set up an hidden field to store id of the owner
                                responsible = $("#inputSiteResponsible").val(),// TODO L fix, to set up an hidden field to store id of the reponsible
                                info = $("#inputSiteDescription").val(),
                                site = new Site({
                                    name: name,
                                    owner: owner,
                                    responsible: responsible,
                                    description: info
                                });
                            view.model = site;
                            result = site.save({
                                // FIXME : due to a Backbone strange behavoir, handlers are not called. For now, we check the result of the process instead.
                                success: function (model, response, options) {
                                    $(btns.save).button('complete');
                                    view.trigger('released');
                                    mediator.publish("site:site:form:saving:success", {data: arguments});
                                },
                                error: function (model, xhr, options) {
                                    view.trigger('released');
                                    mediator.publish("site:site:form:saving:failure", {data: arguments});
                                }
                            });
                            if (result === false) {
                                view.trigger('released');
                                mediator.publish("site:site:form:saving:failure", {data: arguments});
                            } else {
                                // result is a jqXHR.
                                $(btns.save).button('complete');
                                view.trigger('released');
                                mediator.publish("site:site:form:saving:success", {data: arguments});
                                if (data.hasOwnProperty('resultAction')) {
                                    switch (data.resultAction) {
                                        case 'clear' :
                                            // nothing to do (released event handler do the stuff)
                                            break;
                                        case 'close' :
                                            view.trigger('hide');
                                            break;
                                        default :
                                            view.trigger('hide');
                                    }
                                }
                            }
                        });
                    },
                    freeGui: function () {
                        $(btns.close).removeAttr('disabled');
                        $(btns.save).button('reset');
                        $(".erp-input", view.dlgSel).each(function (index, element) {
                            $(element).val('');
                        });
                    },
                    setBusy: function () {
                        $(btns.close).attr('disabled', 'disabled');
                        $(btns.save).button('loading');
                    },
                    setFree: function () {
                        $(btns.close).removeAttr('disabled');
                        $(btns.save).button('reset');
                    },
                    doShow: function () {
                        $(view.dlgSel).modal('show');
                        $("#inputSiteName").focus(); // FIXME : doesn't work for now
                    },
                    doClear: function () {
                        $(".erp-input", view.dlgSel).each(function (index, element) {
                            $(element).val('');
                        });
                    },
                    doHideDialog: function () {
                        $(view.dlgSel).modal('hide');
                    }
                });
                view.startStateMachine({debugStateMachine: false});
                view.trigger('initialized');
                erp.viewManager.push(Erp.ViewNames.SITE_MANAGER_LIST_VIEW, this);
            },
            initEvents = function (view) {
                mediator.subscribe("site:site:form:show", function () {
                    // reinit the form
                    view.render();
                });
            },
            AddSiteFormView = Backbone.View.extend({
                dlgSel: "#siteAddSiteForm",
                mInitialized: false,
                containerSel: "#siteAddSiteForm",
                model: undefined,
                el: $("#dialogPlaceholder"),
                initialize: function () {
                    initStateMachine(this);
                    initEvents(this);
                },
                render: function () {
                    var self = this,
                        dlg = self.dlgSel,
                        _tpl = _.template(viewTemplate, vars);

                    if (!self.mInitialized) {
                        $(this.el).append(_tpl);
                        $(dlg).modal({
                            show: false
                        }).on('hide',function () {
                                //self.trigger('hide');
                            }).on('hidden', function () {
                                self.trigger('hide');
                            });
                        $("#siteSaveBtn", dlg).on('click', function () {
                            mediator.publish('site:site:form:saving:start', {container: dlg, resultAction: 'clear'});
                        });
                        $("#siteSaveAndHideBtn", dlg).on('click', function () {
                            mediator.publish('site:site:form:saving:start', {container: dlg, resultAction: 'close'});
                        });
                        $(".btn", "#siteAddSiteForm").each(function (index, element) {
                            $(element).button();
                        });
                        this.mInitialized = true;
                    }
                    this.trigger('show');
                }
            });
        return AddSiteFormView;
    }
);