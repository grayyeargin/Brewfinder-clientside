var BreweryListView = Backbone.View.extend({
	tagName: 'ul',
	className: 'brewerylist',
	template: _.template($('#brewery-list-template').html()),
	initialize: function(){
		this.listenTo(this.collection, 'sync', this.render)
	},
	render: function() {
		this.$el.empty();
		var renderedHTML = this.template({collection: this.collection})
		this.$el.html(renderedHTML);
		return this;
	}
});


var BreweryProfileView = Backbone.View.extend({
	tagName: 'div',
	className: 'brewery-profile',
	template: _.template($('#brewery-show-template').html()),
	initialize: function(){
    this.render();
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});