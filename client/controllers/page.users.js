Session.setDefault('selected_record', null);
Template.usersPage.events ({
  'click .list-group-item': function () {
    Session.set('selected_record', this);
  }
})
Template.usersPage.usersList = function () {
  return Meteor.users.find();
}

Template.usersPage.getDocumentJson = function(){
  return JSON.stringify(Session.get('selected_record'));
}

Template.usersPage.getDocumentTree = function(){
  return parseRecord(Session.get('selected_record'));
}

parseRecord = function(record){
  var result = {};
  result.name = "_id";
  result.children = [];
  var count = 0;
  for (key in record){
    var branch = {};
    branch.name = key;
    branch.value = record[key];
//    if(record.hasOwnProperty('children')){
//      branch.children = [];
//    }
    result.children.push(branch);
    //result[key].name = key;
    //result[key].value = record[key];
  }
  return JSON.stringify(result);
}