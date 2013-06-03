define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    /**
     * Describe a unit, like m2, m3, m, km, ...
     * This is useful to calculate some information for invocing.
     *
     * @author mlefebvre - mlefebvre[at]simnetsa[dot]com
     * @version 0.01
     *
     * @todo : it may useful to add internal name to be able to let the user define his own "title" of the unit and keeping
     * an more convenient one for internal processes.
     *
     * @type {*}
     */
    var Unit = Backbone.Model.extend({
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
        urlRoot: 'http://corthay.self.local:3000/api/units',
        urlExtension: ".json",
        toJSON: function () {
            return {
                "unit": {
                    "name": this.attributes['name'],
                    "description": this.attributes['description']
                }
            };
        }
    });
    return Unit;
});