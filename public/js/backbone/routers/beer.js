var BeerRouter = Backbone.Router.extend({
	initialize: function(options){
		this.collection = options.collection;
		this.$el = options.$el;
	},

	routes: {
		""																: "homepage",
		"beers" 													: "chart",
		"beers/:id"												: "show",
		"beers/:id/edit"									: "edit",
		"home" 														: "homepage",
		"search/:query/:page"							: "search",
		"style/:query"										: "stylePage"
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
	chart: function(){
		if (this.view) {
			this.view.remove();
			this.$el.empty();
			this.view = null;
		}
		window.scrollTo(0, 0);
		var view = _.template($('#beer-piechart-template').html());
		this.$el.html(view);
		fluxSlider();
	},
	index: function() {
		var view = new BeerListView({collection: this.collection });
		this.setView(view);
	},
	homepage: function(){
		
		if (this.view) {
			this.view.remove();
			this.$el.empty();
			this.view = null;
		}
		window.scrollTo(0, 0);
		var view = _.template($('#home-page-template').html());
		this.$el.html(view);
		loginForm();
		findImageTransitions();
		loginSubmit();
		breweryMap();
		mapBrewerySearch();
		scrollHomePage();
	},
	edit: function(id){
		var beer = new Beer({id: id});
		var that = this;
		beer.fetch({
			success: function(){
				var view = new BeerEditView({model: beer});
				that.setView(view);
			}
		})
	},
	stylePage: function(query){
		$('svg').remove();
		styleInfo = new Style({style: query})
		var that = this;
		styleInfo.fetch({
			data: {
				style: query
			},
			success: function(){
				data_info = styleInfo.attributes.abv_info
				var view = new StyleView({model: styleInfo});
				that.setView(view);
				barChart(data_info)
			}
		})
	},
	show: function(id) {
		var beer = new Beer({id: id});
		var that = this;
		beer.fetch({
			success: function(){
				debugger;
				var view = new BeerProfileView({ model: beer });
				that.setView(view);
				createLike();
				alreadyLiked(beer);
			}
		})
	},
	search: function(query, page){
		var page = parseInt(page) || 0;
		beers = new BeerList();
		var that = this;
		beers.fetch({
			data: {
				query: query,
				page: page
			},
			success: function(collection, data){
				collection.totalBeers = data.total;
				collection.totalPages = data.total_pages;
				collection.currentPage = page;
				collection.query = query;
				collection.url = "#search/"+query;
				collection.current_url = "#search/" + query + "/" + page;
				var view = new BeerListView({ collection: beers});
				that.setView(view);
			}
		})
	}
});
