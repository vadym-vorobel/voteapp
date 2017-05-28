import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Polls } from '../../../api/polls/polls';

import EditPoll from './EditPoll';


export default createContainer(({ pollId }) => {
  const subsHandler = Meteor.subscribe('polls.details', pollId);

  return {
    loading: !subsHandler.ready(),
    onUnmount: subsHandler.stop,
    poll: Polls.findOne({ _id: pollId }),
  };
}, EditPoll);
