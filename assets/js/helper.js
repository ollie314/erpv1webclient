/**
 * Created with JetBrains PhpStorm.
 * User: mehlef
 * Date: 23.04.13
 * Time: 13:19
 * To change this template use File | Settings | File Templates.
 */

// ============================================= \\
//
//               Restfull preparation
//
// ============================================== \\

// adding cors support for the client
(function () {

    var proxiedSync = Backbone.sync;

    Backbone.sync = function (method, model, options) {
        options || (options = {});

        if (!options.crossDomain) {
            options.crossDomain = true;
        }

        if (!options.xhrFields) {
            options.xhrFields = {withCredentials: true};
        }

        return proxiedSync(method, model, options);
    };
})();

$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    /*options.url = options.url + "?format=json";
     options.contentType = "application/json";*/
});

// ============================================= \\