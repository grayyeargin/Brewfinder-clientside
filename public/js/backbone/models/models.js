// Create Beer model
var Beer = Backbone.Model.extend({
	urlRoot: 'http://104.131.196.188/api/beers'
});

// Create Brewery model
var Brewery = Backbone.Model.extend({
	urlRoot: 'http://104.131.196.188/api/breweries'
});


var User = Backbone.Model.extend({
	urlRoot: 'http://localhost:5000/users'
});





