var margin = { top: 10, right: 30, bottom: 40, left: 50 },
    width = 520 - margin.left - margin.right,
    height = 520 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Add the grey background that makes ggplot2 famous
svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", height)
    .attr("width", height)
    .style("fill", "EBEBEB");
var columns = [
    "Sepal_Length",
    "Sepal_Width",
    "Petal_Length",
    "Petal_Width",
    "Species",
];
var category = ["0", "1", "2"];
var colorMap = ["#F8766D", "#00BA38", "#619CFF"];
//Read the data
d3.csv("Clusterdata.csv", function (data) {
    var x = d3.scaleLinear().domain([-0.5, 0.9]).range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(
            d3
                .axisBottom(x)
                .tickSize(-height * 1.3)
                .ticks(10)
        )
        .select(".domain")
        .remove();

    // Add Y axis
    //Max: 0.629959464
    //Min: -0.414941382
    var y = d3.scaleLinear().domain([-0.5, 0.9]).range([height, 0]).nice();
    svg.append("g")
        .call(
            d3
                .axisLeft(y)
                .tickSize(-width * 1.3)
                .ticks(7)
        )
        .select(".domain")
        .remove();

    // Customization
    svg.selectAll(".tick line").attr("stroke", "white");

    // Add X axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width / 2 + margin.left)
        .attr("y", height + margin.top + 20)
        .text("Sepal Length");

    // Y axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -margin.top - height / 2 + 20)
        .text("Petal Length");

    // Color scale: give me a specie name, I return a color
    var color = d3
        .scaleOrdinal()
        .domain(["0", "1", "2"])
        .range(["#F8766D", "#00BA38", "#619CFF"]);

    // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.

    var tooltip = d3
        .select("#my_dataviz")
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px");
    //.html("The exact value of<br>the Ground Living area is: ");
    //.text("I'm a circle!");

    // Add dots
    svg.append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return x(d["X-Coordinate"]);
        })
        .attr("cy", function (d) {
            return y(d["Y-Coordinate"]);
        })
        .attr("r", 1)
        .style("fill", function (d) {
            return color(d.Cluster);
        })
        .on("mouseover", function () {
            return tooltip.style("visibility", "visible");
        })
        .on("mousemove", function (d) {
            console.log(d);
            return tooltip
                .style("top", event.pageY - 50 + "px")
                .style("left", event.pageX - 80 + "px")
                .html("category: " + d["Top terms in cluster"]);
        })
        .on("mouseout", function () {
            return tooltip.style("visibility", "hidden");
        });
});
