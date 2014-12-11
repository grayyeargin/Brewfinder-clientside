var BeerListView = Backbone.View.extend({
	tagName: 'ul',
	className: 'beerlist',
	template: _.template($('#beer-list-item-template').html()),
	initialize: function(){
		this.listenTo(this.collection, 'sync', this.render)
	},
	render: function() {
		// var that = this;
		this.$el.empty();
		var renderedHTML = this.template({collection: this.collection})
		this.$el.html(renderedHTML);
		// if (this.collection.length === 0 && $('input').val() != "") {
		// 	this.$el.html("Sorry No results!");
		// } else {
		// 	this.$el.html(renderedHTML);
		// }
		return this;
	}
})



var BeerProfileView = Backbone.View.extend({
	tagName: 'div',
	className: 'beer-profile',
	template: _.template($('#beer-show-template').html()),
	initialize: function(){
    this.render();
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});


var MapView = Backbone.View.extend({
	className: datamap,
	template: _.template($('#brewery-map-template').html()),
	initialize: function(){
		this.render();
	},
	render: function(){
		this.$el.html(this.template);
	}
})