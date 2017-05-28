import { Meteor } from 'meteor/meteor';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Polls } from './polls';
import { PollsSchema } from './PollsSchema';
import { Questions } from '../questions/questions';


export const createPoll = new ValidatedMethod({
  name: 'Polls.create',
  validate: new SimpleSchema({
    poll: { type: PollsSchema },
  }).validator(),

  run({ poll }) {
    const { userId } = this;

    if (!userId) {
      throw new Meteor.Error('You can\'t add a new poll');
    }

    const defaultPoll = {
      createdBy: userId,
      createdAt: new Date(),
      title: '',
      isPublic: false,
    };

    const pollToAdd = { ...defaultPoll, ...poll };

    return Polls.insert(pollToAdd);
  },
});


export const updatePoll = new ValidatedMethod({
  name: 'Polls.update',
  validate: new SimpleSchema({
    _id: { type: String },
    partToUpdate: { type: PollsSchema.pick(['title', 'isPublic']) },
  }).validator(),

  run({ _id, partToUpdate }) {
    const poll = Polls.findOne({ _id, createdBy: this.userId });

    if (!poll) {
      throw new Meteor.Error('You can\'t edit this poll');
    }

    return Polls.update({ _id }, { $set: partToUpdate });
  },
});

export const removePoll = new ValidatedMethod({
  name: 'Polls.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),

  run({ _id }) {
    const poll = Polls.findOne({ _id, createdBy: this.userId });

    if (!poll) {
      throw new Meteor.Error('You can\'t remove this poll');
    }

    Questions.find({ pollId: _id }).forEach((question) => {
      Meteor.call('Questions.remove', { _id: question._id });
    });

    return Polls.remove({ _id });
  },
});
