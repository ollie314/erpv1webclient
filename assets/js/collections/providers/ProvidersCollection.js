/*global App*/
define([
    'underscore',
    'backbone',
    // Pull in the Model module from above
    'models/provider/ProviderModel'
], function (_, Backbone, Provider) {
    var Providers = Backbone.Collection.extend({
        model: Provider,
        url: 'http://corthay.self.local:3000/api/providers',
        urlExtension: ".json"
    });
    return Providers;
});