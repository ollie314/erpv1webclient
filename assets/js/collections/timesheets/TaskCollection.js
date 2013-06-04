/**
 * $($$ID : corthay_201306031853-$$)
 * User: mlefebvre
 * Date: 03.06.13
 * Time: 18:53
 */
/*global define*/
define([
    'underscore',
    'backbone',
    // Pull in the Model module from above
    'models/timesheet/Timesheet',
    'models/timesheet/Task'
], function (_, Backbone, Timesheet, Task) {
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
        model: Task,
        url: 'http://corthay.self.local:3000/api/timesheets', // remove by the parent element
        urlExtension: ".json"
    });
    return Timesheet;
});