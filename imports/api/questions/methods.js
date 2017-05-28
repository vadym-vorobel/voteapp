import { Meteor } from 'meteor/meteor';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Questions } from './questions';
import { Answers } from '../answers/answers';
import { QuestionsSchema } from './QuestionsSchema';


export const createQuestion = new ValidatedMethod({
  name: 'Questions.create',
  validate: new SimpleSchema({
    question: { type: QuestionsSchema },
  }).validator(),

  run({ question }) {
    const { userId } = this;

    if (!userId) {
      throw new Meteor.Error('You can\'t add a new question');
    }

    const defaultQuestion = {
      createdBy: userId,
      createdAt: new Date(),
      title: '',
      isEnabled: false,
      isOpen: false,
      showResults: false,
    };

    const questionToAdd = { ...defaultQuestion, ...question };

    return Questions.insert(questionToAdd);
  },
});


export const updateQuestion = new ValidatedMethod({
  name: 'Questions.update',
  validate: new SimpleSchema({
    _id: { type: String },
    partToUpdate: { type: QuestionsSchema.pick(['title', 'isEnabled', 'isOpen', 'showResults']) },
  }).validator(),

  run({ _id, partToUpdate }) {
    const question = Questions.findOne({ _id, createdBy: this.userId });

    if (!question) {
      throw new Meteor.Error('You can\'t edit this question');
    }

    return Questions.update({ _id }, { $set: partToUpdate });
  },
});


export const removeQuestion = new ValidatedMethod({
  name: 'Questions.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),

  run({ _id }) {
    const question = Questions.findOne({ _id, createdBy: this.userId });

    if (!question) {
      throw new Meteor.Error('You can\'t remove this question');
    }

    Answers.find({ questionId: _id }).forEach((answer) => {
      Meteor.call('Answers.remove', { _id: answer._id });
    });

    return Questions.remove({ _id });
  },
});
