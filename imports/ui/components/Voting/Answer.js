import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-md/lib/Buttons/Button';


const Answer = ({ answer, onAnswerChoose }) => (
  <Button
    raised
    primary
    label={`${answer.title} (${answer.votedBy.length})`}
    className="answer-button"
    onClick={onAnswerChoose}
  />
);


Answer.propTypes = {
  answer: PropTypes.object.isRequired,
  onAnswerChoose: PropTypes.func.isRequired,
};


export default Answer;
