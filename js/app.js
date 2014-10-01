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
        return {
            errors : errors.list
        };
    },
});
App.ConstructController = Ember.Controller.extend({
    queryParams : ['length','width','height','foamCorners','foamCornerWidth'],
});
