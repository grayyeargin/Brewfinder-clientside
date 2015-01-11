var StyleView = Backbone.View.extend({
	className: "beer-style-page",
	template: _.template($("#beer-style-template").html()),
	initialize: function(){
		this.render();
	},
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
    return this;
	}
})