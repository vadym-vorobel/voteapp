import { Meteor } from 'meteor/meteor';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Polls } from './polls';


// allowed to update fields
const PartsToUpdate = new SimpleSchema({
  title: { type: String, optional: true },
  isPublic: { type: Boolean, optional: true },
});


export const updatePoll = new ValidatedMethod({
  name: 'Polls.update',
  validate: new SimpleSchema({
    _id: { type: String },
    partToUpdate: { type: PartsToUpdate },
  }).validator(),

  run({ _id, partToUpdate }) {
    const poll = Polls.findOne({ _id, createdBy: Meteor.userId() });

    if (!poll) {
      throw new Meteor.Error('You can\'t edit this poll');
    }

    return Polls.update({ _id }, { $set: partToUpdate });
  },
});
