define([
], function () {

    var mediator = window.Erp.mediator;

    function ErpLoader() {
        this.loadModule = function(moduleName) {

        };
        this.loadSiteModule = function() {
            alert("Site request");
        };

        this.loadTimesheetModule = function() {
            alert("Timesheet request");
        };

        this.loadAddressbookModule = function() {
            alert("Addressbook request");
        };
    }

    ErpLoader.prototype.initialize = function() {
        var that = this;
        mediator.subscribe('hub:timesheet:access:request', function() {
            that.loadTimesheetModule.call(that, arguments);
        });
        mediator.subscribe('hub:addressbook:access:request', function() {
            that.loadAddressbookModule.call(that, arguments);
        });
        mediator.subscribe('hub:sitemodule:access:request', function() {
            that.loadSiteModule.call(that, arguments);
        });
    };

    return ErpLoader;
});