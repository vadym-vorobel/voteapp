import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';
import TextField from 'react-md/lib/TextFields/TextField';
import Button from 'react-md/lib/Buttons/Button';
import { Checkbox, Switch } from 'react-md/lib/SelectionControls';
import { DialogContainer } from 'react-md/lib/Dialogs';
import { Toolbar } from 'react-md/lib/Toolbars';
import { ExpansionPanel } from 'react-md';

import { createContainer } from 'meteor/react-meteor-data';

import { Answers } from '../../../api/answers/answers';

import EditAnswersList from './EditAnswersList';
import RemoveIcon from '../RemoveIcon';
import VotingResult from './VotingResult';
import QuestionChart from '../QuestionChart/QuestionChartContainer.js';


class EditQuestionItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      chartDialogOpen: false,
    };

    this.onModalOpen = this.onModalOpen.bind(this);
    this.onModalHide = this.onModalHide.bind(this);
    this.onChartModalOpen = this.onChartModalOpen.bind(this);
    this.onChartModalHide = this.onChartModalHide.bind(this);
  }

  onModalOpen() {
    this.setState({ dialogOpen: true });
  }

  onModalHide() {
    this.setState({ dialogOpen: false });
  }

  onChartModalOpen() {
    this.setState({ chartDialogOpen: true });
  }

  onChartModalHide() {
    this.setState({ chartDialogOpen: false });
  }

  render() {
    const { question, answers = [], onQuestionUpdate, onQuestionRemove, isExpanded, columnWidths } = this.props;

    const { _id, title, isEnabled, showResults, isOpen } = question;

    const isActiveCheckboxId = `is-active-${_id}`;
    const showResultsCheckboxId = `show-results-${_id}`;
    const isOpenCheckboxId = `is-open-${_id}`;

    return (
      <ExpansionPanel
        columnWidths={columnWidths}
        label={`${title} (${isOpen ? 'on' : 'off'})`}
        defaultExpanded={isExpanded || !title}
        footer={null}
      >
        <TextField
          id={`question-${_id}-title`}
          label="Question title"
          placeholder="Question text here"
          value={title}
          onChange={onQuestionUpdate('title')}
          rightIcon={<RemoveIcon onRemove={onQuestionRemove} />}
        />

        <Row>
          <Col sm={4}>
            <Switch
              id={isOpenCheckboxId}
              type="switch"
              name={isOpenCheckboxId}
              label="on/off question"
              checked={isOpen}
              onChange={onQuestionUpdate('isOpen')}
            />
          </Col>

          <Col sm={4}>
            <Checkbox
              id={isActiveCheckboxId}
              name={isActiveCheckboxId}
              label="Enabled for voting"
              checked={isEnabled}
              onChange={onQuestionUpdate('isEnabled')}
            />
          </Col>

          <Col sm={4}>
            <Checkbox
              id={showResultsCheckboxId}
              name={showResultsCheckboxId}
              label="Show Results"
              checked={showResults}
              onChange={onQuestionUpdate('showResults')}
            />
          </Col>
        </Row>

        <Row>
         <Col sm={6}>
            <div className="md-block-centered">
              <Button flat primary onClick={this.onChartModalOpen}>Voting chart</Button>
            </div>

            <DialogContainer
              id="simple-chart-full-page-dialog"
              visible={this.state.chartDialogOpen}
              fullPage
              onHide={this.onChartModalHide}
              aria-labelledby="simple-chart-full-page-dialog-title"
            >
              <Toolbar
                fixed
                colored
                title="Voting results"
                titleId="simple-full-page-dialog-title"
                nav={<Button icon onClick={this.onChartModalHide}>close</Button>}
              />
              <section className="md-toolbar-relative">
                <QuestionChart questionId={_id} />
              </section>
            </DialogContainer>
          </Col>

          <Col sm={6}>
            <div className="md-block-centered">
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
      </ExpansionPanel>
    );
  }
}


EditQuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
  onQuestionUpdate: PropTypes.func.isRequired,
  onQuestionRemove: PropTypes.func.isRequired,
  onQuestionReset: PropTypes.func.isRequired,
  answers: PropTypes.array.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};


export default createContainer(({ question }) => ({
  answers: Answers.find({ questionId: question._id }).fetch(),
}), EditQuestionItem);
