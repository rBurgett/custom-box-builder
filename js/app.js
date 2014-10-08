App = Ember.Application.create();

App.BoxCSS = Ember.Object.extend({});
App.BoxBuilder = Ember.Object.extend({
    objectLength : '',
    objectWidth : '',
    objectHeight : '',
    foamCornerWidth : '',
    cardboardWidth : 250,
    foldWidth: 250,
    foamCorners : true,
    css : '',
    init : function () {
        'use strict';
        this.objectLength = this.objectLength * 1000 || '';
        this.objectWidth = this.objectWidth * 1000 || '';
        this.objectHeight = this.objectHeight * 1000 || 2500;
        this.foamCornerWidth = this.foamCornerWidth * 1000 || 1500;
        this.cardboardWidth = 250;
        this.foldWidth = 250;
        this.foamCorners = true;
        return this;
    },
    boxType : function () {
        'use strict';
        var dims = [];
        dims.push({dim : this.objectLength});
        dims.push({dim : this.objectWidth});
        dims.push({dim : this.objectHeight});
        dims.sort(function (a, b) {
            return a.dim - b.dim
        });
        if (dims[0].dim <= 9000) {
            if (dims[0].dim * 2 < dims[2].dim && dims[0].dim * 2 < dims[1].dim) {
                return 'flat';
            }
            else {
                return 'skinny';
            }
        }
        else {
            return 'quad'
        }
    },
    specs : function () {
        'use strict';
        var dims;
        var topLength;
        var topWidth;
        var bottomLength;
        var bottomWidth;
        var sideHeight;
        var sideWidth1;
        var sideWidth2;
        var foamCornerWidth;
        if (this.foamCorners) {
            foamCornerWidth = this.foamCornerWidth;
        }
        else {
            foamCornerWidth = 0;
        }
        var flapLength = 5500;
        if (this.boxType() !== 'quad' && this.objectHeight > 2500) {
            flapLength = this.objectHeight + 2 * foamCornerWidth;
        }
        if (this.boxType() === 'quad') {
            topLength = this.objectLength + 2 * foamCornerWidth + 2 * this.foldWidth + 3 * this.cardboardWidth;
            topWidth = this.objectWidth + 2 * foamCornerWidth + 2 * this.foldWidth + 3 * this.cardboardWidth;
            sideHeight = this.objectHeight + 2 * foamCornerWidth;
            sideWidth1 = this.objectLength + 2 * foamCornerWidth + this.foldWidth;
            sideWidth2 = this.objectWidth + 2 * foamCornerWidth + this.foldWidth;
            dims = {
                'type' : this.boxType(),
                'lids' : {
                    'flap' : flapLength / 1000,
                    'length' : topLength / 1000,
                    'width' : topWidth / 1000,
                    'totalLength' : (topLength + 2 * flapLength) / 1000,
                    'totalWidth' : (topWidth + 2 * flapLength) / 1000
                },
                'sides' : {
                    'flap' : flapLength / 1000,
                    'height' : sideHeight / 1000,
                    'width1' : sideWidth1 / 1000,
                    'width2' : sideWidth2 / 1000,
                    'totalLength' : (flapLength + sideWidth1 + sideWidth2) / 1000
                }
            }
            this.cssCalc(dims);
            return dims;
        }
        else {
            topLength = this.objectLength + 2 * foamCornerWidth + 2 * this.foldWidth + 2 * this.cardboardWidth;
            topWidth = this.objectWidth + 2 * foamCornerWidth + 2 * this.foldWidth + 3 * this.cardboardWidth;
            bottomLength = this.objectLength + 2 * foamCornerWidth + 2 * this.foldWidth;
            bottomWidth = this.objectWidth + 2 * foamCornerWidth + 2 * this.foldWidth;
            dims = {
                'type' : this.boxType(),
                'top' : {
                    'flap' : flapLength / 1000,
                    'length' : topLength / 1000,
                    'width' : topWidth / 1000,
                    'totalLength' : (topLength + 2 * flapLength) / 1000,
                    'totalWidth' : (topWidth + 2 * flapLength) / 1000
                },
                'bottom' : {
                    'flap' : flapLength / 1000,
                    'length' : bottomLength / 1000,
                    'width' : bottomWidth / 1000,
                    'totalLength' : bottomLength / 1000 + (2 * flapLength) / 1000,
                    'totalWidth' : bottomWidth / 1000 + (2 * flapLength) / 1000
                }
            };
            this.cssCalc(dims);
            return dims;
        }
    },
    cssCalc : function (dims) {
        var inToPi, flap, topLength, topWidth, bottomLength, bottomWidth, wholeBottom, wholeBottomWidth, wholeBottomHeight, bottomInnerHeight, bottomInnerWidth, bottomInnerOffset, bottomInnerBox, corners, flapOffset, flapOffsetCalc, bottomWidthCSS, bottomTotalWidthCSS, bottomWidthCSSTop, bottomWidthCSSLeft, bottomTotalWidthCSSTop, bottomTotalWidthCSSLeft, wholeTopWidth, wholeTopHeight, wholeTop, topInnerWidth, topInnerHeight, topInnerOffset, topInnerBox, topWidthCSSTop, topWidthCSSLeft, topWidthCSS, topTotalWidthCSSLeft, topTotalCSSTop, topTotalWidthCSS, sideLength, sideWidth, sideTotalLength, sideHeight, sideTotalCSS, sideLengthCSS, sideWidthCSS, sideFlapCSS;
        if (dims.type !== 'quad') {
            if (dims.type === 'skinny') {
                boxCSS.set('skinny', true);
                boxCSS.set('flat', false);
                boxCSS.set('quad', false);
            }
            else {
                boxCSS.set('skinny', false);
                boxCSS.set('flat', true);
                boxCSS.set('quad', false);
            }
            inToPi = 450000 / (dims.top.flap * 2000 + dims.top.length * 1000);
            inToPi = Number(inToPi.toFixed());
            flap = (dims.top.flap * 1000 * inToPi) / 1000;
            flap = Number(flap.toFixed());
            bottomLength = (dims.bottom.length * 1000 * inToPi) / 1000;
            bottomLength = Number(bottomLength.toFixed());
            bottomWidth = (dims.bottom.width *1000 * inToPi) / 1000;
            bottomWidth = Number(bottomWidth.toFixed());
            wholeBottomWidth = bottomLength + flap;
            wholeBottomHeight = 2 * flap + bottomWidth;
            wholeBottom = 'width:' + wholeBottomWidth + 'px;height:' + wholeBottomHeight + 'px;';
            corners = 'width:' + flap + 'px;height:' + flap + 'px;';
            bottomInnerWidth = 2 + wholeBottomWidth - 2 * flap;
            bottomInnerHeight = 2 + wholeBottomHeight - 2 * flap;
            bottomInnerOffset = flap - 2;
            bottomInnerBox = 'left:' + bottomInnerOffset + 'px;top:' + bottomInnerOffset + 'px;width:' + bottomInnerWidth + 'px;height:' + bottomInnerHeight + 'px;';
            flapOffsetCalc = flap + 19;
            flapOffset = 'top:-' + flapOffsetCalc + 'px';
            bottomWidthCSSTop = bottomInnerHeight / 2 - 9;
            bottomWidthCSSLeft = -1 * (flap + bottomInnerHeight / 2 + 11);
            bottomWidthCSS = 'width: ' + bottomInnerHeight + 'px;' + 'top: ' + bottomWidthCSSTop + 'px;left:' + bottomWidthCSSLeft + 'px;';
//            console.log(wholeBottomHeight);
            bottomTotalWidthCSSTop = wholeBottomHeight / 2 - 9;
            bottomTotalWidthCSSLeft = -1 * (flap + wholeBottomHeight / 2 + 11);
            bottomTotalWidthCSS = 'width: ' + wholeBottomHeight + 'px;' + 'top: ' + bottomTotalWidthCSSTop + 'px;left:' + bottomTotalWidthCSSLeft + 'px;';

            topLength = (dims.top.length * 1000 * inToPi) / 1000;
            topLength = Number(topLength.toFixed());
            topWidth = (dims.top.width *1000 * inToPi) / 1000;
            topWidth = Number(topWidth.toFixed());
            wholeTopWidth = topLength + flap;
            wholeTopHeight = 2 * flap + topWidth;
            wholeTop = 'width:' + wholeTopWidth + 'px;height:' + wholeTopHeight + 'px;';
            topInnerWidth = 2 + wholeTopWidth - 2 * flap;
            topInnerHeight = 2 + wholeTopHeight - 2 * flap;
            topInnerOffset = flap - 2;
            topInnerBox = 'left:' + topInnerOffset + 'px;top:' + topInnerOffset + 'px;width:' + topInnerWidth + 'px;height:' + topInnerHeight + 'px;';
//            flapOffsetCalc = flap + 19;
//            flapOffset = 'top:-' + flapOffsetCalc + 'px';
            topWidthCSSTop = topInnerHeight / 2 - 9;
            topWidthCSSLeft = -1 * (flap + topInnerHeight / 2 + 11);
            topWidthCSS = 'width: ' + topInnerHeight + 'px;' + 'top: ' + topWidthCSSTop + 'px;left:' + topWidthCSSLeft + 'px;';
            topTotalWidthCSSTop = wholeTopHeight / 2 - 9;
            topTotalWidthCSSLeft = -1 * (flap + wholeTopHeight / 2 + 11);
            topTotalWidthCSS = 'width: ' + wholeTopHeight + 'px;' + 'top: ' + topTotalWidthCSSTop + 'px;left:' + topTotalWidthCSSLeft + 'px;';

            boxCSS.set('flap', flap);
            boxCSS.set('bottomLength', bottomLength);
            boxCSS.set('bottomWidth', bottomWidth);
            boxCSS.set('wholeBottom', wholeBottom);
            boxCSS.set('wholeTop', wholeTop);
            boxCSS.set('corners', corners);
            boxCSS.set('bottomInnerBox', bottomInnerBox);
            boxCSS.set('flapOffset', flapOffset);
            boxCSS.set('flapNote', dims.bottom.flap);
            boxCSS.set('totalLengthNote', dims.bottom.totalLength);
            boxCSS.set('lengthNote', dims.bottom.length);
            boxCSS.set('totalWidthNote', dims.bottom.totalWidth);
            boxCSS.set('widthNote', dims.bottom.width);
            boxCSS.set('bottomWidthCSS', bottomWidthCSS);
            boxCSS.set('bottomTotalWidthCSS', bottomTotalWidthCSS);

            boxCSS.set('topLength', topLength);
            boxCSS.set('topWidth', topWidth);
            boxCSS.set('wholeTop', wholeTop);
            boxCSS.set('topInnerBox', topInnerBox);
            boxCSS.set('totalTopLengthNote', dims.top.totalLength);
            boxCSS.set('topLengthNote', dims.top.length);
            boxCSS.set('totalTopWidthNote', dims.top.totalWidth);
            boxCSS.set('topWidthNote', dims.top.width);
            boxCSS.set('topWidthCSS', topWidthCSS);
            boxCSS.set('topTotalWidthCSS', topTotalWidthCSS);
        };
        if (dims.type === 'quad') {
            boxCSS.set('skinny', false);
            boxCSS.set('flat', false);
            boxCSS.set('quad', true);
            inToPi = 450000 / (dims.sides.flap * 1000 + dims.sides.width1 * 1000 + dims.sides.width2 * 1000);
            inToPi = Number(inToPi.toFixed());
            flap = (dims.sides.flap * 1000 * inToPi) / 1000;
            flap = Number(flap.toFixed());
            sideLength = (dims.sides.width1 * 1000 * inToPi) / 1000;
            sideLength = Number(sideLength.toFixed());
            sideWidth = (dims.sides.width2 * 1000 * inToPi) / 1000;
            sideWidth = Number(sideWidth.toFixed());
            sideTotalLength = sideLength + sideWidth + flap + 2;
            sideHeight = (dims.sides.height * 1000 * inToPi) / 1000;
            sideHeight = Number(sideHeight.toFixed());
            sideTotalCSS = 'width:' + sideTotalLength + 'px;height:' + sideHeight + 'px;';
            sideLengthCSS = 'width:' + sideLength + 'px;height:' + sideHeight + 'px;';
            sideWidthCSS = 'left:' + sideLength + 'px;width:' + sideWidth + 'px;height:' + sideHeight + 'px;';
            sideFlapCSS = 'width:' + flap + 'px;height:' + sideHeight + 'px;';


            boxCSS.set('sideLength', sideLength);
            boxCSS.set('sideWidth', sideWidth);
            boxCSS.set('sideTotalLength', sideTotalLength);
            boxCSS.set('sideHeight', sideHeight);

            boxCSS.set('sideTotalCSS', sideTotalCSS);
            boxCSS.set('sideLengthCSS', sideLengthCSS);
            boxCSS.set('sideWidthCSS', sideWidthCSS);
            boxCSS.set('sideFlapCSS', sideFlapCSS);
        };
    }
});

