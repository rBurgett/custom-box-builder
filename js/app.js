App = Ember.Application.create();

//Begin Errors class
App.Errors = Ember.Object.extend({
    list : [],
    throw : function (message) {
        this.list.pushObject({error: message});
    }
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
            var errorsCheck;
            if (!this.length) {
                errors.throw("You must enter a length");
                errorsCheck = true;
            };
            if (!this.width) {
                errors.throw("You must enter a width");
                errorsCheck = true;
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
            if (this.errorsCheck) {
                errorsCheck = false;
                return;
            };
            alert('No errors!');
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
