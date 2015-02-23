var UserRouter = Backbone.Router.extend({
	initialize: function(options){
		this.$el = options.$el
	},
	routes: {
		"users/new"		 	: 	"newUser",
		"users/login"		: 	"login",
		"users/:id"			: 	"profile"
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
	newUser: function(){
		var view = _.template($('#user-signup-template').html());
		$('.brew-container').html(view);
		signUpSubmit();
	},
	profile: function(id){
		var user = new User({id: id});
		var that = this;
		user.fetch({
			success: function(){
				data_info = user.attributes.style_info;
				abv_info = user.attributes.abv_info
				console.log(user);
				var view = new UserProfileView({ model: user });
				that.setView(view);
				pieChart(data_info);
				barChart(abv_info, 400, 300);
			}
		})
	}
})