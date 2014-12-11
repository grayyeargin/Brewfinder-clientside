var Router = Backbone.Router.extend({
	initialize: function(options){
		this.collection = options.collection;
		this.$el = options.$el;
	},

	routes: {
		""					: "index",
		"beers" 		: "index",
		"beers/:id"	: "show"
		"breweries" : "brewmap"
	},

	setView: function(view){
		if (this.view) {
			this.view.remove();
			this.view = null;
		}
		this.view = view;
		this.$el.html(this.view.render().$el);
	},

	index: function() {
		var view = new BeerListView({collection: this.collection });
		this.setView(view);
	},
	show: function(id) {
		var beer = this.collection.find(function(beer){
			return beer.get('id') === parseInt(id);
		})
		var view = new BeerProfileView({ model: beer });
		this.setView(view);
	},
	brewmap: function(){
		var view = new MapView();
		this.setView(view);
	}


});