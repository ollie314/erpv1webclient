/**
 * Created with JetBrains PhpStorm.
 * User: mehlef
 * Date: 03.06.13
 * Time: 09:33
 * To change this template use File | Settings | File Templates.
 */
/*global pavlov*/
/*global describe*/
/*global before*/
/*global after*/
/*global it*/
/*global ok*/
/*global assert*/
/*global CompileProcess*/

pavlov.specify("The Rules of Bowling", function (){
    'use strict';
    describe("Tesing upgrade version", function () {
        var process;
        before(function () {
            process =  new CompileProcess();
        });
        after(function () {
            process = null;
        });
        it("Should initialize version to 1", function () {
            assert(process.version).equals(1);
        });
        it("Should be upgraded correctly", function () {
            var currentVersion = process.version;
            process.upgrade();
            assert(process.version).equals(currentVersion + 1);
        });
    });
});
