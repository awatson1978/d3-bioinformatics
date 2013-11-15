//Accounts.onCreateUser(function(options, user) {
//  // We still want the default hook's 'profile' behavior.
//  console.log('*****************************');
//  console.log(JSON.stringify(user));
//  console.log('-----------------------------');
//  console.log(JSON.stringify(options));
//  console.log('=============================');
//
//  //user.username = options.email.split("@")[0];
//
//
//  if(user.profile === null){
//    user.profile = options.profile;
//  }else{
//    user.profile = {};
//    user.profile.avatar = "/images/icons/Default_User.jpg";
//    user.profile.name = user.emails[0].address.split("@")[0];;
//    user.username = user.emails[0].address.split("@")[0];
//  }
//
//
//  //user.profile.firstName = options.email.split("@")[0];
//  //user.profile.lastName = options.email.split("@")[1];
//
//  user.profile.role = "User";
//  user.profile.bio = "";
//  user.profile.interests = "";
//  user.profile.sweepstakes = {};
//  user.profile.sweepstakes.daily = {};
//  user.profile.sweepstakes.daily.eligible = true;
//  user.profile.sweepstakes.daily.recipient = false;
//  user.profile.sweepstakes.daily.received = null;
//
//  user.profile.sweepstakes.hourly = {};
//  user.profile.sweepstakes.hourly.eligible = true;
//  user.profile.sweepstakes.hourly.recipient = false;
//  user.profile.sweepstakes.hourly.received = null;
//
//
//  // this probably doesnt scale well
//  user.profile.ordinal = Meteor.users.find().count();
//
//  console.log(JSON.stringify(user));
//  console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
//  return user;
//});