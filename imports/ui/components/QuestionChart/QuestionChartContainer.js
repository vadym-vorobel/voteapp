import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Answers } from '../../../api/answers/answers';

import QuestionChart from './QuestionChart';


export default createContainer(({ questionId }) => {
  const subsHandler = Meteor.subscribe('Questions.voteResults', questionId);

  return {
    loading: !subsHandler.ready(),
    onComponentUnmount: subsHandler.stop,
    answers: Answers.find({ questionId }).fetch(),
  };
}, QuestionChart);
