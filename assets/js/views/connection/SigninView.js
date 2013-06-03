/*global $*/

// ============================================= \\
//
//     View dedicated to display signin behavior
//
// ============================================== \\
define([
    'jquery',
    'underscore',
    'backbone',
    'bootMetro',
    'mediator',
    'erp',
    'views/navigation/topnav/AnonNavView',
    'views/sidebars/help/SidebarHelpAuthentView',
    'text!/templates/connection/signin.html'
], function ($, _, Backbone, MetroUi, Mediator, Erp, AnonNavView, SidebarHelpAuthentView, signinTemplate) {
    var erp = window.Erp,
        mediator = erp.mediator,
        success = false,
        initNavbars = function () {
            var anonView = new AnonNavView(),
                sidebarHelpAuthentView = new SidebarHelpAuthentView();
            anonView.render();
            sidebarHelpAuthentView.render();
        },
        SigninView = Backbone.View.extend({
            el: $("#pageContainer"),
            render: function () {
                var elt = this.$el,
                    validResponse = null,
                    extractResponse = function (data) {
                        if (data.hasOwnProperty('responseText')) {
                            return $.parseJSON(data.responseText);
                        }
                        return null;
                    },
                    validateForm = function (form) {
                        form = form || $("#loginForm");
                        var login = $("#inputEmail", form).val(),
                            password = $("#inputPassword", form).val(),
                            re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                            header,
                            message,
                            data;
                        if (!re.test(login)) {
                            header = "Error";
                            message = "Email is not valid";
                            data = {
                                header : header,
                                message : message,
                                autohide : true
                            };
                            mediator.publish('erp:notification', data);
                            return false;
                        }
                        if (String.isNullOrEmpty(password) || password.length < 6) {
                            header = "Error";
                            message = "The password shouldn't be null and must match with the expected complexity.\nMinimal length = 6 char";
                            data = {
                                header : header,
                                message : message,
                                autohide : true
                            };
                            mediator.publish("erp:notification", data);
                            return false;
                        }
                        return true;
                    };
                setTimeout(function () {
                    initNavbars();
                    elt.html(signinTemplate);
                    $("#inputEmail").focus();
                    $("#signinBtn").button().on('click', function () {
                        var btn = $(this),
                            form = $(this).closest('form');
                        if (!validateForm(form)) {
                            return false;
                        }
                        btn.button('loading');
                        $.ajax({
                            url: Erp.config.getBackendUrlForEndpoint("api/connection/signin"),
                            data: form.serialize(),
                            dataType: 'json',
                            type: "POST",
                            beforeSend: function () {
                                mediator.publish(Erp.Events.AJAX_LOADING_START);
                            },
                            statusCode: {
                                400: function (data, errorText, reason) {
                                    alert("The mail format is not valid");
                                    validResponse = false;
                                    success = false;;
                                    mediator.publish(Erp.Events.AJAX_LOADING_FAILURE);
                                    mediator.publish(Erp.Events.AUTHENT_FAILURE);
                                    return false;
                                },
                                401: function (data, erroText, reason) {
                                    // take care with this part since jQuery fire an error even if response is trapped by this method.
                                    // So, do nothing to prevent jquery error performing. simply manage the response here instead of
                                    // in the error method.
                                    // Error handler should be use only to trap an error occurred on the network layer
                                    // and untrap by the application logic. We may set a flag to indicate if the error has been
                                    // manage or not (a simple global var should do the stuff). By checking this flag, application known if
                                    // the response has been manage
                                    var response = extractResponse(data);
                                    if (null == response) {
                                        alert("An unexpected error occurred on the backend, please contact your system administrator");
                                    }
                                    validResponse = false;
                                    mediator.publish(Erp.Events.AUTHENT_FAILURE);
                                    success = false;
                                    return false;
                                },
                                200: function (data, statusCode, jqXhr) {
                                    // TODO : use data to set up the application to indicate that the user has been logged in
                                    document.location.href += "#hub";
                                    validResponse = true;
                                    success = true;
                                    mediator.publish(Erp.Events.AUTHENT_SUCCESS);
                                    return false;
                                }
                            },
                            success: function (data, status, jqXhr) {
                                mediator.publish(Erp.Events.AJAX_LOADING_SUCCESS);
                                // WARN : fire before statusCode handler
                                return false;
                            },
                            complete: function () {
                                if (null === validResponse) {
                                    // it means the the response has never been managed
                                    mediator.publish(Erp.Events.AJAX_LOADING_FAILURE);
                                    mediator.publish(Erp.Events.AUTHENT_FAILURE);
                                    alert("An error occurred on the backend, please contact your system administrator");
                                }
                                mediator.publish(Erp.Events.AJAX_LOADING_COMPLETE);
                                btn.button('reset');
                                if(success) {
                                    document.location.href = "#hub";
                                    document.location.reload();
                                }
                            },
                            error: function (status, xhr, errorThrown) {
                                // WARN : fire before statusCode handler
                                mediator.publish(Erp.Events.AJAX_LOADING_FAILURE);
                                return false;
                            }
                        });
                        return false;
                    });
                }, 1000);
            }
        });
    return SigninView;
});

