Session.setDefault('current_page', '#graphsPage');
Session.setDefault("selected_graph","indentedTree");
Session.setDefault("anchor_image", "");

//Template.app_container.loggedIn = function () {
//    if(Meteor.userId()){
//        return true;
//    }else{
//        return false;
//    }
//};
//Template.app_container.rendered = function () {
//    hidePages();
//    showCurrentSessionPage();
//};
//Template.app_container.anchorImage = function () {
//    return Session.get("anchor_image");
//};


Meteor.startup(function () {
    $(window).resize(function(evt) {
        Session.set("resize", new Date());
    });
    hidePages();
    showHomePage();
});


