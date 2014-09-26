var BoxBuilder = {
    _objectLength : '',
    _objectWidth : '',
    _objectHeight : '',
    objectLength : function() {
        return this._objectLength;
    },
    objectWidth : function() {
        return this._objectWidth;
    },
    objectHeight : function() {
        return this._objectHeight;
    },
    create : function(d) {
        return Object.create(BoxBuilder).init(d);
    },
    init : function(d) {
        this._objectLength = p.objectLength || '';
        this._objectWidth = p.objectWidth || '';
        this._objectHeight = p.objectHeight || '';
        return this;
    },
};
