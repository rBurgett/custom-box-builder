/*jslint nomen: true */

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
            return {
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
        var inToPi, flap, topLength, topWidth, bottomLength, bottomWidth, wholeBottom, wholeBottomWidth, wholeBottomHeight, bottomInnerHeight, bottomInnerWidth, bottomInnerOffset, bottomInnerBox, corners, flapOffset, flapOffsetCalc, bottomWidthCSS, bottomTotalWidthCSS, bottomWidthCSSTop, bottomWidthCSSLeft, bottomTotalWidthCSSTop, bottomTotalWidthCSSLeft, wholeTopWidth, wholeTopHeight, wholeTop, topInnerWidth, topInnerHeight, topInnerOffset, topInnerBox, topWidthCSSTop, topWidthCSSLeft, topWidthCSS, topTotalWidthCSSLeft, topTotalCSSTop, topTotalWidthCSS;
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

            return {
                flap : flap,
                topLength : topLength,
                topWidth : topWidth,
                bottomLength : bottomLength,
                bottomWidth : bottomWidth
            }
        };
        if (dims.type === 'flat') {
            boxCSS.set('skinny', false);
            boxCSS.set('flat', true);
            boxCSS.set('quad', false);
            inToPi = 450000 / (dims.top.flap * 2000 + dims.top.length * 1000);
            inToPi = inToPi.toFixed();
            flap = (dims.top.flap * 1000 * inToPi) / 1000;
            flap = flap.toFixed();
            console.log(typeof flap);
            bottomLength = (dims.bottom.length * 1000 * inToPi) / 1000;
            bottomLength = bottomLength.toFixed();
            bottomWidth = (dims.bottom.width *1000 * inToPi) / 1000;
            bottomWidth = bottomWidth.toFixed();
            topLength = (dims.top.length * 1000 * inToPi) / 1000;
            topLength = topLength.toFixed();
            topWidth = (dims.top.width *1000 * inToPi) / 1000;
            topWidth = topWidth.toFixed();
            wholeBottom = 'width:' + bottomLength + ';height:' + bottomWidth + ';';
            boxCSS.set('flap', flap);
            boxCSS.set('topLength', topLength);
            boxCSS.set('topWidth', topWidth);
            boxCSS.set('bottomLength', bottomLength);
            boxCSS.set('bottomWidth', bottomWidth);
            boxCSS.set('wholeBottom', wholeBottom);
            boxCSS.set('wholeTop', wholeTop);
        };
        if (dims.type === 'quad') {
            boxCSS.set('skinny', false);
            boxCSS.set('flat', false);
            boxCSS.set('quad', true);
        };
    }
});
var boxCSS = App.BoxCSS.create();
var boxBuilder = App.BoxBuilder.create();
