import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'react-md/lib/TextFields/TextField';

import RemoveIcon from '../RemoveIcon';


const EditAnswerItem = ({ answer, onAnswerUpdate, onAnswerRemove }) => (
  <TextField
    id={`answer-${answer._id}-title`}
    label="Answer text"
    placeholder="Answer text"
    value={answer.title}
    onChange={onAnswerUpdate('title')}
    rightIcon={<RemoveIcon onRemove={onAnswerRemove} />}
  />
);


EditAnswerItem.propTypes = {
  answer: PropTypes.object.isRequired,
  onAnswerUpdate: PropTypes.func.isRequired,
  onAnswerRemove: PropTypes.func.isRequired,
};

export default EditAnswerItem;
