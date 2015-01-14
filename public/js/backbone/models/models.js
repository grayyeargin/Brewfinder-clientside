// Create Beer model
var Beer = Backbone.Model.extend({
	urlRoot: 'http://104.236.65.119:3000/api/beers'
});

// Create Brewery model
var Brewery = Backbone.Model.extend({
	urlRoot: 'http://104.236.65.119:3000/api/breweries'
});


var User = Backbone.Model.extend({
	urlRoot: 'http://104.236.65.119:3000/users'
});

var Review = Backbone.Model.extend({
	urlRoot: 'http://104.236.65.119:3000/reviews'
});

var Style = Backbone.Model.extend({
	urlRoot: 'http://104.236.65.119:3000/styles'
})





