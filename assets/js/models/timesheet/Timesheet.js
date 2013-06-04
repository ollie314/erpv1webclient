/**
 * $($$ID : corthay_201306031859-$$)
 * User: mlefebvre
 * Date: 03.06.13
 * Time: 18:59
 */
/*global define*/
/*global $*/
define([
    'underscore',
    'backbone',
    'date',
    'models/timesheet/task'
], function (_, Backbone, date, Task) {
    'use strict';
    /**
     * @author mlefebvre - mlefebvre[at]simnetsa[dot]com
     * @version 0.01
     *
     * @todo : it may useful to add internal name to be able to let the user define his own "title" of the unit and keeping
     * an more convenient one for internal processes.
     *
     * @type {*}
     */
    var Timesheet = Backbone.RelationalModel.extend({
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
                if (that.get('_csrf') !== 'undefined') {
                    jqXHR.setRequestHeader('X-CSRF-Token', that.get('_csrf'));
                }
            });
            this.date = new Date();
        },
        urlRoot: 'http://corthay.self.local:3000/api/timesheets',
        urlExtension: ".json",
        toJSON: function () {
            return {
                "timesheet": {
                    "owner_id": this.attributes['owner_id'],
                    "date": this.attributes['date']
                }
            };
        }
    });
    return Task;
});