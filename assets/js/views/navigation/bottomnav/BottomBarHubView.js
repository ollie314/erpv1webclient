define([
    'jquery',
    'underscore',
    'backbone',
    'stateMachine',
    'erp',
    'viewManager',
    'bootMetro',
    'text!/templates/navigation/bottomnav/hub.html'
], function ($, _, Backbone, StateMachine, Erp, ViewManager, MetroUi, bottombarTemplate) {
    /*var BottomBarHubView = Backbone.View.extend({
     el: $("#pageFooter"),
     render: function () {
     this.$el.html(bottombarTemplate);
     $("#pageFooter").show();
     }
     });
     return BottomBarHubView;*/
    var erp = window.Erp,
        viewManager,
        createStateMachine = function(view) {
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
                        $(view.el).off('click').on('click', function () {
                            elt.trigger('hide');
                            setTimeout(function () {
                                elt.trigger('show');
                            }, 3000);
                        });
                    });

                },
                doHide: function () {
                    elt.fadeOut(fxDuration, function () {
                        $(view.el).off('click').on('click', function () {
                            elt.trigger('show');
                        });
                    });
                }
            });
            elt.startStateMachine();
            elt.trigger('initialized');
            erp.viewManager.push(Erp.ViewNames.HUB_BOTTOM_BAR, view);
        },
        fxDuration = 1000,
        BottomBarHubView = Backbone.View.extend({/*StatefulView.extend({*/
            el: $("#pageFooter"),
            debugStateMachine: true,
            render: function () {
                this.$el.html(bottombarTemplate);
                this.$el.fadeIn(fxDuration);
                this.$el.trigger('hub:bottombar:showing');
            },
            initialize: function () {
                createStateMachine(this);
            }
        });
    return BottomBarHubView;
});

