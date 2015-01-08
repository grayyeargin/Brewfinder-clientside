// Create Beer model
var Beer = Backbone.Model.extend({
	urlRoot: 'http://localhost:5000/api/beers'
});

// Create Brewery model
var Brewery = Backbone.Model.extend({
	urlRoot: 'http://localhost:5000/api/breweries'
});


var User = Backbone.Model.extend({
	urlRoot: 'http://localhost:5000/users'
});

var Review = Backbone.Model.extend({
	urlRoot: 'http://localhost:5000/reviews'
});





