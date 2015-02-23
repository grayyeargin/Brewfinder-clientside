var beerList = new BeerList(), beerRouter;
var breweryList = new BreweryList(), breweryRouter;
var currentUser = sessionStorage.current_user ? JSON.parse(sessionStorage.current_user):undefined;

function loginForm(){
	$('#login-btn').click(function(){
		$('#sign-up-form').hide();
		$('#login-form').fadeToggle('slow');
	});
}

function signUpForm(){
	$('#signup-homepage-btn').click(function(){
		$('#login-form').hide();
		$('#sign-up-form').fadeToggle('slow');
	});
}

function closeForm(){
	$('.close').click(function(){
		this.parentNode.style.display = "none";
	})
}

function loginSubmit(){
	$('.login-btn').on('click', function(){
		var $username = $('#login-userName').val();
		var $password = $('#login-password').val();
		$.ajax({
			url: 'http://104.236.65.119:3000/sessions',
			method: 'post',
			dataType: 'json',
			data: {username: $username, password: $password},
			success: function(data){
				if (data.current_user) {
					$('#login-success').slideDown('slow').delay(2000).slideUp('slow');
					$('#login-form').hide();
					$('#welcome-info').empty()
						.html('<h2>Welcome ' + data.current_user.first_name + "!</h2></br><a href='#users/" + data.current_user.id + "'>Visit Profile</a>");
				} else {
					$('#login-error').slideDown('slow').delay(2000).slideUp('slow');
				}
				sessionStorage.current_user = JSON.stringify(data.current_user);
				currentUser = data.current_user;
			}
		})
	})
}

function signUpSubmit(){
	$('.signup-btn').on('click', function(){
		var $username = $('#userName').val();
		var $password = $('#password').val();
		var $image = $('#imageUrl').val();
		var $firstName = $('#firstName').val();
		var $lastName = $('#lastName').val();
		var errorBox = $('#login-error');
		$.ajax({
			url: 'http://104.236.65.119:3000/users',
			method: 'post',
			dataType: 'json',
			data: {user: {image_url: $image, first_name: $firstName, last_name: $lastName, username: $username, password: $password}},
			success: function(data){
				if (data.errors){
					errorBox.empty();
							
					data.errors.forEach(function(error){
						errorBox.append("<li>"  + error + "</li>")
					})
						
					errorBox.slideDown('slow').delay(2000).slideUp('slow');
				} else {
					$('#login-success').slideDown('slow').delay(2000).slideUp('slow');
					$('#sign-up-form').hide();
					$('#login-form').fadeToggle('slow');
				}
				console.log("booya");
				console.log(data.errors);
				console.log(data.user);
			}
		})
	})
}

function logOut() {
	$('body').on('click', '.logout', function(){
		sessionStorage.removeItem('current_user');
		currentUser = undefined;
		beerRouter.navigate("", {trigger: true});
	});
}

function alreadyLiked(beer){
	currentUser.likes.forEach(function(like){
		if (like.id == beer.id) {
			$(".like-btn").addClass("btn-success").removeClass("btn-default", "like-btn");
			$(".btn-success").text("Liked!");
		}
	})
}


function createLike(){
	var likeData = document.querySelector('.like-btn');

	$(".like-btn").on("click", function(){
		$.ajax({
			url: "http://104.236.65.119:3000/likes",
			method: "post",
			dataType: "json",
			data: {user_id: likeData.dataset.userid, beer_id: likeData.dataset.beerid},
			success: function(data){
				$(".like-btn").addClass("btn-success").removeClass("btn-default", "like-btn");
				$(".btn-success").text("Liked!");
				currentUser = data.user;
			}
		})
	})
}

function createReview(){
	var reviewData = document.querySelector('.like-btn');

	$(".review-btn").on("click", function(){
		$.ajax({
			url: "http://104.236.65.119:3000/reviews",
			method: "post",
			dataType: "json",
			data: {user_id: likeData.dataset.userid, beer_id: likeData.dataset.beerid},
			success: function(data){
				debugger;
				$(".like-btn").addClass("btn-success").removeClass("btn-default", "like-btn");
				$(".btn-success").text("Liked!");
				currentUser = data.user;
			}
		})
	})
}


function scrollHomePage(){
	$('.navigation_button').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 1000);
    return false;
	});
}


function mapBrewerySearch(){
	$('#usmap').on('click', function(e){
		var state = $('.hoverinfo strong').text();
		breweryRouter.navigate("#breweries/search/" + state, {trigger: true});
	})
}


function paginatePage(){
	$('ul .pagination').on('click', function(e){
		var page = $('li').text();
		beerRouter.navigate(Backbone.history.fragment + "/" + page);
	})
}


function searchBar(){
	$('body').on('click', ".beer_button", function(){
		var query = $('#search-input').val();
		if (query == "") {
			$('#login-error').slideDown('slow').delay(2000).slideUp('slow');
			$('#login-error').empty().html("<strong>Oh snap!</strong> You didnt enter ANYTHING!!!! How can I search for NOTHING?");
		} else {
		beerRouter.navigate("#search/" + query + "/1", {trigger: true});
		}
	})
}

function searchBreweries(){
	$('body').on('click', ".brewery_button", function(){
		var query = $('#search-input').val();
		if (query == "") {
			$('#login-error').slideDown('slow').delay(2000).slideUp('slow');
			$('#login-error').empty().html("<strong>Oh snap!</strong> You didnt enter ANYTHING!!!! How can I search for NOTHING?");
		} else {
			breweryRouter.navigate("#breweries/search/" + query , {trigger: true});
		}
	})
}

function createLeafletMap(lat, long) {
	var map = L.map('map').setView([lat, long], 13);
	L.tileLayer('https://{s}.tiles.mapbox.com/v4/grayyeargin.l9f0hgel/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ3JheXllYXJnaW4iLCJhIjoiR2IxakNJZyJ9.kOAUZRZaO-juIFHNSReEdA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
	}).addTo(map);
	var marker = L.marker([lat, long]).addTo(map);
}


// DOCUMENT READY
$(function(){

	//ROUTERS
	breweryRouter = new BreweryRouter({
			collection: breweryList,
			$el: $('.brew-container')
		});

	beerRouter = new BeerRouter({
			collection: beerList,
			$el: $('.brew-container')
		});

	userRouter = new UserRouter({
		$el: $('.brew-container')
	});

	Backbone.history.start();

	searchBar();
	searchBreweries();
	logOut();

});












