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



});