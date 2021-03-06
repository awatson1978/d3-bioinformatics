var options = {
    'datefile':  "datafile/icd10.sample.json",
    'text': 'title',
    'size': 'count'
};

renderCollapsibleTreeChart = function(){
    var m = [60, 120, 60, 120],
        w = window.innerWidth - m[1] - m[3],
        h = window.innerHeight - 240,
        i = 0,
        root;
    var color = d3.scale.category20c();

    var tree = d3.layout.tree()
        .size([h, w]);

    var diagonal = d3.svg.diagonal()
        //.projection(function(d) { return [d.y, (d.x * 1.2)]; });
        .projection(function(d) { return [d.y, d.x]; });

    var vis = d3.select("#collapsibleTreeChart").append("svg:svg")
        .attr("width", w + m[1] + m[3])
        .attr("height", h + m[0] + m[2])
        .append("svg:g")
        .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

    d3.json("datafile/flare.json", function(json) {
        root = json;
        root.x0 = h / 2;
        root.y0 = 0;

        function toggleAll(d) {
            if (d.children) {
                d.children.forEach(toggleAll);
                toggle(d);
            }
        }

        // Initialize the display to show a few nodes.
        //root.children.forEach(toggleAll);
        //toggle(root.children[1]);
        //toggle(root.children[1].children[2]);
        //toggle(root.children[9]);
        //toggle(root.children[9].children[0]);

        update(root);
    });

    function update(source) {
        var duration = d3.event && d3.event.altKey ? 5000 : 500;

        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse();

        // Normalize for fixed-depth.
        nodes.forEach(function(d) { d.y = d.depth * 180; });

        // Update the nodes…
        var node = vis.selectAll("g.node")
            .data(nodes, function(d) { return d.id || (d.id = ++i); });

        // Enter any new nodes at the parent's previous position.
        // these will be collapsed
        var nodeEnter = node.enter().append("svg:g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
            .on("mouseover", function(d) {
                Session.set('data_inspection_title', d.name);
                Session.set('data_inspection_size', d.size);
                Session.set('data_inspection_color', color(d.size));
            })
            .on("click", function(d) { toggle(d); update(d); });

        // collapsed node color
        nodeEnter.append("svg:circle")
            .attr("r", 1e-6)
            .style("fill", function(d) { return color(d.size); });
            //.style("fill", function(d) { return d._children ? "orange" : "lightsteelblue"; });

//        nodeEnter.append("svg:image")
//            //.attr("class", "fizzle")
//            .attr("height", "32px")
//            .attr("width", "32px")
//            .attr("xlink:href", function(d){ return d.image; })
//            .style("fill", "lightsteelblue");

        nodeEnter.append("svg:text")
            .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
            .attr("dy", ".35em")
            .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
            .text(function(d) { return d.title; })
            .style("fill-opacity", 1e-6);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

        // expanded node
        nodeUpdate.select("circle")
            .attr("r", 4.5)
            .style("fill", function(d) { return color(d.size); });
            //.style("fill", function(d) { return d._children ? "orange" : "lightsteelblue"; });
            //.style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

//        nodeUpdate.select("image")
//            //.style("fill-opacity", 1);
//            .attr("y", -16)
//            .attr("x", -16)
//            .attr("height", "32px")
//            .attr("width", "32px")
//            .attr("xlink:href", function(d){ return d.image; })
//            //.attr("xlink:href", "/images/grays.anatomy.thumbnails/abdominalArteries.png")
//            .style("stroke", function(d) { return d._children ? "orange" : "lightsteelblue"; });

        nodeUpdate.select("text")
            .attr("x", 16)
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("image")
            .style("fill-opacity", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        // Update the links…
        var link = vis.selectAll("path.link")
            .data(tree.links(nodes), function(d) { return d.target.id; });

        // Enter any new links at the parent's previous position.
        link.enter().insert("svg:path", "g")
            .attr("class", "link")
            .attr("d", function(d) {
                var o = {x: source.x0, y: source.y0};
                return diagonal({source: o, target: o});
            })
            .transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function(d) {
                var o = {x: source.x, y: source.y};
                return diagonal({source: o, target: o});
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

// Toggle children.
    function toggle(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
    }
};