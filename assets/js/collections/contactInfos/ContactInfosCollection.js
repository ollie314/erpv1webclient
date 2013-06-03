/*global App*/
App.Collections.ContactInfos = Backbone.Collection.extend({
    model: Erp.Models.ContactInfo,
    url: 'http://corthay.self.local:3000/api/contact_infos'
});