var boxCSS = App.BoxCSS.create();
var boxBuilder = App.BoxBuilder.create();

//Begin Errors class
App.Errors = Ember.Object.extend({
    list : [],
    throw : function (message) {
        this.list.pushObject({error: message});
    },
    errorCheck : false
});
var errors = App.Errors.create();
//End Errors class

App.Router.map(function() {
    // put your routes here
    this.route('home', {path: '/'});
    this.route('begin', {path: '/begin'});
    this.route('construct', {path: '/construct'});
});

App.BeginRoute = Ember.Route.extend({
    model: function () {
        return {
            errors: errors.list
        };
    }
});
App.BeginController = Ember.Controller.extend({
    length: null,
    width: null,
    height: null,
    foamCorners: true,
    foamCornerWidth: 1.5,
    actions : {
        constructBox : function() {
            errors.errorsCheck = false;
            if (isNaN(this.length) || isNaN(this.width) || isNaN(this.height) || isNaN(this.foamCornerWidth)) {
                errors.throw("Only numbers are accepted");
                errors.errorsCheck = true;
            };
            if (!this.length) {
                errors.throw("You must enter a length");
                errors.errorsCheck = true;
            };
            if (!this.width) {
                errors.throw("You must enter a width");
                errors.errorsCheck = true;
            };
            if (this.length && !isNaN(this.length) && this.length < 9) {
                    errors.throw("Your length must be at least 9 inches");
                    errors.errorsCheck = true;
            };
            if (this.width && !isNaN(this.width) && this.width < 9) {
                errors.throw("Your width must be at least 9 inches");
                errors.errorsCheck = true;
            };
            if (!this.height) {
                this.height = 2.5;
            };
            if (this.height < 2.5) {
                this.height = 2.5;
            };
            if (!this.foamCornerWidth) {
                this.foamCornerWidth = 1.5;
            };
            if (errors.errorsCheck) {
                return;
            };
            this.transitionToRoute('construct', {
                queryParams: {
                    length: this.length,
                    width: this.width,
                    height: this.height,
                    foamCorners: this.foamCorners,
                    foamCornerWidth: this.foamCornerWidth
                }
            });
//            console.log('No errors!');

//            };
        }
    }
});

