/*global App*/
define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var MaterialModel = Backbone.Model.extend({
        initialize: function () {
            var that = this;
            // Hook into jquery
            // Use withCredentials to send the server cookies
            // The server must allow this through response headers
            $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
                options.xhrFields = {
                    withCredentials: false
                };
                // If we have a csrf token send it through with the next request
                if (typeof that.get('_csrf') !== 'undefined') {
                    jqXHR.setRequestHeader('X-CSRF-Token', that.get('_csrf'));
                }
            });
            this.attributes["subtotal"] = 0;
        },
        urlRoot: 'http://corthay.self.local:3000/api/contact_infos',
        urlExtension: ".json",
        toJSON: function () {
            return {
                "material_model": {
                    "date": this.attributes['date'],
                    "code": this.attributes['code'],
                    "quantity": this.attributes['quantity'],
                    "label": this.attributes['label'],
                    "unit": this.attributes['unit'],
                    "price": this.attributes['price']
                }
            };
        }
    });
    return MaterialModel;
});