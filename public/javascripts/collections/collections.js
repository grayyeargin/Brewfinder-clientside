var BeerList = Backbone.Collection.extend({
	model: Beer,
	url: 'http://localhost:3000/api/beers'
});


var BreweryList = Backbone.Collection.extend({
	model: Brewery,
	url: 'http://localhost:3000/api/breweries'
})