App = Ember.Application.create();

//Begin Errors class
App.Errors = Ember.Object.extend({
    list : [],
    throw : function (message) {
        this.list.pushObject({error: message});
    }
});
var errors = App.Errors.create();
errors.throw('here is an error');
//Ed Errors class

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
    model: function (params) {
        return {
            errors: errors.list
        };
    }
});
App.ConstructController = Ember.Controller.extend({
    queryParams : ['length','width','height','foamCorners','foamCornerWidth'],
    length : null,
    width : null,
    height : null,
    foamCorners : null,
    foamCornerWidth : null
});
