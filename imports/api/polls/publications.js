import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { Polls } from './polls';


Meteor.publish('polls.currentUser', function pollsCurrentUser() {
  if (!this.userId) {
    return this.ready();
  }

  return Polls.find({ createdBy: this.userId });
});


Meteor.publish('polls.public', function pollsPublic() {
  if (!this.userId) {
    return this.ready();
  }

  return Polls.find({ isPublic: true });
});


Meteor.publishComposite('polls.details', function pollsDetails(pollId) {
  check(pollId, String);

  const { userId } = this;

  if (!userId) {
    return this.ready();
  }

  return {
    find() {
      return Polls.find({ _id: pollId });
    },

    children: [
      {
        find(poll) {
          // publish questions and answers here
        },
      },
    ],
  };
});
