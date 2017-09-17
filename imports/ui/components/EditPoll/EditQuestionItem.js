import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';
import TextField from 'react-md/lib/TextFields/TextField';
import Button from 'react-md/lib/Buttons/Button';
import { Checkbox, Switch } from 'react-md/lib/SelectionControls';
import { DialogContainer } from 'react-md/lib/Dialogs';
import { Toolbar } from 'react-md/lib/Toolbars';

import { createContainer } from 'meteor/react-meteor-data';

import { Answers } from '../../../api/answers/answers';

import EditAnswersList from './EditAnswersList';
import RemoveIcon from '../RemoveIcon';
import VotingResult from './VotingResult';


class EditQuestionItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
    };

    this.onModalOpen = this.onModalOpen.bind(this);
    this.onModalHide = this.onModalHide.bind(this);
  }

  onModalOpen() {
    this.setState({ dialogOpen: true });
  }

  onModalHide() {
    this.setState({ dialogOpen: false });
  }

  render() {
    const { question, answers = [], onQuestionUpdate, onQuestionRemove } = this.props;

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
          <Col xs={3}>
            <Checkbox
              id={isActiveCheckboxId}
              name={isActiveCheckboxId}
              label="Enabled"
              checked={isEnabled}
              onChange={onQuestionUpdate('isEnabled')}
            />
          </Col>

          <Col xs={3}>
            <Checkbox
              id={showResultsCheckboxId}
              name={showResultsCheckboxId}
              label="Show Results"
              checked={showResults}
              onChange={onQuestionUpdate('showResults')}
            />
          </Col>

          <Col xs={3}>
            <div className="m-t-5 md-block-centered">
              <a href={`/chart/${_id}`} target="__blank">Voting chart</a>
            </div>
          </Col>

          <Col xs={3}>
            <div className="m-t-5 md-block-centered">
              <Button flat primary onClick={this.onModalOpen}>Voting result</Button>
            </div>

            <DialogContainer
              id="simple-full-page-dialog"
              visible={this.state.dialogOpen}
              fullPage
              onHide={this.onModalHide}
              aria-labelledby="simple-full-page-dialog-title"
            >
              <Toolbar
                fixed
                colored
                title="Voting results"
                titleId="simple-full-page-dialog-title"
                nav={<Button icon onClick={this.onModalHide}>close</Button>}
              />
              <section className="md-toolbar-relative">
                <VotingResult answers={answers} />
              </section>
            </DialogContainer>
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
  }
}


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
