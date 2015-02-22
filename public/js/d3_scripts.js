function barChart(data_info, width_arg, height_arg) {
	var data = data_info

	var margin = {top: 20, right: 20, bottom: 50, left: 40},
	width = (width_arg || 300) - margin.left - margin.right,
	height = (height_arg || 200) - margin.top - margin.bottom;

	var x = d3.scale.ordinal()
		.rangeRoundBands([0, width], .1);

	var y = d3.scale.linear()
		.range([height, 0]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.ticks(5, "%");

	var svg = d3.select(".bar-chart").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	x.domain(data.map(function(d) { return d.value; }));
	y.domain([0, d3.max(data, function(d) { return d.percent; })]);

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.selectAll("text")  
		.style("text-anchor", "end")
		.attr("dx", "-.8em")
		.attr("dy", ".15em")
		.attr("transform", function(d) {
		return "rotate(-65)" 
	});

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("% of Total");

	var bars = svg.selectAll(".bar")
		.data(data)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function(d) { return x(d.value); })
		.attr("width", x.rangeBand())
		.attr("y", function(d) { return height; })
		.attr("height", 0)
		.transition().duration(2000).attr("y", function(d) { return y(d.percent); }).attr("height", function(d) { return height - y(d.percent); });


}




function pieChart(data_info){
	var width = 300,
	height = 300,
	r = Math.min(width, height) / 2;

	var data = data_info


	// colors for chart
	var color = d3.scale.category20b();

	var pie = d3.layout.pie()
	.sort(null);


	var arc = d3.svg.arc()
	.innerRadius(50)
	.outerRadius(150);

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
			value: d.style,
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
		.attr('x', 0)
		.attr('y', 0)
		.text(function(d, i) { return data[i].style })
		.append('tspan')
		.attr('dy', 1.2+'em')
		.attr('x', 0)
		.text(function(d, i) { return (data[i].percent * 100).toFixed(2) + '%' })
		
		sliceLabel.on("click", function(d, i) {
			beerRouter.navigate("#style/" + data[i].style, {trigger: true});
		})
	}, 2000)
	
}



