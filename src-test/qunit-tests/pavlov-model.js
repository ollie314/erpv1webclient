/**
 * Created with JetBrains PhpStorm.
 * User: mehlef
 * Date: 03.06.13
 * Time: 09:33
 * To change this template use File | Settings | File Templates.
 */
function CompileProcess() {
    'use strict';
    this.version = 1;
}

CompileProcess.prototype.upgrade = function () {
    'use strict';
    this.version += 1;
};
