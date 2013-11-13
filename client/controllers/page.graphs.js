Template.graphsPageTemplate.destroyed = function () {
    this.handle && this.handle.stop();
};
Template.graphsPageTemplate.rendered = function () {

    $('.sidebar').css('height', window.innerHeight - 80);

    var resize = Session.get("resize");
    self.node = self.find("svg");

    if (! self.handle) {
        self.handle = Meteor.autorun(function(){
            switch(Session.get("selected_graph")){
                case 'sunburst':
                    $('#breadCrumbLink').html('Sunburst Chart');
                    $('#graphInstructions').html('Mouseover or tap on the sunburst chart to inspect an item.');
                    clearGraphs();
                    renderSunburst();
                    break;
                case 'forceDirectGraph':
                    $('#breadCrumbLink').html('Force Directed Graph Chart');
                    $('#graphInstructions').html('Mouseover or tap a graph node to inspect the node values.  Double click on a connection node to collapse/expand it.');
                    clearGraphs();
                    renderForceDirectCollapsible();
                    break;
                case 'collapsibleTreeChart':
                    $('#breadCrumbLink').html('Collapsible Tree Chart');
                    $('#graphInstructions').html('Mouseover or tap a tree node to inspect the node value.  Double click on the node to collapse/expand the tree.');
                    clearGraphs();
                    renderCollapsibleTreeChart();
                    break;
                default:
                    $('#breadCrumbLink').html('Collapsible Tree Chart');
                    $('#graphInstructions').html('Mouseover or tap a tree node to inspect the node value.  Double click on the node to collapse/expand the tree.');
                    clearGraphs();
                    renderCollapsibleTreeChart();
                    break;
            }
        });
    };
};

Template.inspectionSidebarTemplate.data_title = function(){
    if(Session.get('data_inspection_title')){
        return Session.get('data_inspection_title');
    }else{
        return "Title not available.";
    }
};
Template.inspectionSidebarTemplate.data_size = function(){
    if(Session.get('data_inspection_size')){
        return Session.get('data_inspection_size');
    }else{
        return "this is a size: 1000";
    }
};
Template.inspectionSidebarTemplate.data_color = function(){
    if(Session.get('data_inspection_color')){
        return Session.get('data_inspection_color');
    }else{
        return "#4488aa";
    }
};

function clearGraphs(){
    $('#forceDirectGraph').html('');
    $('#sunburstChart').html('');
    $('#collapsibleTreeChart').html('');
};