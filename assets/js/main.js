/*global $ */
/*global window */
/*global log4javascript */
/*global require */
/*global define */

// ===================================================== \\
//                                                       \\
//     Describe the dependencies on the application      \\
//                                                       \\
// ===================================================== \\
require.config({
    baseUrl: '/assets/js',
    urlArgs: "refresh=" + (new Date()).getTime(),
    paths: {
        jquery: './libs/jquery/jquery-min',
        bootstrap: "./libs/bootstrap/bootstrap",
        underscore: './libs/underscore/underscore-min',
        backbone: './libs/backbone/backbone-min',
        backbonerelational: './libs/backbone/backbone-relational',
        text: './libs/require/text',
        domReady: './libs/require/domReady',
        i18n: './libs/require/i18n',
        stateMachine: './libs/backbone/backbone.statemachine',
        mediator: './libs/mediatorjs/mediator',
        mousewheel: './libs/jquery/jquery.mousewheel',
        scrollTo: './libs/jquery/jquery.scrollTo',
        bootMetro: './libs/bootstrap/bootmetro/bootmetro',
        bootMetroPanorama: './libs/bootstrap/bootmetro/bootmetro-panorama',
        bootMetroPivot: './libs/bootstrap/bootmetro/bootmetro-pivot',
        bootMetroCharms: './libs/bootstrap/bootmetro/bootmetro-charms',
        touchSwipe: './libs/jquery/jquery.touchSwipe',
        bootstrapDatepicker: './libs/bootstrap/bootstrap-datepicker',
        bootstrapDateRangepicker: './libs/bootstrap/daterangepicker',
        bootstrapTimepicker: './libs/bootstrap/bootstrap-timepicker.min',
        wysihtml5: './libs/bootstrap/wysihtml5-min',
        bootstrapWysihtml5: './libs/bootstrap/bootstrap-wysihtml5',
        date: './libs/date',
        bootstrapEditable: './libs/bootstrap/bootstrap-editable-min',
        spin: './spin',
        erp: './erp',
        erploader: './erploader',
        erpnotification: './views/utils/ErpNotification',
        erpconfig: './erpconfig',
        erpguidgenerator: './erpguidgenerator',
        helper: './helper',
        viewManager: './ViewManager',
        browserDetect: './browser-detect',
        templates: '/templates'
    },
    locale: "fr-fr",
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'backbonerelational': {
            deps: ['underscore', 'backbone'],
            exports: 'BackboneRelational'
        },
        'mediator': {
            deps: ['jquery', 'underscore', 'backbone'],
            exports: 'Mediator'
        },
        'scrollTo': {
            deps: ['jquery'],
            exports: 'jQueryScrollTo'
        },
        bootMetro: {
            deps: ['jquery', 'bootstrap', 'mousewheel'],
            exports: 'MetroUi'
        },
        stateMachine: {
            deps: ['underscore', 'backbone'],
            exports: "StateMachine"
        },
        bootMetroCharms: {
            deps: ['jquery', 'bootstrap', 'mousewheel'],
            exports: 'BootMetroChams'
        },
        bootMetroPanorama: {
            deps: ['jquery', 'bootstrap'],
            exports: 'MetroPanorama'
        },
        bootMetroPivot: {
            deps: ['jquery', 'bootstrap'],
            exports: 'MetroPivot'
        },
        'bootstrap': {
            deps: ['jquery'],
            exports: 'Bootstrap'
        },
        touchSwipe: {
            deps: ['jquery'],
            exports: 'jQueryTouchewipe'
        },
        bootstrapDatepicker: {
            deps: ['jquery', 'bootstrap', 'date'],
            exports: 'BootstrapDatePicker'
        },
        date: {
            deps: [],
            exports: 'DateLib'
        },
        mousewheel: {
            deps: ['jquery'],
            exports: 'mouseWheel'
        },
        bootstrapDateRangepicker: {
            deps: ['jquery', 'bootstrap'],
            exports: "DaterangePicker"
        },
        wysihtml5: {
            deps: ['jquery', 'bootstrap'],
            exports: 'Wysihtml5'
        },
        bootstrapWysihtml5: {
            deps: ['jquery', 'bootstrap', 'wysihtml5'],
            exports: 'Wysihtml5'
        },
        bootstrapEditable: {
            deps: ['jquery', 'bootstrap'],
            exports: 'BootstrapEditable'
        },
        spin: {
            deps: [],
            exports: 'SpinJs'
        },
        helper: {
            deps: ['jquery', 'spin', 'bootstrap', 'date'],
            exports: 'Help'
        },
        browserDetect: {
            deps: [],
            exports: 'BrowserDetect'
        },
        erp: {
            deps: ['jquery', 'spin', 'bootstrap', 'date', 'browserDetect', 'erpconfig', 'mediator'],
            exports: 'Erp'
        },
        erploader: {
            deps: ['jquery', 'mediator', 'erp'],
            exports: 'ErpLoader'
        },
        erpnotification: {
            deps: ['jquery', 'underscore', 'backbone', 'text', 'i18n'],
            exports: 'ErpNotification'
        },
        erpconfig: {
            deps: [],
            exports: 'ErpConfig'
        },
        erpguidgenerator: {
            deps: [],
            exports: 'ErpGuidGenerator'
        },
        viewManager: {
            deps: ['jquery', 'spin', 'bootstrap', 'date', 'browserDetect', 'erp'],
            exports: 'ViewManager'
        }
    }
});

require([
    'application'
], function (App) {
    'use strict';
    window.log = log4javascript.getDefaultLogger();
    App.initialize();
});
