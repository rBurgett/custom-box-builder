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
            console.log(this.cssCalc(dims));
            return dims;
        }
    },
    cssCalc : function (dims) {
        var inToPi, flap, topLength, topWidth, bottomLength, bottomWidth, wholeBottom, wholeTop;
        if (dims.type === 'skinny') {
            boxCSS.set('skinny', true);
            boxCSS.set('flat', false);
            boxCSS.set('quad', false);
            inToPi = 450000 / (dims.top.flap * 2000 + dims.top.length * 1000);
            inToPi = inToPi.toFixed();
//            console.log(inToPi);
            flap = (dims.top.flap * 1000 * inToPi) / 1000;
            flap = flap.toFixed();
            bottomLength = (dims.bottom.length * 1000 * inToPi) / 1000;
            bottomLength = bottomLength.toFixed();
            bottomWidth = (dims.bottom.width *1000 * inToPi) / 1000;
            bottomWidth = bottomWidth.toFixed();
            topLength = (dims.top.length * 1000 * inToPi) / 1000;
            topLength = topLength.toFixed();
            topWidth = (dims.top.width *1000 * inToPi) / 1000;
            topWidth = topWidth.toFixed();
            console.log(flap);
            wholeBottom = 'width:' + bottomLength + (2 * flap) + 'px;height:' + bottomWidth + (2 * flap) + 'px;';
            wholeTop = 'width:' + topLength + flap * 2 + 'px;height:' + topWidth + flap * 2 + 'px;';
            boxCSS.set('flap', flap);
            boxCSS.set('topLength', topLength);
            boxCSS.set('topWidth', topWidth);
            boxCSS.set('bottomLength', bottomLength);
            boxCSS.set('bottomWidth', bottomWidth);
            boxCSS.set('wholeBottom', wholeBottom);
            boxCSS.set('wholeTop', wholeTop);
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
//            console.log(inToPi);
            flap = (dims.top.flap * 1000 * inToPi) / 1000;
            flap = flap.toFixed();
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
