import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Polls } from './polls';
import { Questions } from '../questions/questions';
import { Answers } from '../answers/answers';


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
          return Questions.find({ pollId: poll._id });
        },

        children: [
          {
            find(question) {
              return Answers.find({ questionId: question._id });
            },
          },
        ],
      },
    ],
  };
});


Meteor.publishComposite('polls.view', function pollsDetails(pollId) {
  check(pollId, String);

  const { userId } = this;

  if (!userId) {
    return this.ready();
  }

  return {
    find() {
      return Polls.find({
        _id: pollId,
        $or: [
          { isPublic: true },
          { createdBy: this.userId },
        ],
      });
    },

    children: [
      {
        find(poll) {
          return Questions.find({ pollId: poll._id, isOpen: true });
        },

        children: [
          {
            find(question) {
              return Answers.find({ questionId: question._id });
            },
          },
        ],
      },
    ],
  };
});
