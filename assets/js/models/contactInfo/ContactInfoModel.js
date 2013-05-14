/*global App*/
App.Models.ContactInfo = Backbone.Model.extend({
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
    urlRoot: 'http://corthay.self.local:3000/api/contact_infos',
    urlExtension: ".json",
    toJSON: function () {
        return {"contact_info": {"name": this.attributes['name'], "info": this.attributes['info']}};
    }
});