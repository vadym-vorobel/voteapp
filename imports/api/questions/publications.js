import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Questions } from './questions';
import { Answers } from '../answers/answers';


Meteor.publishComposite('Questions.voteResults', function voteResults(questionId) {
  check(questionId, String);

  if (!this.userId) {
    return this.ready();
  }

  return {
    find() {
      return Questions.find({ _id: questionId });
    },

    children: [
      {
        find() {
          return Answers.find({ questionId });
        },
      },

      {
        find({ votedBy = [] }) {
          return Meteor.users.find({ _id: { $in: votedBy } });
        },
      },
    ],
  };
});
