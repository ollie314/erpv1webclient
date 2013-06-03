/*global App*/
define([
    'underscore',
    'backbone',
    // Pull in the Model module from above
    'models/timesheet/TimesheetEntry'
], function (_, Backbone, TimesheetEntry) {

    /**
     * Describe a list of timesheet entries in the application.
     * This is a nested element (under timesheet).
     *
     * @author mlefebvre
     * @verrsion 0.01
     *
     * @type {*}
     */
    var TimesheetEntries = Backbone.Collection.extend({
        model: TimesheetEntry,
        url: 'http://corthay.self.local:3000/api/timesheet', // remove by the parent element
        urlExtension: ".json"
    });
    return TimesheetEntries;
});