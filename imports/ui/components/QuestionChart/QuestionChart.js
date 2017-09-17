import React from 'react';
import PropTypes from 'prop-types';
import ReactHighcharts from 'react-highcharts';

import { answersColors } from '../Voting/colors';

import './QuestionChart.css';


const getChartData = ({ title, votedBy }) => ({ y: votedBy.length, name: title });

const getChartConfig = (answers) => ({
  chart: {
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    type: 'pie',
    height: 200,
    width: 200,
  },

  colors: answersColors,

  title: {
    text: '',
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
        format: '<b>{point.name}</b> - {y}',
      },
    },
  },

  series: [{
    name: 'Answers',
    colorByPoint: true,
    data: answers.map(getChartData),
  }],
});


class QuestionChart extends React.Component {
  componentWillUnmount() {
    this.props.onComponentUnmount();
  }

  render() {
    return (
      <ReactHighcharts config={getChartConfig(this.props.answers)} />
    );
  }
}


QuestionChart.propTypes = {
  questionId: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onComponentUnmount: PropTypes.func.isRequired,
};


export default QuestionChart;
