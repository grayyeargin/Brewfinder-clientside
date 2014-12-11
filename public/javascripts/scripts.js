var beerList = new BeerList(), router;

beerList.fetch({reset: true}).done(function(){
	router = new Router({
		collection: beerList,
		$el: $('.brew-container')
	});
	Backbone.history.start();
})

// router = new Router({
// 		collection: beerList,
// 		$el: $('.brew-container')
// 	});
// Backbone.history.start();


// function beerParams(){
// 	return {
// 		query: $('#beer-search').val()
// 	}
// }


// $(function(){

// 	$('input').on('change', function(e){
// 		if ($('input').val() == ""){
// 			alert("put some shit in the input!");
// 		} else {
// 			beerList.fetch({
// 				reset: true,
// 				data: beerParams()
// 			});
// 		}
// 	});

// });

