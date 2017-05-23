import { Meteor } from 'meteor/meteor';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Polls } from './polls';


export const updatePoll = new ValidatedMethod({
  name: 'Polls.update',
  validate: new SimpleSchema({
    _id: { type: String },
    partToUpdate: { type: Object, blackbox: true },
  }).validator(),

  run({ _id, partToUpdate }) {
    const poll = Polls.findOne({ _id, createdBy: Meteor.userId() });

    if (!poll) {
      throw new Meteor.Error('You can\'t edit this poll');
    }

    return Polls.update({ _id }, { $set: partToUpdate });
  },
});
