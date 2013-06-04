/**
 * $($$ID : corthay_201306031619-$$)
 * User: mlefebvre
 * Date: 03.06.13
 * Time: 16:19
 */
/*global define*/
/*global QUnit*/
define([
    'jquery',
    'underscore',
    'backbone',
    'models/contact/ContactModel',
    'collections/timesheet/TaskCollection',
    'models/timesheet/Task'
], function ($, _, Backbone, Contact, Timesheet, TimesheetEntry) {
    'use strict';
    var contact,
        timesheet;

    QUnit.module("models/timesheet", {
        setup: function () {
            contact = new Contact();
            contact.firstname = "Mehdi";
            contact.lastname = "Lefebvre";
            contact.mail = "mlefebvre@simnetsa.ch";
            timesheet = new Timesheet();
        },
        teardown: function () {
            contact.firstname = "";
            contact.lastname = "";
            contact.mail = "";
            contact = null;
        }
    });

    QUnit.test("Test contact init", function () {
        QUnit.equal(contact.firstname, "Mehdi", "Contact firstname is not valid");
        QUnit.equal(contact.lastname, "Lefebvre", "Contact lastname is not valid");
        QUnit.equal(contact.mail, "mlefebvre@simnetsa.ch", "Contact mail is not valid");
    });
});