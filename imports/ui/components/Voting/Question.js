import React from 'react';
import PropTypes from 'prop-types';

import { createContainer } from 'meteor/react-meteor-data';

import { Answers } from '../../../api/answers/answers';
import { chooseAnswer } from '../../../api/answers/methods';
import { handleResult } from '../../../utils/client-utils';

import Answer from './Answer';


const onAnswerChoose = answerId => () => {
  chooseAnswer.call({ _id: answerId }, handleResult);
};


const Question = ({ question, answers }) => (
  <div className="questions-container">
    <h2 className="md-text-center">{question.title}</h2>

    {answers.map(answer => (
      <Answer key={answer._id} answer={answer} onAnswerChoose={onAnswerChoose(answer._id)} />
    ))}
  </div>
);


Question.propTypes = {
  question: PropTypes.object.isRequired,
  answers: PropTypes.array.isRequired,
};


export default createContainer(({ question }) => ({
  answers: Answers.find({ questionId: question._id }).fetch(),
}), Question);
