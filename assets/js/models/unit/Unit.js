/**
 * Created with JetBrains PhpStorm.
 * User: mehlef
 * Date: 31.05.13
 * Time: 15:27
 * To change this template use File | Settings | File Templates.
 */
function Unit() {
    this.firstname = "";
    this.lastname = "";
    this.description = "";
    this.id = 0;
}

Unit.prototype.getName = function() {
    return this.firstname + " " + this.lastname;
};