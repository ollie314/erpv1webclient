/**
 * Created with JetBrains PhpStorm.
 * User: mehdi
 * Date: 6/1/13
 * Time: 10:15 PM
 * To change this template use File | Settings | File Templates.
 */
/*global window jQuery undersore*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/utils/erpnotification.html',
    'i18n!views/utils/nls/main'
], function($, _, Backbone, viewTemplate, I18nObject) {

    function ErpNotification() {
        this.sel = ".toast:last-child";
        this.container = "#notificationContainer";
        this.fadeDuration = 200;
        this.displayDuration = 3000;

        this.destroy = function() {
            $(this.sel, this.container).remove();
        };
    }

    ErpNotification.prototype.show = function(header, message, options) {
        options = options || {};
        var that = this,
            tplVars = {
                header : header,
                message : message
            },
            template = _.template(viewTemplate, tplVars);
        $($(this.container).append($(template)).find(this.sel)).fadeIn(this.fadeDuration, function() {
            if(options.hasOwnProperty('autohide') && options.autohide) {
                var duration = options.hasOwnProperty('displayDuration') ? options.displayDuration : that.displayDuration;
                setTimeout(function () {
                    that.hide();
                }, duration);
            }
        });
    };

    ErpNotification.prototype.hide = function() {
        var that = this;
        $(this.sel).fadeOut(this.fadeDuration, function() {
            that.destroy();
        });
    };

    return ErpNotification;
});
