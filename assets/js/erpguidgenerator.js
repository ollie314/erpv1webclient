/**
 * $($$ID : corthay_201306031727-$$)
 * User: mlefebvre
 * Date: 03.06.13
 * Time: 17:27
 */
/*global define*/
define([], function () {
    'use strict';
    function ErpGuidGenerator() {

    }

    ErpGuidGenerator.prototype.generate = function () {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };

        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    return ErpGuidGenerator;
});