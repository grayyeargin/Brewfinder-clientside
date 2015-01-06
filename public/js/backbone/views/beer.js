var BeerListView = Backbone.View.extend({
	className: 'beerlist',
	template: _.template($('#beer-list-item-template').html()),
	initialize: function(){
		this.listenTo(this.collection, 'sync', this.render)
	},

	render: function() {
		this.$el.empty();
		var renderedHTML = this.template({collection: this.collection})
		this.$el.html(renderedHTML);
		if (this.collection.length === 0 && $('input').val() != "") {
			this.$el.html("Sorry No results!");
		} else {
			this.$el.html(renderedHTML);
		}
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


var BeerEditView = Backbone.View.extend({
	className: "beer-form",
	template: _.template($("#beer-edit-template").html()),
	events: {
		"click #edit-btn" : "editBeer"
	},
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	editBeer: function(){
		console.log(this.$("input[name='image']").val());
		this.model.save({
			name: this.$("input[name='name']").val(),
			style: this.$("input[name='style']").val(),
			image: this.$("input[name='image']").val(),
			abv: parseFloat(this.$("input[name='abv']").val()),
			description: this.$('textarea').val()
		});
		// beerRouter.navigate('beers/' + this.model.id, {trigger: true})
	}
})




















//