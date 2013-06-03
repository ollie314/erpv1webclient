/*global test*/
/*global ok*/
/*global sinon*/
/**
 * Created with JetBrains PhpStorm.
 * User: mehlef
 * Date: 03.06.13
 * Time: 09:07
 * To change this template use File | Settings | File Templates.
 */
test("hello test", function () {
    'use strict';
    var a = 1,
        b = '1';
    ok(a !== b, "String and int diff!");
    ok(a == b, "Int val in string and int equals");
});

test("Spy testing", function() {
    var callback = sinon.spy(),
        proxy = once(callback);

    proxy();
    ok(callback.called);
});