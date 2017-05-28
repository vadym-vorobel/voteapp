import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';
import TextField from 'react-md/lib/TextFields/TextField';
import { Checkbox, Switch } from 'react-md/lib/SelectionControls';

import { createContainer } from 'meteor/react-meteor-data';

import { Answers } from '../../../api/answers/answers';

import EditAnswersList from './EditAnswersList';
import RemoveIcon from '../RemoveIcon';


const EditQuestionItem = ({ question, answers, onQuestionUpdate, onQuestionRemove }) => {
  const { _id, title, isEnabled, showResults, isOpen } = question;

  const isActiveCheckboxId = `is-active-${_id}`;
  const showResultsCheckboxId = `show-results-${_id}`;

  return (
    <div>
      <TextField
        id={`question-${_id}-title`}
        label="Question title"
        placeholder="Question text here"
        value={title}
        onChange={onQuestionUpdate('title')}
        rightIcon={<RemoveIcon onRemove={onQuestionRemove} />}
      />

      <Row>
        <Col xs={6}>
          <Checkbox
            id={isActiveCheckboxId}
            name={isActiveCheckboxId}
            label="Enabled"
            checked={isEnabled}
            checkedIconChildren="check"
            onChange={onQuestionUpdate('isEnabled')}
          />
        </Col>

        <Col xs={6}>
          <Checkbox
            id={showResultsCheckboxId}
            name={showResultsCheckboxId}
            label="Show Results"
            checked={showResults}
            checkedIconChildren="check"
            onChange={onQuestionUpdate('showResults')}
          />
        </Col>
      </Row>

      <EditAnswersList
        questionId={_id}
        answers={answers}
      />

      <Switch
        id={showResultsCheckboxId}
        name={showResultsCheckboxId}
        label="on/off"
        checked={isOpen}
        onChange={onQuestionUpdate('isOpen')}
      />
    </div>
  );
};


EditQuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
  onQuestionUpdate: PropTypes.func.isRequired,
  onQuestionRemove: PropTypes.func.isRequired,

  answers: PropTypes.array,
};


export default createContainer(({ question }) => {
  return {
    answers: Answers.find({ questionId: question._id }).fetch(),
  };
}, EditQuestionItem);
