import { Meteor } from 'meteor/meteor';

import { Polls } from './polls';


Meteor.publish('polls.currentUser', function pollsCurrentUser() {
  if (!this.userId) {
    return this.ready();
  }

  return Polls.find({ createdBy: this.userId });
});
