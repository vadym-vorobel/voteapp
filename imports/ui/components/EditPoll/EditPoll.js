import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-flexbox-grid/lib/components/Row';
import Col from 'react-flexbox-grid/lib/components/Col';

import { updatePoll, removePoll } from '../../../api/polls/methods';
import { handleResult } from '../../../utils/client-utils';

import Spinner from '../Spinner';
import EditPollInfo from './EditPollInfo';
import EditQuestionsList from './EditQuestionsList';
import LinkButton from '../LinkButton';


class EditPoll extends React.Component {
  constructor(props) {
    super(props);

    this.updatePoll = this.updatePoll.bind(this);
    this.onPollRemove = this.onPollRemove.bind(this);
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  onPollRemove() {
    removePoll.call({ _id: this.props.pollId }, handleResult(() => {
      this.context.router.push('my-polls');
    }));
  }

  updatePoll(field) {
    return (value) => {
      const updatedPoll = {
        _id: this.props.pollId,
        partToUpdate: { [field]: value },
      };

      updatePoll.call(updatedPoll, handleResult());
    };
  }

  render() {
    const { loading, poll, pollId, questions } = this.props;

    return (
      <Spinner loading={loading}>
        {poll && (
          <Row>
            <Col xs={12} md={6} sm={8} mdOffset={3} smOffset={2}>
              <EditPollInfo
                poll={poll}
                onPollUpdate={this.updatePoll}
                onPollRemove={this.onPollRemove}
              />

              <EditQuestionsList pollId={pollId} questions={questions} />
            </Col>

            <LinkButton fixed floating primary to={`/poll/${pollId}`}>remove_red_eye</LinkButton>
          </Row>
        )}
      </Spinner>
    );
  }
}


EditPoll.defaultProps = {
  poll: {},
};


EditPoll.propTypes = {
  pollId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onUnmount: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,

  poll: PropTypes.object,
};


EditPoll.contextTypes = {
  router: PropTypes.object.isRequired,
};


export default EditPoll;
