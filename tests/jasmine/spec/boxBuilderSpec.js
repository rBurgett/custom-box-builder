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
    it("should have a cardboard fold width", function() {
        expect(boxBuilder._foldWidth).toBeTruthy();
    });
    it("should have a foam corners property set to true", function() {
        expect(boxBuilder._foamCorners).toBeTruthy();
    });
    it("should have a length", function() {
        expect(boxBuilder.objectLength()).toBeTruthy();
    });
    it("should have a width", function() {
        expect(boxBuilder.objectWidth()).toBeTruthy();
    });
    it("should have a height", function() {
        expect(boxBuilder.objectHeight()).toBeTruthy();
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
    describe("boxType method", function () {
        it("should return 'flat' if the smallest dimension is less than 9 inches and the other dimensions are each more than twice as long as the smallest dimension", function () {
            boxBuilder = BoxBuilder.create({
                objectLength : 24,
                objectWidth : 20,
                objectHeight : 6,
            });
            expect(boxBuilder.boxType()).toBe("flat");
        });
        it("should return 'skinny' if the smallest dimension is less than 9 inches and one of the other two dimensions is less than twice as long as the smallest dimension", function () {
            boxBuilder = BoxBuilder.create({
                objectLength : 24,
                objectWidth : 10,
                objectHeight : 6,
            });
            expect(boxBuilder.boxType()).toBe("skinny");
        });
    });
    describe("specs method", function () {
        it("should return an object", function () {
            expect(boxBuilder.specs()).toBeTruthy();
        });
        describe("if the boxType is flat, the object", function () {
            it("should have a top", function () {
                expect(boxBuilder.specs().top).toBeTruthy();
            });
//            it("should have a bottom", function () {
//                expect(boxBuilder.specs().bottom).toBeTruthy();
//            });
        });
    });
});
