define([
    'underscore',
    'backbone',
    'collections/timesheet/TimesheetEntriesCollection'
], function (_, Backbone, TimesheetEntries) {

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
    var Timesheet = Backbone.Model.extend({
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

            // enable nested modules.
            that.timesheetEntries = new TimesheetEntries();
            that.timesheetEntries.url = '/api/timesheets/' + this.id + '/timesheetentries';
            //that.timesheetEntries.on('reset', this.updateCounts)
        },
        urlRoot: 'http://corthay.self.local:3000/api/timesheets',
        urlExtension: ".json",
        toJSON: function () {
            return {
                "timesheet": {
                    "name": this.attributes['name'],
                    "date": this.attributes['date'],
                    "collaborator": this.attributes['collaborator'],
                    "description": this.attributes['description']
                }
            };
        }
    });
    return Timesheet;
});