$(window).on("scroll", function(){
	if(window.pageYOffset > 100){
		$(window).off("scroll")

		var width = 960,
		height = 700,
		r = Math.min(width, height) / 2;

		var data = [
		{style: "IPA", count: 7140, frac: (7140/24597) },
		{style: "Hefeweizen", count: 1686, frac: (1686/24597)},
		{style: "Specialty", count: 2162},
		{style: "Red Ale", count: 2194, frac: (2194/24597)},
		{style: "Pale Ale", count: 4157, frac: (4157/24597)},
		{style: "Kölsch", count: 447, frac: (447/24597)},
		{style: "Porter", count: 2234, frac: (2234/24597)},
		{style: "Stout", count: 4384, frac: (4384/24597)},
		{style: "Oktoberfest", count: 616, frac: (616/24597)},
		{style: "Brown Ale", count: 1739, frac: (1739/24597)}
		];


		// colors for chart
		var color = d3.scale.category20b();

		var pie = d3.layout.pie()
		.sort(null);


		var arc = d3.svg.arc()
		.innerRadius(200)
		.outerRadius(250);

		var svg = d3.select(".piechart").append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


		var end_points = data.map(function(d){ return d.count})

		var arcs = svg.selectAll("path")
		.data(pie(end_points))
		.enter()
		.append("path")
		.attr("fill", function(d, i) { return color(i); } )
		.attr("d", arc)
		.each(function(d, i) {
			this._current = {
				data: d.data,
				value: d.value,
				startAngle: 0,
				endAngle: 0
			}
		});

		arcs.append("text")
		.text(function(d, i) { return data[i].style; });




		arcs.transition()
		.duration(2000)
		.attrTween("d", arcTween);


		function arcTween(a) {
			var i = d3.interpolate(this._current, a);
			this._current = i(0);
			return function(t) {
				return arc(i(t));
			};
		}








		var label_group = svg.append("svg:g")
		.attr("class", "lblGroup")
		.attr("transform", "translate(" + 0 + "," + 0 + ")");

		setTimeout(function(){

			var sliceLabel = label_group.selectAll("text")
			.data(pie(end_points));

			sliceLabel.enter().append("svg:text")
			.attr("class", "arcLabel bounceInDown")
			.attr("transform", function(d) { return "translate(" + [arc.centroid(d)[0] + (arc.centroid(d)[0]/5), arc.centroid(d)[1] + (arc.centroid(d)[1]/5)] + ")"; })
			.attr("text-anchor", "middle")
			.attr("rel", "popover")
			.text(function(d, i) { return data[i].style })
			.on("click", function(d, i) {
				beerRouter.navigate("#search/by_style/" + data[i].style + "/1", {trigger: true});
			})
		}, 2000)


		//  Labels for Pie Chart
			$('path').hover(function(e){
				console.log($(this).find('text').text())
			}, function(){
				console.log('you left bye bye')
			});




	}
})

























