var beerList = new BeerList(), beerRouter;
var breweryList = new BreweryList(), breweryRouter;
var currentUser = "hello";

function loginForm(){
	$('#login-btn').click(function() {
		$('#login-form').slideToggle('slow');
	});
}

function loginSubmit(){
	$('.login-btn').on('click', function(){
		var $username = $('#userName').val();
		var $password = $('#password').val();
		$.ajax({
			url: 'http://localhost:5000/sessions',
			method: 'post',
			dataType: 'json',
			data: {username: $username, password: $password},
			success: function(data){
				console.log("it worked");
				console.log(data.current_user);
				currentUser = data.current_user;
				userRouter.navigate("#users/" + data.current_user.id, {trigger: true});
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
		$.ajax({
			url: 'http://localhost:5000/users',
			method: 'post',
			dataType: 'json',
			data: {user: {image_url: $image, first_name: $firstName, last_name: $lastName, username: $username, password: $password}},
			success: function(data){
				console.log("booya");
				console.log(data.user);
			}
		})
	})
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
			url: "http://localhost:5000/likes",
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
			url: "http://localhost:5000/reviews",
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


function beerParams(){
	return {
		query: $('.beer-search').val()
	}
}

function breweryParams(){
	return {
		query: $('.hoverinfo strong').text()
	}
}

function scrollHomePage(){
	$('.navigation_button').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 1000);
    return false;
	});
}


function fetchBeersSearch() {
	$('.search-button').on('click', function(e){
		var query = $('.beer-search').val();
		if (query == ""){
			alert("put some shit in the input!");
		} else {
			beerRouter.navigate("#search/" + query, {trigger: true});
		}
	})
};


function mapBrewerySearch(){
	$('#map').on('click', function(e){
		var state = $('.hoverinfo strong').text();
		breweryRouter.navigate("#breweries/search/" + state, {trigger: true});
	})
}


function paginatePage(){
	$('ul .pagination').on('click', function(e){
		var page = $('li').text();
		beerRouter.navigate(Backbone.history.fragment + "/" + page);
		console.log('hello');
	})
}

function activePagination(page){
	// $('.pagination li').removeClass('active');
	$('li:contains('+parseInt(page)+')').addClass('active');
}


function searchBar(){
	$('body').on('click', ".beer_button", function(){
		var query = $('input').val();
		beerRouter.navigate("#search/" + query + "/1", {trigger: true});
	})
}

function searchBreweries(){
	$('body').on('click', ".brewery_button", function(){
		var query = $('input').val();
		breweryRouter.navigate("#breweries/search/" + query , {trigger: true});
	})
}


function fluxSlider(){
	if (! flux.browser.supportsTransitions) {
		$('#warn').text('Flux Slider requires a browser that supports CSS3 transitions').show();
	}

	window.mf = new flux.slider('#slider', {
		autoplay: true,
		pagination: false,
		delay: 4000,
		transitions: ["blocks2"],
		captions: true,
		height: 200,
		width: 300
	});


	gerg = new flux.slider('#slider2', {
		autoplay: true,
		pagination: false,
		delay: 4000,
		transitions: ["blocks2"],
		captions: true,
		height: 200,
		width: 300
	});

	window.mf = new flux.slider('#slider3', {
		autoplay: true,
		pagination: false,
		delay: 4000,
		transitions: ["blocks2"],
		captions: true,
		height: 200,
		width: 300
	});

	window.mf = new flux.slider('#slider4', {
		autoplay: true,
		pagination: false,
		delay: 4000,
		transitions: ["blocks2"],
		captions: true,
		height: 200,
		width: 300
	});

	window.mf = new flux.slider('#slider5', {
		autoplay: true,
		pagination: false,
		delay: 4000,
		transitions: ["blocks2"],
		captions: true,
		height: 200,
		width: 300
	});

	window.mf = new flux.slider('#slider6', {
		autoplay: true,
		pagination: false,
		delay: 4000,
		transitions: ["blocks2"],
		captions: true,
		height: 200,
		width: 300
	});

}


function fluxBrewerySlider(){
	if (! flux.browser.supportsTransitions) {
		$('#warn').text('Flux Slider requires a browser that supports CSS3 transitions').show();
	}

	window.mf = new flux.slider('#brewslider', {
		autoplay: true,
		pagination: false,
		delay: 4000,
		transitions: ["bars3d"],
		captions: true,
		height: 350,
		width: 800
	});


}


// jQuery Smoove
function findImageTransitions(){
	$('.find-router').smoove({
		offset  : '30%',
    // moveX is overridden to -200px for ".bar" object
    moveX   : '100px',
    moveY   : '100px',
    moveZ		: '200px'
	})
}



// window.addEventListener("click", function(){
// 	window.scrollTo(0, 0);
// })










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

	beerParams();
	breweryParams();
	mapBrewerySearch();
	paginatePage();
	searchBar();
	searchBreweries();

	$('#beer-button').on('click', function(e){
			beerRouter.navigate("#beers", {trigger: true});
	})

	$('#brewery-button').on('click', function(e){
			breweryRouter.navigate("#breweries", {trigger: true});
	})

	// jQuery Smoove
	



});