App.ConstructRoute = Ember.Route.extend({
    model: function (queryParams) {
        var length = queryParams.length * 1000;
        var width = queryParams.width * 1000;
        var height = queryParams.height * 1000;
        var foamCorners = queryParams.foamCorners;
        var foamCornerWidth = queryParams.foamCornerWidth * 1000;
        boxBuilder.set('objectLength', length);
        boxBuilder.set('objectWidth', width);
        boxBuilder.set('objectHeight', height);
        boxBuilder.set('foamCorners', foamCorners);
        boxBuilder.set('foamCornerWidth', foamCornerWidth);
        boxBuilder.specs();
        boxCSS.set('objectLength', queryParams.length);
        boxCSS.set('objectWidth', queryParams.width);
        boxCSS.set('objectHeight', queryParams.height);
        return boxCSS;
/*        return {
            skinny : boxCSS.skinny,
            flat : boxCSS.flat,
            quad : boxCSS.quad,
            flap : boxCSS.flap,
            wholeBottom: boxCSS.wholeBottom,
            topLength : boxCSS.topLength,
            topWidth : boxCSS.topWidth,
            bottomLength : boxCSS.bottomLength,
            bottomWidth : boxCSS.bottomWidth
        };*/
    },
});
App.ConstructController = Ember.Controller.extend({
    queryParams : ['length','width','height','foamCorners','foamCornerWidth'],
/*    objectLength : boxBuilder.objectLength,
    objectWidth : boxBuilder.objectWidth,
    objectHeight : boxBuilder.objectHeight */
});
