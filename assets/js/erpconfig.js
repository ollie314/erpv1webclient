define([
], function () {
    function ErpConfig() {
        if ( ErpConfig.prototype._singletonInstance ) {
            return ErpConfig.prototype._singletonInstance;
        }
        ErpConfig.prototype._singletonInstance = this;

        this.server = "erp.corthay.self.local";
        this.port = 3000;
        this.runMode = (window.appRunMode != undefined) ? window.appRunMode : 0; // 0 is the production run mode
    }

    ErpConfig.prototype.getBackendUrl = function() {
        return "//" + this.server + ":" + String(this.port);
    };

    ErpConfig.prototype.getBackendUrlForEndpoint = function(endpoint, format){
        format = format || "json";
        return this.getBackendUrl() + "/" + endpoint + "." + format;
    };

    ErpConfig.prototype.getServerUrl = function() {
        return this.getBackendUrl();
    };

    ErpConfig.prototype.getServerPort = function() {
        return this.port;
    };

    return ErpConfig;
});
