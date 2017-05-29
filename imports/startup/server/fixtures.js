import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Polls } from '../../api/polls/polls';


const { superUser } = Meteor.settings;


const getSuperUser = () => Meteor.users.findOne({ 'emails.address': superUser.email });


const createSuperUser = () => {
  if (!getSuperUser()) {
    Accounts.createUser(superUser);
  }
};


const getMockPolls = () => {
  const user = getSuperUser();

  return [
    {
      title: 'First poll',
      createdBy: user._id,
      createdAt: new Date(),
      isPublic: false,
    },

    {
      title: 'Second poll',
      createdBy: user._id,
      createdAt: new Date(),
      isPublic: true,
    },
  ];
};

const createDefaultPolls = () => {
  if (Polls.find().count() === 0) {
    const mockPolls = getMockPolls();

    mockPolls.forEach(poll => Polls.insert(poll));
  }
};


Meteor.startup(() => {
  createSuperUser();
  createDefaultPolls();
});
