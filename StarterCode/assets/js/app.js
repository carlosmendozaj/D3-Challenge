// @TODO: YOUR CODE HERE!

// 1.- Chart Params
var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 60, left: 50 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// 2.- SVG wrapper 

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // 3.- Import data 
  // Data available on CVS: id,state,abbr,poverty,povertyMoe,age,ageMoe,income,incomeMoe,
  // healthcare,healthcareLow,healthcareHigh,obesity,obesityLow,obesityHigh,
  // smokes,smokesLow,smokesHigh,-0.385218228

  d3.csv("assets/data/data.csv").then(function(journalismData) {
    journalismData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    data.smokes = +data.smokes;
    data.age = +data.age;
    states = data.abbr; 
    console.log(states);
  });


    // 4.- Scales, both are linear 
    
    var xLinearScale = d3.scaleLinear()
    .domain([d3.min(journalismData, d => d.poverty),d3.max(journalismData, d => d.poverty)])
    .range([0, width]);

    var yLinearScale = d3.scaleLinear()
    .domain([d3.min(journalismData, d => d.healthcare),d3.max(journalismData, d =>d.healthcare)])
    .range([height, 0]);

    // 5.- Axis 

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // 6.- Axis into SVG area 
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    chartGroup.append("g")
    .call(leftAxis);

    // 7.- Append circles and bind data 
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

    // 8.- Append Axis titles  
    chartGroup.append("text")
      .attr("transform", `translate(${height / 2}, ${height + margin.top + 20})`)
      .classed("dow-text text", true)
      .text("In Poverty (%)");

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 12)
      .attr("x", 0 - (height / 2))
      .text("Lacks Healthcare (%)");

    // 9. Add text to circles. Found it on Stackoverflow. 
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