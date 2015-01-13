var BreweryRouter = Backbone.Router.extend({
	initialize: function(options){
		this.collection = options.collection;
		this.$el = options.$el;
	},

	routes: {
		"breweries"									: "map",
		"breweries/search/:query"		: "search",
		"breweries/:id"							: "show"
	},
	setView: function(view){
		if (this.view) {
			this.view.remove();
			this.view = null;
		}
		window.scrollTo(0, 0);
		this.view = view;
		this.$el.html(this.view.render().$el);
	},

	map: function(){

		var view = _.template($('#brewery-map-template').html());
		this.$el.html(view);
		mapBrewerySearch();
		fluxBrewerySlider();
		breweryMap();
	},

	search: function(query){
		var breweries = new BreweryList();
		var that = this;
		breweries.fetch({
			data: {query: query},
			success: function(collection, data){
				collection.query = query
				collection.total_breweries = data.length;
				var view = new BreweryListView({ collection: breweries });
				that.setView(view);
			}
		})
	},
	show: function(id){
		var brewery = new Brewery({id: id});
		var that = this;
		brewery.fetch({
			success: function(){
				console.log(brewery);
				var view = new BreweryProfileView({ model: brewery });
				that.setView(view);
			}
		})
	}
})