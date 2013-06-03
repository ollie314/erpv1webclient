/**
 * Created with JetBrains PhpStorm.
 * User: mlefebvre
 * Date: 6/1/13
 * Time: 10:15 PM
 * To change this template use File | Settings | File Templates.
 */
/*global window*/
/*global jQuery*/
/*global define*/
/*global setTimeout*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/utils/erpnotification.html',
    'i18n!views/utils/nls/main'
], function ($, _, Backbone, viewTemplate, I18nObject) {
    'use strict';
    function ErpNotification() {
        this.sel = ".toast:last-child";
        this.container = "#notificationContainer";
        this.fadeDuration = 200;
        this.displayDuration = 3000;

        this.destroy = function () {
            $(this.sel, this.container).remove();
        };
    }

    ErpNotification.prototype.show = function (header, message, options) {
        options = options || {};
        var that = this,
            tplVars = {
                header: header,
                message: message
            },
            kind = options.hasOwnProperty('kind') ? options.kind : 'notification',
            colorClasses = ['toast-info', 'toast-success', 'toast-alert', 'toast-warn', 'toast-warning', 'toast-notification'],
            className,
            i,
            template = _.template(viewTemplate, tplVars),
            myToast = $($(this.container).append($(template)).find(this.sel));
        switch (kind) {
        case 'info':
        case 'message':
            className = "toast-info";
            break;
        case 'warn':
        case 'warning':
            className = "toast-warn";
            break;
        case 'alert':
            className = "toast-alert";
            break;
        case 'success':
            className = "toast-success";
            break;
        case 'notification':
            className = "toast-notification";
            break;
        default:
            className = "toast-notification";
        }
        $.each(colorClasses, function (index, aClass) {
            myToast.removeClass(aClass);
        });
        if (options.hasOwnProperty('css')) {
            for (i in options.css) {
                // be sure to avoid to target prototype item
                if (options.css.hasOwnProperty(i)) {
                    myToast.css(i, options.css[i]);
                }
            }
        }
        myToast.addClass(className).fadeIn(this.fadeDuration, function () {
            if (options.hasOwnProperty('autohide') && options.autohide) {
                var duration = options.hasOwnProperty('displayDuration') ? options.displayDuration : that.displayDuration;
                setTimeout(function () {
                    that.hide();
                }, duration);
            }
        });
    };

    ErpNotification.prototype.hide = function () {
        var that = this;
        $(this.sel).fadeOut(this.fadeDuration, function () {
            that.destroy();
        });
    };

    return ErpNotification;
});
