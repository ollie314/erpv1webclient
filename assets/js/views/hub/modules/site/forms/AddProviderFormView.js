/**
 * AddProviderFormView - dedicated to add provider. This is a modal dialog.
 *
 * @author mlefebvre@simnetsa.ch
 * @version 0.1
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'erp',
    'mediator',
    'bootMetro',
    'models/provider/ProviderModel',
    'text!/templates/hub/modules/site/forms/add_provider_form.html'
], function ($, _, Backbone, Erp, Mediator, MetroUi, Provider, viewTemplate) {
        var erp = window.Erp,
            mediator = erp.mediator,
            btns = {
                close: "#providerCloseBtn",
                save: "#providerSaveBtn"
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
                                triggers: 'site:provider:form:ready',
                                callbacks: []
                            }
                        },
                        'ready': {
                            'show': {
                                enterState: 'visible',
                                triggers: 'site:provider:form:showing:start'
                            }
                        },
                        'busy': {
                            'released': {
                                enterState: 'visible',
                                triggers: 'site:provider:form:released',
                                callbacks: ['freeGui']
                            },
                            'hide': {
                                enterState: 'hidden',
                                triggers: 'site:provider:form:released',
                                callbacks: []
                            }
                        },
                        'visible': {
                            'hide': {
                                enterState: 'hidden',
                                triggers: 'site:provider:form:hidding:start'
                            },
                            'busy': {
                                enterState: 'busy',
                                triggers: 'site:provider:form:busy',
                                callbacks: []
                            }
                        },
                        'hidden': {
                            'show': {
                                enterState: 'visible',
                                triggers: 'site:provider:form:showing:start'
                            }
                        }
                    },
                    prepare: function () {
                        mediator.subscribe("site:provider:form:saving:failure", function () {
                            alert("An error occurred during saving process");
                        });
                        mediator.subscribe("site:provider:form:saving:success", function () {
                            alert("New provider successfully saved");
                        });
                        mediator.subscribe('site:provider:form:saving:start', function (data) {
                            view.trigger('busy');
                            var result,
                                name = $("#inputProviderName").val(),
                                phone = $("#inputProviderPhone").val(),
                                mail = $("#inputProviderMail").val(),
                                address = $("#inputProviderAddress").val(),
                                info = $("#inputProviderDescription").val(),
                                provider = new Provider({
                                    name: name,
                                    phone: phone,
                                    mail: mail,
                                    address: address,
                                    description: info
                                });
                            view.model = provider;
                            result = provider.save({
                                // FIXME : due to a Backbone strange behavoir, handlers are not called. For now, we check the result of the process instead.
                                success: function (model, response, options) {
                                    $(btns.save).button('complete');
                                    view.trigger('released');
                                    mediator.publish("site:provider:form:saving:success", {data: arguments});
                                },
                                error: function (model, xhr, options) {
                                    view.trigger('released');
                                    mediator.publish("site:provider:form:saving:failure", {data: arguments});
                                }
                            });
                            if (result === false) {
                                view.trigger('released');
                                mediator.publish("site:provider:form:saving:failure", {data: arguments});
                            } else {
                                // result is a jqXHR.
                                $(btns.save).button('complete');
                                view.trigger('released');
                                mediator.publish("site:provider:form:saving:success", {data: arguments});
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
                        $("#inputProviderName").focus(); // FIXME : doesn't work for now
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
                mediator.subscribe("site:provider:form:show", function () {
                    // reinit the form
                    view.render();
                });
            },
            SiteMainSidebarView = Backbone.View.extend({
                dlgSel: "#siteAddProviderForm",
                mInitialized: false,
                containerSel: "#siteAddProviderForm",
                model: undefined,
                el: $("#dialogPlaceholder"),
                initialize: function () {
                    initStateMachine(this);
                    initEvents(this);
                },
                render: function () {
                    var self = this,
                        dlg = self.dlgSel;
                    if (!self.mInitialized) {
                        this.$el.append(viewTemplate);
                        $(dlg).modal({
                            show: false
                        }).on('hide',function () {
                                //self.trigger('hide');
                            }).on('hidden', function () {
                                self.trigger('hide');
                            });
                        $("#providerSaveBtn", dlg).on('click', function () {
                            mediator.publish('site:provider:form:saving:start', {container: dlg, resultAction: 'clear'});
                        });
                        $("#providerSaveAndHideBtn", dlg).on('click', function () {
                            mediator.publish('site:provider:form:saving:start', {container: dlg, resultAction: 'close'});
                        });
                        $(".btn", "#siteAddProviderForm").each(function (index, element) {
                            $(element).button();
                        });
                        this.mInitialized = true;
                    }
                    this.trigger('show');
                }
            });
        return SiteMainSidebarView;
    }
)
;