/*global $*/

// ============================================= \\
//
//           Erp Application core engine
//
// ============================================== \\

define([
    'Erp'
], function (Erp) {
    function ViewManager(erp) {
        if(this.erp == undefined) {
            this.erp = erp;
        }
    };

    ViewManager.prototype.setErp = function (erp) {
        this.erp = erp;
    };

    ViewManager.prototype.add = function (name, view) {
        if (this.erp.Views.hasOwnProperty(name)) {
            return;
        }
        this.erp.Views[name] = view;
    };

    ViewManager.prototype.push = function (name, view) {
        if (this.erp.Views.hasOwnProperty(name)) {
            return;
        }
        this.erp.Views[name] = view;
    };

    ViewManager.prototype.drop = function (name) {
        if (!this.erp.Views.hasOwnProperty(name)) {
            return;
        }
        delete(this.erp.Views[name]);
    };

    ViewManager.prototype.has = function (name) {
        return this.erp.Views.hasOwnProperty(name);
    };

    ViewManager.prototype.get = function (name) {
        if (this.has(name)) {
            return window.Erp.Views[name];
        } else {
            return null;
        }
    };

    ViewManager.prototype.getCurrentState = function (name) {
        if (!this.has(name)) {
            return false;
        }
        return this.get(name).$el.currentState;
    };

    ViewManager.initialize = function () {
        if (window.Erp == undefined) {
            Erp.initialize();
        }
        if (window.Erp.viewManager == undefined) {
            window.Erp.viewManager = new ViewManager(window.Erp);
        }
        return window.Erp.viewManager;
    };

    ViewManager.initialize();

    return ViewManager;
});