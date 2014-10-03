App = Ember.Application.create();

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
                errors.throw("Only number values are accepted");
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
    queryParams : ['length','width','height','foamCorners','foamCornerWidth']
});
