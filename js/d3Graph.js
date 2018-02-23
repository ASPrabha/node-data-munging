
var margin = {top: 20, right: 20, bottom: 70, left: 40},
width = 800 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;


var x = d3.scaleBand().range([0, width], .05);

var y = d3.scaleLinear().range([height, 0]);

var xAxis = d3.axisBottom(x);


var yAxis = d3.axisLeft(y);

// Adding properties for the svgs 
var svgPop = d3.select("#popChart")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", 
  "translate(" + margin.left + "," + margin.top + ")");


var svgGdp = d3.select("#gdpChart")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", 
  "translate(" + margin.left + "," + margin.top + ")");


var svgPpp = d3.select("#purchaseChart")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", 
  "translate(" + margin.left + "," + margin.top + ")");

var svgContinent = d3.select("#continentChart")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", 
  "translate(" + margin.left + "," + margin.top + ")");

// Creating Population chart
d3.json("/../data/pop2013.json", function(error, data) {
  data.forEach(function(d) {
    d.Country = d.Country;
    d.Population2013 = +d.Population2013;
  });

  x.domain(data.map(function(d) { return d.Country; }));
  y.domain([0, d3.max(data, function(d) { return d.Population2013; })]).nice();

  svgPop.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", "-.55em")
  .attr("transform", "rotate(-90)" );

  svgPop.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("x", -40)
  .attr("y", -10)
  .attr("dy", "0.32em")
  .attr("fill", "#000")
  .attr("font-weight", "bold")
  .attr("text-anchor", "start")
  .text("Population");


  svgPop.selectAll("bar")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", function(d) { return x(d.Country) + 5; })
  .attr("width", "28px")
  .attr("y", function(d) { return y(d.Population2013); })
  .attr("height", function(d) { return height - y(d.Population2013); })
  .text(function(d){ return d.Country; })
  .style("color", "white");

});

// Creating GDP Chart
d3.json("/../data/gdp2013.json", function(error, data) {
  data.forEach(function(d) {
    d.Country = d.Country;
    d.GDP2013 = +d.GDP2013;
  });
  
  // scale the range of the data
  x.domain(data.map(function(d) { return d.Country; }));
  y.domain([0, d3.max(data, function(d) { return d.GDP2013; })]).nice();

  // add axis
  svgGdp.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", "-.55em")
  .attr("transform", "rotate(-90)" );

  svgGdp.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("x", -40)
  .attr("y", -10)
  .attr("dy", "0.32em")
  .attr("fill", "#000")
  .attr("font-weight", "bold")
  .attr("text-anchor", "start")
  .text("GDP");


  svgGdp.selectAll("bar")
  .data(data)
  .enter().append("rect")
  .attr("class", "bar")
  .attr("x", function(d) { return x(d.Country) + 5; })
  .attr("width", "28px")
  .attr("y", function(d) { return y(d.GDP2013); })
  .attr("height", function(d) { return height - y(d.GDP2013); });

});

// Creating Purchasing power chart
d3.json("/../data/ppp2013.json", function(error, data) {
  data.forEach(function(d) {
    d.Country = d.Country;
    d.PPP2013 = +d.PPP2013;
  });

  x.domain(data.map(function(d) { return d.Country; }));
  y.domain([0, d3.max(data, function(d) { return d.PPP2013; })]).nice();

  svgPpp.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", "-.55em")
  .attr("transform", "rotate(-90)")  ;

  svgPpp.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("x", -40)
  .attr("y", -10)
  .attr("dy", "0.32em")
  .attr("fill", "#000")
  .attr("font-weight", "bold")
  .attr("text-anchor", "start")
  .text("Purchasing Power");


  svgPpp.selectAll("bar")
  .data(data)
  .enter().append("rect")
  .attr("class", "bar")
  .attr("x", function(d) { return x(d.Country) + 5; })
  .attr("width", "28px")
  .attr("y", function(d) { return y(d.PPP2013); })
  .attr("height", function(d) { return height - y(d.PPP2013); });

});


// Creating Continent grapth that contains Population and GDP

var x0 = d3.scaleBand()
.rangeRound([0, width])
.paddingInner(0.1);

var x1 = d3.scaleBand()
.padding(0.05);

var y0 = d3.scaleLinear()
.rangeRound([height, 0]);

var z = d3.scaleOrdinal()
.range(["black", "gray"]);

d3.json("/../data/continent2013.json", function(error, data) {
  data.forEach(function(d) {
    d.Continent = d.Continent;
    d.Population2013 = + d.Population2013;
    d.GDP2013 = + d.GDP2013;
  });

  var keys = ['Population2013', 'GDP2013'];

  x0.domain(data.map(function(d) { return d.Continent; }));
  x1.domain(keys).rangeRound([0, x0.bandwidth()]);
  y0.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key){ return d[key]}); })]).nice();

  svgContinent.append("g")
  .selectAll("g")
  .data(data)
  .enter()
  .append("g")
  .attr("transform", function(d) { return "translate(" + x0(d.Continent) + ",0)"; })
  .selectAll("rect")
  .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
  .enter().append("rect")
  .attr("x", function(d) { return x1(d.key); })
  .attr("y", function(d) { return y0(d.value); })
  .attr("width", x1.bandwidth())
  .attr("height", function(d) { return height - y0(d.value); })
  .attr("fill", function(d) { return z(d.key); });

  svgContinent.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x0));

  svgContinent.append("g")
  .attr("class", "axis")
  .call(d3.axisLeft(y0).ticks(null, "s"))
  .append("text")
  .attr("x", 2)
  .attr("y", y0(y0.ticks().pop()) + 0.5)
  .attr("dy", "0.32em")
  .attr("fill", "#000")
  .attr("font-weight", "bold")
  .attr("text-anchor", "start")
  .text("Population & GDP");

  var legend = svgContinent.append("g")
  .attr("font-family", "sans-serif")
  .attr("font-size", 10)
  .attr("text-anchor", "end")
  .selectAll("g")
  .data(keys.slice().reverse())
  .enter().append("g")
  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
  .attr("x", width - 19)
  .attr("width", 19)
  .attr("height", 19)
  .attr("fill", z);

  legend.append("text")
  .attr("x", width - 24)
  .attr("y", 9.5)
  .attr("dy", "0.32em")
  .text(function(d) { return d; });

});
