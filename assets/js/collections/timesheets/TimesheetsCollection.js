/*global App*/
define([
    'underscore',
    'backbone',
    // Pull in the Model module from above
    'models/timesheet/TimesheetModel'
], function (_, Backbone, Timesheet) {

    /**
     * Describe a list of timesheet in the application
     *
     * @author mlefebvre
     * @verrsion 0.01
     *
     * @type {*}
     */
    var Timesheets = Backbone.Collection.extend({
        model: Timesheet,
        url: 'http://corthay.self.local:3000/api/timesheets',
        urlExtension: ".json"
    });
    return Timesheets;
});