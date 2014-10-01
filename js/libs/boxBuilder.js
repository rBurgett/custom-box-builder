/*jslint nomen: true */

App.BoxBuilder = Ember.Object.extend({
    objectLength : '',
    objectWidth : '',
    objectHeight : '',
    foamCornerWidth : '',
    cardboardWidth : 250,
    foldWidth: 250,
    foamCorners : true,
/*    create : function (d) {
        'use strict';
        return Object.create(BoxBuilder).init(d);
    },*/
    init : function () {
        'use strict';
        this.objectLength = this.objectLength * 1000 || '';
        this.objectWidth = this.objectWidth * 1000 || '';
        this.objectHeight = this.objectHeight * 1000 || 2500;
        this.foamCornerWidth = this.foamCornerWidth * 1000 || 1500;
        this.cardboardWidth = this.cardboardWidth * 1000 || 250;
        return this;
    },
    changeFoamCorners : function () {
        'use strict';
        this.foamCorners ^= false;
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
            return {
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
            }
        }
    }
});

var boxBuilder = App.BoxBuilder.create({
//    objectWidth:24
});
