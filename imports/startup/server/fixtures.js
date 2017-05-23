import { Meteor } from 'meteor/meteor';

import { Polls } from '../../api/polls/polls';


const mockPolls = [
  {
    title: 'First poll',
    createdBy: 'tZneR8iKHSKrynhPr',
    createdAt: new Date(),
    isPublic: false,
  },

  {
    title: 'Second poll',
    createdBy: 'tZneR8iKHSKrynhPr',
    createdAt: new Date(),
    isPublic: true,
  },
];

const createDefaultPolls = () => {
  if (Polls.find().count() === 0) {
    mockPolls.forEach(poll => Polls.insert(poll));
  }
};


Meteor.startup(createDefaultPolls);
