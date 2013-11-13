hidePages = function(){
    $('.page').addClass('hidden');
}

showPage = function(page){
    hidePages();
    $(page).removeClass('hidden');
    Session.set('current_page', page);
    parseBreadCrumbs(page);
}
showHomePage = function(){
    showPage("#graphsPage");
}
showCurrentSessionPage = function(){
    showPage(Session.get('current_page'));
}
parseBreadCrumbs = function(page){
    switch(page){
    default:
        $('#breadCrumbLink').html('');
        //alert(page);
    }
}

