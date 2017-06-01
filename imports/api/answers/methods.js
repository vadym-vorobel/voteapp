import { Meteor } from 'meteor/meteor';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Answers } from './answers';
import { AnswersSchema } from './AnswersSchema';


export const createAnswer = new ValidatedMethod({
  name: 'Answers.create',
  validate: new SimpleSchema({
    answer: { type: AnswersSchema },
  }).validator(),

  run({ answer }) {
    const { userId } = this;

    if (!userId) {
      throw new Meteor.Error('You can\'t add a new answer');
    }

    const defaultAnswer = {
      createdBy: userId,
      createdAt: new Date(),
      title: '',
      votedBy: [],
    };

    const questionToAdd = { ...defaultAnswer, ...answer };

    return Answers.insert(questionToAdd);
  },
});


export const updateAnswer = new ValidatedMethod({
  name: 'Answers.update',
  validate: new SimpleSchema({
    _id: { type: String },
    partToUpdate: { type: AnswersSchema.pick(['title', 'votedBy', 'votedBy.$']) },
  }).validator(),

  run({ _id, partToUpdate }) {
    const answer = Answers.findOne({ _id, createdBy: this.userId });

    if (!answer) {
      throw new Meteor.Error('You can\'t edit this answer');
    }

    return Answers.update({ _id }, { $set: partToUpdate });
  },
});


export const removeAnswer = new ValidatedMethod({
  name: 'Answers.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),

  run({ _id }) {
    const answer = Answers.findOne({ _id, createdBy: this.userId });

    if (!answer) {
      throw new Meteor.Error('You can\'t remove this answer');
    }

    return Answers.remove({ _id });
  },
});


export const chooseAnswer = new ValidatedMethod({
  name: 'Answers.choose',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),

  run({ _id }) {
    const { userId } = this;

    if (!userId) {
      throw new Meteor.Error('You can\'t remove this answer');
    }

    const answer = Answers.findOne({ _id });

    // remove all votes from other answers
    Answers.update({
      _id: { $ne: _id },
      questionId: answer.questionId,
    }, {
      $pull: { votedBy: userId },
    });

    return Answers.update({ _id }, { $addToSet: { votedBy: userId } });
  },
});
