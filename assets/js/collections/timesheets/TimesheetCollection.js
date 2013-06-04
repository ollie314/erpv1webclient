/*global define*/
define([
    'underscore',
    'backbone',
    // Pull in the Model module from above
    'models/timesheet/TimesheetEntry'
], function (_, Backbone, TimesheetEntry) {
    'use strict';

    /**
     * Describe a list of timesheet entries in the application.
     * This is a nested element (under timesheet).
     *
     * @author mlefebvre
     * @verrsion 0.01
     *
     * @type {*}
     */
    var Timesheet = Backbone.Collection.extend({
        model: TimesheetEntry,
        url: 'http://corthay.self.local:3000/api/timesheets', // remove by the parent element
        urlExtension: ".json"
    });
    return Timesheet;
});