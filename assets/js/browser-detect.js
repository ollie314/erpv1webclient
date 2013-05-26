define([], function () {

    /**
     * This is the browser detector object.
     *
     * @version 0.01
     * @author mlefebvre
     * @see browserDetector
     * @constructor
     */
    function BrowserDetect() {
    }

    /**
     * Initialize the detector
     *
     * @return void
     */
    BrowserDetect.prototype.init = function () {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    };

    /**
     * Search for browser name into the user agent signature
     * if the identity is detected, it will return the identity, If nothing was found, it will return nothing
     *
     * @return string|void
     */
    BrowserDetect.prototype.searchString = function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) != -1) {
                return data[i].identity;
            }
        }
    },

        BrowserDetect.prototype.searchVersion = function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index == -1) return;
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        },

        BrowserDetect.prototype.dataBrowser =
            [
                { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
                { string: navigator.userAgent, subString: "MSIE", identity: "Explorer" },
                { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
                { string: navigator.userAgent, subString: "Safari", identity: "Safari" },
                { string: navigator.userAgent, subString: "Opera", identity: "Opera" }
            ]

    return BrowserDetect;
});
