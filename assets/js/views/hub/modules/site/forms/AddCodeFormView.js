/**
 * AddCodeFormView - dedicated to add code. This is a modal dialog.
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
    'models/code/CodeModel',
    'text!/templates/hub/modules/site/forms/add_code_form.html',
    'i18n!views/hub/modules/site/nls/dialog'
], function ($, _, Backbone, Erp, MetroUi, Code, viewTemplate, I18nObject) {
        var erp = window.Erp,
            mediator = erp.mediator,
            btns = {
                close: "#codeCloseBtn",
                save: "#codeSaveBtn"
            },
            vars = {
                code_form_title: I18nObject.code_form_title,
                input_code_name_placeholder: I18nObject.input_code_name_placeholder,
                input_code_code_placeholder: I18nObject.input_code_code_placeholder,
                more_info_placeholder: I18nObject.more_info_placeholder,
                save: I18nObject.save,
                save_and_add: I18nObject.save_and_add,
                close: I18nObject.close,
                processing_invite: I18nObject.processing_invite,
                description_placeholder: I18nObject.description_placeholder
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
                                triggers: 'site:code:form:ready',
                                callbacks: []
                            }
                        },
                        'ready': {
                            'show': {
                                enterState: 'visible',
                                triggers: 'site:code:form:showing:start'
                            }
                        },
                        'busy': {
                            'released': {
                                enterState: 'visible',
                                triggers: 'site:code:form:released',
                                callbacks: ['freeGui']
                            },
                            'hide': {
                                enterState: 'hidden',
                                triggers: 'site:code:form:released',
                                callbacks: []
                            }
                        },
                        'visible': {
                            'hide': {
                                enterState: 'hidden',
                                triggers: 'site:code:form:hidding:start'
                            },
                            'busy': {
                                enterState: 'busy',
                                triggers: 'site:code:form:busy',
                                callbacks: []
                            }
                        },
                        'hidden': {
                            'show': {
                                enterState: 'visible',
                                triggers: 'site:code:form:showing:start'
                            }
                        }
                    },
                    prepare: function () {
                        mediator.subscribe("site:code:form:saving:failure", function () {
                            alert("An error occurred during code saving process");
                        });
                        mediator.subscribe("site:code:form:saving:success", function () {
                            alert("New code successfully saved");
                        });
                        mediator.subscribe('site:code:form:saving:start', function (data) {
                            view.trigger('busy');
                            var result,
                                code= $("#inputCodeCode").val(),
                                name = $("#inputCodeName").val(),
                                info = $("#inputCodeDescription").val(),
                                code = new Code({
                                    code: code,
                                    name: name,
                                    description: info
                                });
                            view.model = code;
                            result = code.save({
                                // FIXME : due to a Backbone strange behavoir, handlers are not called. For now, we check the result of the process instead.
                                success: function (model, response, options) {
                                    $(btns.save).button('complete');
                                    view.trigger('released');
                                    mediator.publish("site:code:form:saving:success", {data: arguments});
                                },
                                error: function (model, xhr, options) {
                                    view.trigger('released');
                                    mediator.publish("site:code:form:saving:failure", {data: arguments});
                                }
                            });
                            if (result === false) {
                                view.trigger('released');
                                mediator.publish("site:code:form:saving:failure", {data: arguments});
                            } else {
                                // result is a jqXHR.
                                $(btns.save).button('complete');
                                view.trigger('released');
                                mediator.publish("site:code:form:saving:success", {data: arguments});
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
                        $("#inputCodeName").focus(); // FIXME : doesn't work for now
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
                mediator.subscribe("site:code:form:show", function () {
                    // reinit the form
                    view.render();
                });
            },
            AddCodeFormView = Backbone.View.extend({
                dlgSel: "#siteAddCodeForm",
                mInitialized: false,
                containerSel: "#siteAddCodeForm",
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
                        this.$el.append(_tpl);
                        $(dlg).modal({
                            show: false
                        }).on('hide',function () {
                                //self.trigger('hide');
                            }).on('hidden', function () {
                                self.trigger('hide');
                            });
                        $("#codeSaveBtn", dlg).on('click', function () {
                            mediator.publish('site:code:form:saving:start', {container: dlg, resultAction: 'clear'});
                        });
                        $("#codeSaveAndHideBtn", dlg).on('click', function () {
                            mediator.publish('site:code:form:saving:start', {container: dlg, resultAction: 'close'});
                        });
                        $(".btn", "#siteAddCodeForm").each(function (index, element) {
                            $(element).button();
                        });
                        this.mInitialized = true;
                    }
                    this.trigger('show');
                }
            });
        return AddCodeFormView;
    }
);