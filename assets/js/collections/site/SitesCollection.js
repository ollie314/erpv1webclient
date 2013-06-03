/*global App*/
define([
    'underscore',
    'backbone',
    // Pull in the Model module from above
    'models/unit/SiteModel'
], function (_, Backbone, Code) {

    /**
     * Describe a list of code in the application
     *
     * @author mlefebvre
     * @verrsion 0.01
     *
     * @type {*}
     */
    var Sites = Backbone.Collection.extend({
        model: Code,
        url: 'http://corthay.self.local:3000/api/codes',
        urlExtension: ".json"
    });
    return Sites;
});