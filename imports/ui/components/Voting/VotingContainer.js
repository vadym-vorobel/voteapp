import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Polls } from '../../../api/polls/polls';
import { Questions } from '../../../api/questions/questions';

import Voting from './Voting';


export default createContainer(({ pollId }) => {
  const subsHandler = Meteor.subscribe('polls.details', pollId);

  const poll = Polls.findOne({ _id: pollId });
  const questions = Questions.find({ pollId }).fetch();

  return {
    poll,
    questions,
    loading: !subsHandler.ready(),
    onUnmount: subsHandler.stop,
  };
}, Voting);
