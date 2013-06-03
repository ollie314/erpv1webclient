define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var Provider = Backbone.Model.extend({
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
        },
        urlRoot: 'http://corthay.self.local:3000/api/providers',
        urlExtension: ".json",
        toJSON: function () {
            return {
                "provider": {
                    "name": this.attributes['name'],
                    "phone": this.attributes['phone'],
                    "mail": this.attributes['mail'],
                    "address": this.attributes['address'],
                    "description": this.attributes['description']
                }
            };
        }
    });
    return Provider;
});