function breweryMap(){

	var brewery_map = new Datamap({
	  scope: 'usa',
	  element: document.getElementById('usmap'),
	  fills: {
	    VERYHIGH: '#0d4e66',
	  	HIGH: '#34778c',
	  	MEDIUM: '#6eb3c3',
	  	LOW: '#90d7e4',
	    VERYLOW: '#acf5ff',
	    defaultFill: '#6BB9F0',
	  },
	  geographyConfig: {
	  	highlightBorderColor: '#bada55',
	  	highlightBorderWidth: 2
	  },
	  data: {
	  	CA: {
	            numberOfBreweries: 265,
	            population: 38041430,
	            peoplePer: 143552
	          },
	    TX: {
	            // fillKey: 'VERYLOW',
	            numberOfBreweries: 76,
	            population: 26059203,
	            peoplePer: 342884
	          },
	    NY: {
	            // fillKey: 'LOW',
	            numberOfBreweries: 111,
	            population: 19570261,
	            peoplePer: 176308
	          },
	    FL: {
	            // fillKey: 'VERYLOW',
	            numberOfBreweries: 68,
	            population: 19317568,
	            peoplePer: 284081
	          },
	    IL: {
	            // fillKey: 'VERYLOW',
	            numberOfBreweries: 59,
	            population: 12875255,
	            peoplePer: 218224
	          },
	    PA: {
	            // fillKey: 'MEDIUM',
	            numberOfBreweries: 88,
	            population: 12763536,
	            peoplePer: 145040
	          },
	    OH: {
	            // fillKey: 'LOW',
	            numberOfBreweries: 61,
	            population: 11544225,
	            peoplePer: 189249
	          },
	    GA: {
	            // fillKey: 'VERYLOW',
	            numberOfBreweries: 22,
	            population: 9919945,
	            peoplePer: 450906
	          },
	    MI: {
	            // fillKey: 'MEDIUM',
	            numberOfBreweries: 94,
	            population: 9883360,
	            peoplePer: 105142
	          },
	    NC: {
	            // fillKey: 'MEDIUM',
	            numberOfBreweries: 73,
	            population: 9752073,
	            peoplePer: 133590
	          },
	    NJ: {
	            // fillKey: 'VERYLOW',
	            numberOfBreweries: 22,
	            population: 8864590,
	            peoplePer: 402935
	          },
	    VA: {
	            // fillKey: 'MEDIUM',
	            numberOfBreweries: 64,
	            population: 8185867,
	            peoplePer: 127904
	          },
	    WA: {
	            // fillKey: 'HIGH',
	            numberOfBreweries: 93,
	            population: 6897012,
	            peoplePer: 74161
	          },
	    MA: {
	            // fillKey: 'LOW',
	            numberOfBreweries: 42,
	            population: 6646144,
	            peoplePer: 158241
	          },
	    AZ: {
	            // fillKey: 'VERYLOW',
	            numberOfBreweries: 30,
	            population: 6553255,
	            peoplePer: 218441
	          },
	    IN: {
	            // fillKey: 'MEDIUM',
	            numberOfBreweries: 45,
	            population: 6537334,
	            peoplePer: 145274
	          },
	    TN: {
	            // fillKey: 'VERYLOW',
	            numberOfBreweries: 23,
	            population: 6456243,
	            peoplePer: 280706
	          },
	    MO: {
	            // fillKey: 'LOW',
	            numberOfBreweries: 35,
	            population: 6021988,
	            peoplePer: 172056
	          },
	    MD: {
	            // fillKey: 'VERYLOW',
	            numberOfBreweries: 20,
	            population: 5884563,
	            peoplePer: 294228
	          },
	    WI: {
	            // fillKey: 'MEDIUM',
	            numberOfBreweries: 57,
	            population: 5726398,
	            peoplePer: 100463
	          },
	    MN: {
	            // fillKey: 'MEDIUM',
	            numberOfBreweries: 40,
	            population: 5379139,
	            peoplePer: 134478
	          },
	    CO: {
	            // fillKey: 'VERYHIGH',
	            numberOfBreweries: 152,
	            population: 5187582,
	            peoplePer: 34128
	          },
	    AL: {
	            // fillKey: 'VERYLOW',
	            numberOfBreweries: 13,
	            population: 4822023,
	            peoplePer: 370924
	          },
	    SC: {
	            // fillKey: 'LOW',
	            numberOfBreweries: 24,
	            population: 4723723,
	            peoplePer: 196821
	          },
	    LA: {
	            // fillKey: 'VERYLOW',
	            numberOfBreweries: 9,
	            population: 4601893,
	            peoplePer: 511321
	          },
	    KY: {
	            // fillKey: 'VERYLOW',
	            numberOfBreweries: 7,
	            population: 4380415,
	            peoplePer: 625773
	          },
	    OR: {
	            // fillKey: 'VERYHIGH',
	            numberOfBreweries: 99,
	            population: 3899353,
	            peoplePer: 39387
	          },
	    OK: {
	            // fillKey: 'VERYLOW',
	            numberOfBreweries: 7,
	            population: 3814820,
	            peoplePer: 544974
	          },
	    CT: {
	            // fillKey: 'MEDIUM',
	            numberOfBreweries: 24,
	            population: 3590347,
	            peoplePer: 149597
	          },
	    IA: {
	            // fillKey: 'MEDIUM',
	            numberOfBreweries: 26,
	            population: 3074186,
	            peoplePer: 118237
	          },
	    MS: {
	            // fillKey: 'VERYLOW',
	            numberOfBreweries: 4,
	            population: 2984926,
	            peoplePer: 746231
	          },
	    AR: {
	            // fillKey: 'VERYLOW',
	            numberOfBreweries: 9,
	            population: 2949131,
	            peoplePer: 327681
	          },
	    KS: {
	            // fillKey: 'HIGH',
	            numberOfBreweries: 29,
	            population: 2885905,
	            peoplePer: 99513
	          },
	    UT: {
	            // fillKey: 'VERYLOW',
	            numberOfBreweries: 10,
	            population: 2855287,
	            peoplePer: 285528
	          },
	    NV: {
	            // fillKey: 'LOW',
	            numberOfBreweries: 14,
	            population: 2758931,
	            peoplePer: 197066
	          },
	    NM: {
	            // fillKey: 'HIGH',
	            numberOfBreweries: 29,
	            population: 2085538,
	            peoplePer: 71915
	          },
	    NE: {
	            // fillKey: 'MEDIUM',
	            numberOfBreweries: 15,
	            population: 1855525,
	            peoplePer: 123701
	          },
	    WV: {
	            // fillKey: 'VERYLOW',
	            numberOfBreweries: 9,
	            population: 1855413,
	            peoplePer: 206157
	          },
	    ID: {
	            // fillKey: 'HIGH',
	            numberOfBreweries: 21,
	            population: 1595728,
	            peoplePer: 75987
	          },
	    HI: {
	            // fillKey: 'VERYLOW',
	            numberOfBreweries: 6,
	            population: 1392313,
	            peoplePer: 232052
	          },
	    ME: {
	            // fillKey: 'VERYHIGH',
	            numberOfBreweries: 32,
	            population: 1329192,
	            peoplePer: 41537
	          },
	    NH: {
	            // fillKey: 'VERYHIGH',
	            numberOfBreweries: 23,
	            population: 1320718,
	            peoplePer: 57422
	          },
	    RI: {
	            // fillKey: 'MEDIUM',
	            numberOfBreweries: 10,
	            population: 1050292,
	            peoplePer: 105029
	          },
	    MT: {
	            // fillKey: 'VERYHIGH',
	            numberOfBreweries: 23,
	            population: 1005141,
	            peoplePer: 43701
	          },
	    DE: {
	            // fillKey: 'LOW',
	            numberOfBreweries: 5,
	            population: 917092,
	            peoplePer: 183418
	          },
	    SD: {
	            // fillKey: 'LOW',
	            numberOfBreweries: 5,
	            population: 833354,
	            peoplePer: 166670
	          },
	    AK: {
	            // fillKey: 'VERYHIGH',
	            numberOfBreweries: 16,
	            population: 731449,
	            peoplePer: 45715
	          },
	    ND: {
	            // fillKey: 'MEDIUM',
	            numberOfBreweries: 5,
	            population: 699628,
	            peoplePer: 139925
	          },
	    VT: {
	            // fillKey: 'VERYHIGH',
	            numberOfBreweries: 23,
	            population: 626011,
	            peoplePer: 27217
	          },
	    WY: {
	            // fillKey: 'VERYHIGH',
	            numberOfBreweries: 11,
	            population: 576412,
	            peoplePer: 52401
	          }
	  }

	});

	brewery_map.labels({labelColor: "#fff"});

};