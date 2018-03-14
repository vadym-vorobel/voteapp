import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-md/lib/Buttons/Button';

import { createAnswer, updateAnswer, removeAnswer } from '../../../api/answers/methods';
import { handleResult } from '../../../utils/client-utils';

import NoItems from '../NoItems';
import EditAnswerItem from './EditAnswerItem';


class EditAnswersList extends React.Component {
  constructor(props) {
    super(props);

    this.addAnswer = this.addAnswer.bind(this);
    this.onAnswerUpdate = this.onAnswerUpdate.bind(this);
    this.onAnswerRemove = this.onAnswerRemove.bind(this);
    this.renderAnswerItem = this.renderAnswerItem.bind(this);
  }

  onAnswerUpdate(answerId) {
    return field => (value) => {
      updateAnswer.call({ _id: answerId, partToUpdate: { [field]: value } }, handleResult());
    };
  }

  onAnswerRemove(answerId) {
    return () => removeAnswer.call({ _id: answerId }, handleResult());
  }

  addAnswer() {
    const { questionId } = this.props;

    createAnswer.call({ answer: { questionId } }, handleResult());
  }

  renderAnswerItem(answer) {
    return (
      <EditAnswerItem
        key={answer._id}
        answer={answer}
        onAnswerUpdate={this.onAnswerUpdate(answer._id)}
        onAnswerRemove={this.onAnswerRemove(answer._id)}
      />
    );
  }

  render() {
    const { answers } = this.props;
    return (
      <div>
        {answers.length === 0 && <NoItems noItemsText="No answers" />}

        {answers.length > 0 && answers.map(this.renderAnswerItem)}

        <Button primary raised iconChildren="add" onClick={this.addAnswer}>Add answer</Button>
      </div>
    );
  }
}


EditAnswersList.propTypes = {
  questionId: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
};


export default EditAnswersList;
