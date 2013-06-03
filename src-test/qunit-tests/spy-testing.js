/**
 * Created with JetBrains PhpStorm.
 * User: mehlef
 * Date: 03.06.13
 * Time: 09:25
 * To change this template use File | Settings | File Templates.
 */
function once(fn) {
    'use strict';
    var returnValue, called = false;
    return function () {
        if (!called) {
            called = true;
            returnValue = fn.apply(this, arguments);
        }
        return returnValue;
    };
}
