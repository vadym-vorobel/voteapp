import { Meteor } from 'meteor/meteor';


Meteor.publish('users.current', function () {
  if (!this.userId) {
    return this.ready();
  }

  return Meteor.users.find({ _id: this.userId }, { fields: { emails: 1, username: 1 } });
});
