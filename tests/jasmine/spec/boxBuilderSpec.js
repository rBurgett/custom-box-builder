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
    it("should have a default foam corner width", function() {
        expect(boxBuilder.foamCornerWidth()).toBeTruthy();
    });
    it("should have a default cardboard width", function() {
        expect(boxBuilder.cardboardWidth()).toBeTruthy();
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
    describe("init method", function () {
        it("should take an optional foamCornerWidth property", function () {
            boxBuilder = BoxBuilder.create({
                objectLength : 24,
                objectWidth : 20.75,
                objectHeight : 32.25,
                foamCornerWidth : 0.75
            });
            expect(boxBuilder.foamCornerWidth()).toEqual(0.75);
        });
        it("should take an optional cardboardWidth property", function () {
            boxBuilder = BoxBuilder.create({
                objectLength : 24,
                objectWidth : 20.75,
                objectHeight : 32.25,
                cardboardWidth : 0.125
            });
            expect(boxBuilder.cardboardWidth()).toEqual(0.125);
        });
    });
});
