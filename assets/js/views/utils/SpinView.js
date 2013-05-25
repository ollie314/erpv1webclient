/*global $*/

// ============================================= \\
//
//     View dedicated to display waiting panel
//
// ============================================== \\
define([
    'jquery',
    'underscore',
    'backbone',
    'mediator',
    'erp',
    'spin',
    'text!/templates/utils/spin.html'
], function ($, _, Backbone, Mediator, Erp, Spinner, spinTemplate) {
    var spinnerOptions = {
            lines: 13, // The number of lines to draw
            length: 20, // The length of each line
            width: 10, // The line thickness
            radius: 30, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: '#000', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 'auto', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
        },
        erp = window.Erp,
        fxDuration = 1000,
        spinnerElt,
        spinnerAddDlgObj,
        SpinView = Backbone.View.extend({
            initialize : function() {
                var view = this,
                    elt = $(view.el);
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
                            var mediator = window.Erp.mediator;
                            mediator.publish('spin:show');
                        });

                    },
                    doHide: function () {
                        var mediator = window.Erp.mediator;
                        mediator.publish('spin:hide');
                    }
                });
                elt.startStateMachine({debugStateMachine : false});
                elt.trigger('initialized');
                erp.viewManager.push(Erp.ViewNames.HUB_BOTTOM_BAR, view);
                erp.mediator.on("hub:rendering:complete", function(date) {
                    view.stop();
                });
            },
            el: $("#pageContainer"),
            render: function () {
                var $spinner;
                this.$el.html(spinTemplate);
                this.$el.fadeIn(400);
                spinnerElt = document.getElementById('addDlgSpinner');
                spinnerAddDlgObj = new Spinner(spinnerOptions);
                $spinner = $('.spinner-elt', this.$el);
                $spinner.height(500);
                spinnerElt.style.display = "block";
                spinnerAddDlgObj.spin(spinnerElt);
                this.trigger('show');
            },
            stop: function () {
                if (undefined !== spinnerAddDlgObj) {
                    spinnerAddDlgObj.stop();
                }
                this.trigger('hide');
            }
        });
    return SpinView;
});


/*var spinnerElt = document.getElementById('addDlgSpinner'),
 spinnerAddDlgObj = new Spinner(spinnerOptions);
 $('#reservation').daterangepicker();
 $('.datepicker').datepicker();
 $(document).on('keyup', function( evt ) {
 evt.preventDefault();
 evt.stopPropagation();
 if( !evt.shiftKey  || evt.keyCode != 65 ) {
 return;
 }
 $("#addDialNavBarBtn").trigger('click');
 } );

 $(".btn-save-and-new","#addDialog").on('click', function( evt ) {
 var btn = $(this),
 container = $("#addDialog"),
 body = $('.modal-body form', container)
 $spinner = $('.spinner-elt', container),

 $spinner.height(body.height());

 spinnerAddDlgObj.spin(spinnerElt);
 body.fadeToggle(500, 'swing', function() {
 $spinner.fadeIn(100);
 setTimeout(function() {
 $spinner.hide();
 spinnerAddDlgObj.stop(spinnerElt);
 body.fadeToggle(500);
 }, 3000);
 } );
 } );*/