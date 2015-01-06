var UserProfileView = Backbone.View.extend({
	tagName: 'div',
	className: 'user-profile',
	template: _.template($('#user-profile-template').html()),
	initialize: function(){
		this.render();
	},
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
})