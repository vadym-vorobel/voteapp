import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import { Polls } from '../../api/polls/polls';

import PollsList from './PollsList/PollsList';


export default createContainer(() => {
  const subsHandler = Meteor.subscribe('polls.currentUser');

  return {
    loading: !subsHandler.ready(),
    polls: Polls.find().fetch(),
    onUnmount: subsHandler.stop,
  };
}, PollsList);
