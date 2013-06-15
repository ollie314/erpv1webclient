/*global window*/
define([
    'jquery',
    'underscore',
    'backbone',
    'stateMachine',
    'erp',
    'bootMetro',
    'text!/templates/navigation/bottomnav/hub.html',
    'i18n!views/nls/navigation'
], function ($, _, Backbone, StateMachine, Erp, MetroUi, bottombarTemplate, I18nObject) {

    'use strict';

    /*var BottomBarHubView = Backbone.View.extend({
     el: $("#pageFooter"),
     render: function () {
     this.$el.html(bottombarTemplate);
     $("#pageFooter").show();
     }
     });
     return BottomBarHubView;*/
    var erp = window.Erp,
        fxDuration = 1000,
        mediator = erp.mediator,
        translations = {
            button_search_title: I18nObject.button_search_title,
            button_search_label: I18nObject.button_search_label,
            button_sendmail_title: I18nObject.button_sendmail_title,
            button_sendmail_label: I18nObject.button_sendmail_label,
            button_lab_title: I18nObject.button_lab_title,
            button_lab_label: I18nObject.button_lab_label,
            button_ask_title: I18nObject.button_ask_title,
            button_ask_label: I18nObject.button_ask_label,
            button_feature_title: I18nObject.button_feature_title,
            button_feature_label: I18nObject.button_feature_label
        },
        viewManager,
        createStateMachine = function (view) {
            var elt = view.$el;
            _.extend(elt, Backbone.StateMachine, Backbone.Events, {

                states: {
                    'visible': {enter: ['doShow'], leave: ['doHide']}
                },

                transitions: {
                    'init': {
                        'initialized': {enterState: 'visible'}
                    },
                    'visible': {
                        'hide': {enterState: 'hidden'}
                    },
                    'hidden': {
                        'show': {enterState: 'visible'}
                    }
                },
                doShow: function () {
                    elt.fadeIn(fxDuration, function () {
                        /*$(view.el).off('click').on('click', function () {
                            elt.trigger('hide');
                            setTimeout(function () {
                                elt.trigger('show');
                            }, 3000);
                        });*/
                    });

                },
                doHide: function () {
                    elt.fadeOut(fxDuration, function () {
                        /*$(view.el).off('click').on('click', function () {
                            elt.trigger('show');
                        });*/
                    });
                }
            });
            elt.startStateMachine();
            elt.trigger('initialized');
            erp.viewManager.push(Erp.ViewNames.HUB_BOTTOM_BAR, view);
        },
        BottomBarHubView = Backbone.View.extend({/*StatefulView.extend({*/
            el: $("#pageFooter"),
            debugStateMachine: true,
            render: function () {
                var tpl = _.template(bottombarTemplate, translations);
                this.$el.html(tpl);
                this.$el.fadeIn(fxDuration);
                mediator.publish('hub:bottombar:showing');
            },
            initialize: function () {
                createStateMachine(this);
            }
        });
    return BottomBarHubView;
});

