import React from 'react';
import PropTypes from 'prop-types';

import QuestionChartContainer from '../components/QuestionChart/QuestionChartContainer';


const QuestionChart = ({ params: { questionId } }) => (
  <QuestionChartContainer questionId={questionId} />
);


QuestionChart.propTypes = {
  params: PropTypes.object.isRequired,
};

export default QuestionChart;
