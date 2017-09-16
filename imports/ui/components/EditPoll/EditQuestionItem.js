import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';
import TextField from 'react-md/lib/TextFields/TextField';
import Button from 'react-md/lib/Buttons/Button';
import { Checkbox, Switch } from 'react-md/lib/SelectionControls';

import { createContainer } from 'meteor/react-meteor-data';

import { Answers } from '../../../api/answers/answers';

import EditAnswersList from './EditAnswersList';
import RemoveIcon from '../RemoveIcon';


const EditQuestionItem =
  ({ question, answers, onQuestionUpdate, onQuestionRemove, onQuestionReset }) => {
    const { _id, title, isEnabled, showResults, isOpen } = question;

    const isActiveCheckboxId = `is-active-${_id}`;
    const showResultsCheckboxId = `show-results-${_id}`;
    const isOpenCheckboxId = `is-open-${_id}`;

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
          <Col xs={4}>
            <Checkbox
              id={isActiveCheckboxId}
              name={isActiveCheckboxId}
              label="Enabled"
              checked={isEnabled}
              onChange={onQuestionUpdate('isEnabled')}
            />
          </Col>

          <Col xs={4}>
            <Checkbox
              id={showResultsCheckboxId}
              name={showResultsCheckboxId}
              label="Show Results"
              checked={showResults}
              onChange={onQuestionUpdate('showResults')}
            />
          </Col>

          <Col xs={4}>
            <div className="m-t-5 md-block-centered">
              <Button flat primary onClick={onQuestionReset}>Reset voting</Button>
            </div>
          </Col>
        </Row>

        <EditAnswersList
          questionId={_id}
          answers={answers}
        />

        <Switch
          id={isOpenCheckboxId}
          name={isOpenCheckboxId}
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
  onQuestionReset: PropTypes.func.isRequired,
  answers: PropTypes.array.isRequired,
};


export default createContainer(({ question }) => ({
  answers: Answers.find({ questionId: question._id }).fetch(),
}), EditQuestionItem);
