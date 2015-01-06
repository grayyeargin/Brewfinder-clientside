var BeerList = Backbone.Collection.extend({
	model: Beer,
	url: 'http://104.131.196.188/api/beers',
	parse: function(response){
    return response.beers;
	}
});


var BreweryList = Backbone.Collection.extend({
	model: Brewery,
	url: 'http://104.131.196.188/api/breweries'
});


var UserList = Backbone.Collection.extend({
	model: User,
	url: 'http://localhost:5000/users'
});
