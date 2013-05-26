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
    'bootMetro',
    'models/unit/UnitModel',
    'text!/templates/hub/modules/site/forms/add_unit_form.html',
    'i18n!views/hub/modules/site/nls/dialog'
], function ($, _, Backbone, Erp, MetroUi, Unit, viewTemplate, I18nObject) {
        var erp = window.Erp,
            mediator = erp.mediator,
            btns = {
                close: "#siteUnitCloseBtn",
                save: "#siteUnitSaveBtn",
                saveAndHide: "#siteUnitSaveAndHideBtn"
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
                                triggers: 'site:unit:form:ready',
                                callbacks: []
                            }
                        },
                        'ready': {
                            'show': {
                                enterState: 'visible',
                                triggers: 'site:unit:form:showing:start'
                            }
                        },
                        'busy': {
                            'released': {
                                enterState: 'visible',
                                triggers: 'site:unit:form:released',
                                callbacks: ['freeGui']
                            },
                            'hide': {
                                enterState: 'hidden',
                                triggers: 'site:unit:form:released',
                                callbacks: []
                            }
                        },
                        'visible': {
                            'hide': {
                                enterState: 'hidden',
                                triggers: 'site:unit:form:hidding:start'
                            },
                            'busy': {
                                enterState: 'busy',
                                triggers: 'site:unit:form:busy',
                                callbacks: []
                            }
                        },
                        'hidden': {
                            'show': {
                                enterState: 'visible',
                                triggers: 'site:unit:form:showing:start'
                            }
                        }
                    },
                    prepare: function () {
                        mediator.subscribe("site:unit:form:saving:failure", function () {
                            alert("An error occurred during saving process");
                        });
                        mediator.subscribe("site:unit:form:saving:success", function () {
                            alert("New provider successfully saved");
                        });
                        mediator.subscribe('site:provider:form:saving:start', function (data) {

                            // set the view in busy state
                            view.trigger('busy');

                            // result handle the result of the saving process
                            var result,
                                name = $("#inputUnitName").val(),
                                info = $("#inputUnitDescription").val(),
                                unit = new Unit({
                                    name: name,
                                    description: info
                                });
                            view.model = unit;

                            result = unit.save({
                                /*
                                FIXME : due to a Backbone strange behavoir, handlers are not called. For now, we check the result of the process instead.
                                success: function (model, response, options) {
                                    $(btns.save).button('complete');
                                    view.trigger('released');
                                    mediator.publish("site:provider:form:saving:success", {data: arguments});
                                },
                                error: function (model, xhr, options) {
                                    view.trigger('released');
                                    mediator.publish("site:provider:form:saving:failure", {data: arguments});
                                }*/
                            });
                            if (result === false) {
                                /*
                                 * Unable to save the module. So release the ui and fire an event to inform
                                 * about the situation.
                                 * On of those handlers should display a notification.
                                 */
                                view.trigger('released');
                                mediator.publish("site:unit:form:saving:failure", {data: arguments});
                            } else {
                                // result is a jqXHR. So relase each buttons and the the ui.
                                $(btns.save).button('complete');
                                view.trigger('released');

                                // firing events
                                mediator.publish("site:unit:form:saving:success", {data: arguments});

                                /*
                                 * Determine wich action should be executed now. Clear and still the dialog displayed
                                 * in case of "click and add" situation or clear and hide it in case of "click and close"
                                 */
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
                    /**
                     * Release all GUI elements (buttons, spin, ...) and clear input elements.
                     *
                     * @return void
                     */
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
                        dlg = self.dlgSel,
                        tpl,
                        vars = {
                            "unit_form_title": I18nObject.unit_form_title
                        };
                    if (!self.mInitialized) {
                        tpl = _.template(viewTemplate, vars);
                        this.$el.append(tpl);
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