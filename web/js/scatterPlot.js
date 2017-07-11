function plot_values(filename) {
	
	
    filename = "./data/" + filename;
    svg.selectAll("*").remove();
    
    color = ["#d60241","#0c9603"];
    // Load data
    d3.csv(filename, function(error, data) {
        data.forEach(function(d) {
            d.x = +d.x;
            d.y = +d.y;
            d.type = +d.type;
        });

        var xValueR = function(d) { return d.x;};
        var yValueR = function(d) { return d.y;};
        
        xScale.domain([d3.min(data, xValueR), d3.max(data, xValueR)]);
        yScale.domain([d3.min(data, yValueR), d3.max(data, yValueR)]);
        
        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0, "+(h-pad)+")")
          .call(xAxis)
          // .append("text")
          // .attr("x", (w-pad - 50))
          //   // .attr("y", (h-pad))
          //   // .attr("dy", ".5em")
          //   .style("text-anchor", "middle")
          //   .text("Component B")
            ;
 
        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate("+(left_pad-pad)+", 0)")
          .call(yAxis);

        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", left_pad-90)
        .attr("x",h-430)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Component A");

        svg.append("text")
		.attr("align","bottom")
        .attr("y", left_pad+160)
        .attr("x",h+300)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Component B");


        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", 2.5)
            .attr("cx", function(d){
                return xScale(d.x);
            }) 
            .attr("cy", function(d){
                return yScale(d.y);
            }) 
            .style("fill", function(d) {
                return color[d.type-1];
            })
            .attr("stroke", "black");
            //.attr("stroke-width", function(d) {return d/2;});
            
    });
}

