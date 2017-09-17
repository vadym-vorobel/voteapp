import React from 'react';
import PropTypes from 'prop-types';
import ReactHighcharts from 'react-highcharts';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { answersColors } from './colors';

import { Answers } from '../../../api/answers/answers';
import { chooseAnswer } from '../../../api/answers/methods';
import { handleResult } from '../../../utils/client-utils';

import Answer from './Answer';


const onAnswerChoose = answerId => () => {
  chooseAnswer.call({ _id: answerId }, handleResult);
};


const getAnswerColor = answerIndex => answersColors[answerIndex % answersColors.length];


const getChartData = ({ title, votedBy }) => ({ y: votedBy.length, name: title });

const getChartConfig = (answers) => ({
  chart: {
    backgroundColor: '#fafafa',
    type: 'pie',
  },

  colors: answersColors,

  title: {
    text: 'Voting results',
  },

  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
  },

  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} % ({y})',
      },
    },
  },

  series: [{
    name: 'Answers',
    colorByPoint: true,
    data: answers.map(getChartData),
  }],
});


// const voteAlready = (answers) =>
//   answers.some(({ votedBy = [] }) => votedBy.indexOf(Meteor.userId()) > -1);


const Question = ({ question, answers }) => (
  <div className="questions-container">
    <h2 className="md-text-center">{question.title}</h2>

    {question.showResults && <ReactHighcharts config={getChartConfig(answers)} />}

    {answers.map((answer, index) => (
      <Answer
        key={answer._id}
        answer={answer}
        onAnswerChoose={onAnswerChoose(answer._id)}
        color={getAnswerColor(index)}
        enabled={question.isEnabled}
        votedAlready={false}
      />
    ))}
  </div>
);

Question.defaultProps = {
  answers: [],
};


Question.propTypes = {
  question: PropTypes.object.isRequired,
  answers: PropTypes.array,
};


export default createContainer(({ question }) => ({
  answers: Answers.find({ questionId: question._id }).fetch(),
}), Question);
