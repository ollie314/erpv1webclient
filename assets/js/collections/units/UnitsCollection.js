/*global App*/
define([
    'underscore',
    'backbone',
    // Pull in the Model module from above
    'models/unit/UnitModel'
], function (_, Backbone, Unit) {

    /**
     * Describe a list of unit on the application.
     *
     * @author mlefebvre
     * @verrsion 0.01
     *
     * @type {*}
     */
    var Units = Backbone.Collection.extend({
        model: Unit,
        url: 'http://corthay.self.local:3000/api/units',
        urlExtension: ".json"
    });
    return Units;
});