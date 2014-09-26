describe("boxBuilder object", function() {
    var boxBuilder;
    beforeEach(function() {
        boxBuilder = BoxBuilder.create({
            objectLength : 24,
            objectWidth : 20.75,
            objectHeight : 32.25
        });
    });
    it("should exist", function() {
        expect(boxBuilder).toBeTruthy();
    });
    it("should have a length", function() {
        expect(boxBuilder.objectLength()).toEqual(24);
    });
    it("should have a width", function() {
        expect(boxBuilder.objectWidth()).toEqual(20.75);
    });
    it("should have a height", function() {
        expect(boxBuilder.objectHeight()).toEqual(32.25);
    });
});
