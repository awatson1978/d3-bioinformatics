Meteor.publish('userProfile', function (userId) {
  try{
    return Meteor.users.find({_id: this.userId}, {fields: {
      '_id': true,
      'username': true,
      'profile': true,
      'profile.name': true,
      'profile.avatar': true,
      'profile.username': true,
      'profile.ordinal': true,

      'profile.sweepstakes' : true,
      'profile.sweepstakes.daily' : true,
      'profile.sweepstakes.daily.eligible' : true,
      'profile.sweepstakes.daily.recipient' : true,
      'profile.sweepstakes.daily.received' : true,

      'profile.sweepstakes.hourly' : true,
      'profile.sweepstakes.hourly.eligible' : true,
      'profile.sweepstakes.hourly.recipient' : true,
      'profile.sweepstakes.hourly.received' : true,

      'emails': true,
      'emails[0].address': true,
      'emails.address': true
    }});

  }catch(error){
    console.log(error);
  }
});

// Publish users directory and user profile
Meteor.publish("usersDirectory", function () {
  try{
    return Meteor.users.find({}, {fields: {
      '_id': true,
      'username': true,
      'profile': true,
      'createdAt': true,
      'profile.name': true,
      'profile.avatar': true,
      'profile.username': true,
      'profile.ordinal': true,

      'profile.sweepstakes' : true,
      'profile.sweepstakes.daily' : true,
      'profile.sweepstakes.daily.eligible' : true,
      'profile.sweepstakes.daily.recipient' : true,
      'profile.sweepstakes.daily.received' : true,

      'profile.sweepstakes.hourly' : true,
      'profile.sweepstakes.hourly.eligible' : true,
      'profile.sweepstakes.hourly.recipient' : true,
      'profile.sweepstakes.hourly.received' : true,

      'emails': true,
      'emails[0].address': true,
      'emails.address': true
    }});
  }catch(error){
    console.log(error);
  }
});