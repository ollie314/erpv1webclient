/**
 * $($$ID : corthay_201306031629-$$)
 * User: mlefebvre
 * Date: 03.06.13
 * Time: 16:29
 */
/*global QUnit*/
/*global require*/
(function () {

    // Defer Qunit so RequireJS can work its magic and resolve all modules.
    QUnit.config.autostart = false;

    // Configure RequireJS so it resolves relative module paths from the `src`
// folder.
    require.config({
        baseUrl: "/assets/js"
    });

// A list of all QUnit test Modules. Make sure you include the `.js`
// extension so RequireJS resolves them as relative paths rather than using
// the `baseUrl` value supplied above.
    var testModules = [
        "/src-test/qunit-tests/models/timesheet/TimesheetTests.js"
    ];

    // Resolve all testModules and then start the Test Runner.
    require(testModules, QUnit.start);
}());