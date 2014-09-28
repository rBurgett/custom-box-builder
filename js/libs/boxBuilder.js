var BoxBuilder = {
    _objectLength : '',
    _objectWidth : '',
    _objectHeight : '',
    _foamCornerWidth : 1500,
    _cardboardWidth : 250,
    _foldWidth: 250,
    _foamCorners : true,
    objectLength : function() {
        return this._objectLength / 1000;
    },
    objectWidth : function() {
        return this._objectWidth / 1000;
    },
    objectHeight : function() {
        return this._objectHeight / 1000;
    },
    foamCornerWidth : function() {
        return this._foamCornerWidth / 1000;
    },
    cardboardWidth : function() {
        return this._cardboardWidth / 1000;
    },
    create : function(d) {
        return Object.create(BoxBuilder).init(d);
    },
    init : function(d) {
        this._objectLength = d.objectLength * 1000 || '';
        this._objectWidth = d.objectWidth * 1000 || '';
        this._objectHeight = d.objectHeight * 1000 || 5500;
        if (d.foamCornerWidth) {
            this._foamCornerWidth = d.foamCornerWidth * 1000;
        };
        if (d.cardboardWidth) {
            this._cardboardWidth = d.cardboardWidth * 1000;
        };
        console.log(this.specs());
        return this;
    },
    changeFoamCorners : function () {
        this._foamCorners ^= false;
    },
    boxType : function () {
        var dims = [];
        dims.push({dim : this._objectLength});
        dims.push({dim : this._objectWidth});
        dims.push({dim : this._objectHeight});
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
        var topLength;
        var topWidth;
        var bottomLength;
        var bottomWidth;
        var sideHeight;
        var sideWidth1;
        var sideWidth2;
        var foamCornerWidth;
        if (this._foamCorners) {
            foamCornerWidth = this._foamCornerWidth;
        }
        else {
            foamCornerWidth = 0;
        }
        var flapLength = 5500;
        if (this.boxType() !== 'quad' && this._objectHeight > 5500) {
            flapLength = this._objectHeight;
        }
        if (this.boxType() === 'quad') {
            topLength = this._objectLength + 2 * foamCornerWidth + 2 * this._foldWidth + 3 * this._cardboardWidth;
            topWidth = this._objectWidth + 2 * foamCornerWidth + 2 * this._foldWidth + 3 * this._cardboardWidth;
            sideHeight = this._objectHeight + 2 * foamCornerWidth;
            sideWidth1 = this._objectLength + 2 * foamCornerWidth + this._foldWidth;
            sideWidth2 = this._objectWidth + 2 * foamCornerWidth + this._foldWidth;
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
            topLength = this._objectLength + 2 * foamCornerWidth + 2 * this._foldWidth + 2 * this._cardboardWidth;
            topWidth = this._objectWidth + 2 * foamCornerWidth + 2 * this._foldWidth + 3 * this._cardboardWidth;
            bottomLength = this._objectLength + 2 * foamCornerWidth + 2 * this._foldWidth;
            bottomWidth = this._objectWidth + 2 * foamCornerWidth + 2 * this._foldWidth;
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
};
