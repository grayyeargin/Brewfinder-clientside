var BeerList = Backbone.Collection.extend({
	model: Beer,
	url: 'http://localhost:5000/api/beers',
	parse: function(response){
    return response.beers;
	}
});


var BreweryList = Backbone.Collection.extend({
	model: Brewery,
	url: 'http://localhost:5000/api/breweries'
});


var UserList = Backbone.Collection.extend({
	model: User,
	url: 'http://localhost:5000/users'
});
