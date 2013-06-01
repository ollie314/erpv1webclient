define([
    'jquery',
    'underscore',
    'backbone',
    'stateMachine',
    'erp',
    'bootMetro',
    'text!/templates/hub/modules/site/navigation/bottom_bar.html'
], function ($, _, Backbone, StateMachine, Erp, MetroUi, bottombarTemplate) {
    /*var BottomBarHubView = Backbone.View.extend({
     el: $("#pageFooter"),
     render: function () {
     this.$el.html(bottombarTemplate);
     $("#pageFooter").show();
     }
     });
     return BottomBarHubView;*/
    var erp = window.Erp,
        mediator = erp.mediator,
        createStateMachine = function(view) {
            var elt = view.$el;
            _.extend(elt, Backbone.StateMachine, Backbone.Events, {

                states: {
                    'visible': {enter: ['doShow'], leave: ['doHide']}
                },

                transitions: {
                    'init': {
                        'initialized': {
                            enterState: 'visible',
                            callbacks: ['initClickHandlers']
                        }
                    },
                    'visible': {
                        'hide': {
                            enterState: 'hidden',
                            triggers: 'site:nav:bottom:hide',
                            callbacks: []
                        }
                    },
                    'hidden': {
                        'show': {
                            enterState: 'visible',
                            triggers: 'site:nav:bottom:show',
                            callbacks: []
                        }
                    }
                },
                doShow: function () {
                    elt.fadeIn(fxDuration);

                },
                doHide: function () {
                    elt.fadeOut(fxDuration);
                },
                initClickHandlers: function() {
                    mediator.on("site:bottombar:showing", function() {
                        // arm save button click
                        $("#saveDialog").on('click', function() {
                            mediator.publish('site:nav:bottom:save:click');
                        });

                        // arm navigation buttons ...
                        $(".win-command", "#siteManagerBottomBar").on('click', function() {
                            var href = $(this).attr('data-href');
                            if(null === href || undefined === href) {
                                return;
                            }
                            document.location.href = href;
                            return false;
                        });

                        $("#addDialNavBarBtn").on('click', function() {
                            mediator.publish("nav:bottom:add:click");
                        });
                    });
                }
            });
            elt.startStateMachine();
            elt.trigger('initialized');
            erp.viewManager.push(Erp.ViewNames.SITE_MANAGER_BOTTOM_BAR, view);
        },
        fxDuration = 1000,
        BottomBarHubView = Backbone.View.extend({/*StatefulView.extend({*/
            el: $("#pageFooter"),
            debugStateMachine: true,
            render: function () {
                this.$el.html(bottombarTemplate);
                this.$el.fadeIn(fxDuration);
                mediator.publish('site:bottombar:showing');
            },
            initialize: function () {
                createStateMachine(this);
            },
            hide: function() {
                this.trigger('hide');
                mediator.publish('site:bottombar:hiding');
            },
            detach: function() {
                // should remove element from the dom but keep it in the view stack
                if(!erp.viewManager.has(Erp.ViewNames.SITE_MANAGER_BOTTOM_BAR)) {
                    erp.viewManager.push(Erp.ViewNames.SITE_MANAGER_BOTTOM_BAR, this);
                }
                this.$el.html('');
                mediator.publish('site:bottombar:detached');
            },
            attach: function() {
                // attach the view to the DOM. It should look for view into the view stack
                if(erp.viewManager.has(Erp.ViewNames.SITE_MANAGER_BOTTOM_BAR)) {
                    var view = erp.viewManager.get(Erp.ViewNames.SITE_MANAGER_BOTTOM_BAR);
                    view.render();
                    mediator.publish('site:bottombar:attached');
                }

            }
        });
    return BottomBarHubView;
});

