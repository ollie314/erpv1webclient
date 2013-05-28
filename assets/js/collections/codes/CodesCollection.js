/*global App*/
define([
    'underscore',
    'backbone',
    // Pull in the Model module from above
    'models/unit/CodeModel'
], function (_, Backbone, Code) {

    /**
     * Describe a list of code in the application
     *
     * @author mlefebvre
     * @verrsion 0.01
     *
     * @type {*}
     */
    var Code = Backbone.Collection.extend({
        model: Code,
        url: 'http://corthay.self.local:3000/api/codes',
        urlExtension: ".json"
    });
    return Code;
});