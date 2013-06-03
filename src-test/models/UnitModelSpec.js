/**
 * Created with JetBrains PhpStorm.
 * User: mehlef
 * Date: 31.05.13
 * Time: 14:15
 * To change this template use File | Settings | File Templates.
 */
describe('Unit', function() {
    beforeEach(function() {
        unit = new Unit();
    });

    it("should id equals to 0", function() {
        expect(unit.id).toEqual(0);
    });

    it("Should name correctly formatted", function() {
        unit.firstname = "Mehdi";
        unit.lastname = "Lefebvre";
        console.log("OK:");
        expect(unit.getName()).toEqual("Mehdi Lefebvre");
    });
});

