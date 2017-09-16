import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-md/lib/Buttons/Button';

import { disabledColor } from './colors';


const getButtonColor = (color, enabled) => (enabled ? color : disabledColor);


const Answer = ({ answer, onAnswerChoose, color, enabled, votedAlready }) => (
  <Button
    raised
    primary
    className="answer-button"
    onClick={onAnswerChoose}
    style={{ backgroundColor: getButtonColor(color, enabled) }}
    disabled={!enabled || votedAlready}
  >
    {`${answer.title} (${answer.votedBy.length})`}
  </Button>
);


Answer.propTypes = {
  answer: PropTypes.object.isRequired,
  onAnswerChoose: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  votedAlready: PropTypes.bool.isRequired,
};


export default Answer;
