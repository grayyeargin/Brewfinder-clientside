var BeerList = Backbone.Collection.extend({
	model: Beer,
	url: 'http://104.236.65.119:3000/api/beers',
	parse: function(response){
    return response.beers;
	}
});


var BreweryList = Backbone.Collection.extend({
	model: Brewery,
	url: 'http://104.236.65.119:3000/api/breweries'
});


var UserList = Backbone.Collection.extend({
	model: User,
	url: 'http://104.236.65.119:3000/users'
});
