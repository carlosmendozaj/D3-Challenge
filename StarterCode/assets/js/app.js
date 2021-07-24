// @TODO: YOUR CODE HERE!

// SVG Area 
var svgWidth = 960;
var svgHeight = 600;

// Margins

var margin = { 
    top: 30, 
    right: 50, 
    bottom: 50, 
    left: 30
};
// SVG Area with margins

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// SVG contaINER

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  // Chartgroup

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Import Data (CSV document)

  d3.csv("assets/data/data.csv").then(function(journalismData) {
    journalismData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    data.smokes = +data.smokes;
    data.age = +data.age;
    states = data.abbr; 
    console.log(states);
  });


    // Get scales => sacleLinear
    
    var xLinearScale = d3.scaleLinear()
    .domain([d3.min(journalismData, d => d.poverty),d3.max(journalismData, d => d.poverty)])
    .range([0, width]);

    var yLinearScale = d3.scaleLinear()
    .domain([d3.min(journalismData, d => d.healthcare),d3.max(journalismData, d =>d.healthcare)])
    .range([height, 0]);

    // Axis

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Axis into SVG area 

    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    chartGroup.append("g")
    .call(leftAxis);

    // Append circles and bind data 
    var circlesGroup = chartGroup.selectAll("circle")
    .data(journalismData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "steelblue")
    .attr("stroke", "white")
    .attr("opacity", ".5");

    // Append Axis titles  
    chartGroup.append("text")
      .attr("transform", `translate(${height / 2}, ${height + margin.top + 20})`)
      .classed("dow-text text", true)
      .text("In Poverty (%)");

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 12)
      .attr("x", 0 - (height / 2))
      .text("Lacks Healthcare (%)");

    // Text Group
    var circleLabels = chartGroup.selectAll(null).data(journalismData).enter().append("text");

    circleLabels
      .attr("x", function(d) {
        return xLinearScale(d.poverty);
      })
      .attr("y", function(d) {
        return yLinearScale(d.healthcare);
      })
      .text(function(d) {
        return d.abbr;
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "10px")
      .attr("text-anchor", "middle")
      .attr("fill", "white");

});