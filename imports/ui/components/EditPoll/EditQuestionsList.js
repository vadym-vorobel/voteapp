import React from 'react';
import PropTypes from 'prop-types';

import Col from 'react-flexbox-grid/lib/components/Col';
import Button from 'react-md/lib/Buttons/Button';

import { createQuestion, updateQuestion, removeQuestion } from '../../../api/questions/methods';
import { handleResult } from '../../../utils/client-utils';

import NoItems from '../NoItems';
import EditQuestionItem from './EditQuestionItem';


class EditQuestionsList extends React.Component {
  constructor(props) {
    super(props);

    this.addQuestion = this.addQuestion.bind(this);
    this.onQuestionUpdate = this.onQuestionUpdate.bind(this);
    this.renderQuestionItems = this.renderQuestionItems.bind(this);
  }

  onQuestionUpdate(questionId) {
    return field => (value) => {
      updateQuestion.call({ _id: questionId, partToUpdate: { [field]: value } }, handleResult());
    };
  }

  onQuestionRemove(questionId) {
    return () => {
      removeQuestion.call({ _id: questionId }, handleResult());
    };
  }

  addQuestion() {
    const { pollId } = this.props;

    createQuestion.call({ question: { pollId } }, handleResult());
  }

  renderQuestionItems(question, index) {
    const { _id } = question;

    return (
      <div key={_id} className="m-t-25">
        <h3 className="m-b-0">Question {index + 1}</h3>

        <EditQuestionItem
          question={question}
          onQuestionUpdate={this.onQuestionUpdate(_id)}
          onQuestionRemove={this.onQuestionRemove(_id)}
        />
      </div>
    );
  }

  render() {
    const { questions } = this.props;

    return (
      <Col xs={12}>
        {questions.length === 0 && <NoItems noItemsText="No questions" />}

        {questions.length > 0 && questions.map(this.renderQuestionItems)}

        <Button
          raised
          primary
          label="Add"
          onClick={this.addQuestion}
        />
      </Col>
    );
  }
}


EditQuestionsList.propTypes = {
  questions: PropTypes.array.isRequired,
  pollId: PropTypes.string.isRequired,
};


export default EditQuestionsList;
