
UsersDirectory =    new Meteor.Collection("usersDirectory");

UsersDirectory.allow({
    insert: function(){
        return true;
    },
    update: function () {
        return true;
    },
    remove: function(){
        return true;
    }
});

Meteor.users.allow({
    insert: function(userId, todo){
        return true;
    },
    update: function (userId, todos, fields, modifier) {
        return true;
    },
    remove: function(userId){
        return true;
    }
});

