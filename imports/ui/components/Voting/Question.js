import React from 'react';
import PropTypes from 'prop-types';
import ReactHighcharts from 'react-highcharts';

import { createContainer } from 'meteor/react-meteor-data';

import { Answers } from '../../../api/answers/answers';
import { chooseAnswer } from '../../../api/answers/methods';
import { handleResult } from '../../../utils/client-utils';

import Answer from './Answer';


const answersColors = [
  '#50B432',
  '#ED561B',
  '#058DC7',
  '#DDDF00',
  '#24CBE5',
  '#64E572',
  '#FF9655',
  '#FFF263',
  '#6AF9C4',
];


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
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
      },
    },
  },

  series: [{
    name: 'Answers',
    colorByPoint: true,
    data: answers.map(getChartData),
  }],
});


const Question = ({ question, answers }) => (
  <div className="questions-container">
    <h2 className="md-text-center">{question.title}</h2>

    <div className="chart-area">
      <ReactHighcharts config={getChartConfig(answers)} />
    </div>

    {answers.map((answer, index) => (
      <Answer
        key={answer._id}
        answer={answer}
        onAnswerChoose={onAnswerChoose(answer._id)}
        color={getAnswerColor(index)}
      />
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
