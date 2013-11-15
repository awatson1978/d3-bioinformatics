Router.configure({
  layoutTemplate: 'layout'
});
Router.map(function(){
  this.route('homeRoute', {
    path: '/',
    template: 'homePage'
  });
  this.route('usersRoute', {
    path: '/users',
    template: 'usersPage'
  });
});




