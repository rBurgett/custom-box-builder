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
        return this;
    },
    boxType : function () {
        var dims = [];
        dims.push({dim : this._objectLength});
        dims.push({dim : this._objectWidth});
        dims.push({dim : this._objectHeight});
        dims.sort(function (a, b) {
            return a.dim - b.dim
        });
        if (dims[0].dim < 9000) {
            if (dims[0].dim * 2 < dims[2].dim) {
                if (dims[0].dim * 2 < dims[1].dim) {
                    return 'flat';
                }
                else {
                    return 'skinny';
                }
            }
        }
    },
    specs : function () {
        var topLength;
        var topWidth;
        var bottomLength;
        var bottomWidth;
        var flapLength = 5500;
        if (this.boxType() !== 'quad' && this._objectHeight > 5500) {
            flapLength = this._objectHeight;
        }
        if (this._foamCorners) {
            topLength = this._objectLength + (2 * this._foamCornerWidth) + (2 * this._foldWidth) + (2 * this._cardboardWidth);
            topWidth = this._objectWidth + (2 * this._foamCornerWidth) + (2 * this._foldWidth) + (2 * this._cardboardWidth);
            return {
                'top' : {
                    'flapLength' : flapLength,
                    'length' : topLength,
                    'width' : topWidth,
                    'totalLength' : 2 * this._foldWidth
                }
            }
        }
    }
};
