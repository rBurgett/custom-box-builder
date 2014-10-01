/*jslint nomen: true */

var Errors = {
    _errors : [],
    create : function () {
        'use strict';
        return Object.create(Errors);
    },
    throw : function (message) {
        'use strict';
        this._errors.push({'error' : message});
    },
    clear : function () {
        'use strict';
        this._errors = [];
    },
    list : function () {
        'use strict';
        return this._errors;
    }
};
