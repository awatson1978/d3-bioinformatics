Template.app_container.rendered = function () {
    jQuery(window).bind('touchmove', function(e){
        e.preventDefault();
    });
};