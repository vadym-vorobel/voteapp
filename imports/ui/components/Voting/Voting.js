import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-flexbox-grid/lib/components/Row';
import Col from 'react-flexbox-grid/lib/components/Col';

import NoItems from '../NoItems';

import { updatePoll } from '../../../api/polls/methods';
import { handleResult } from '../../../utils/client-utils';

import Spinner from '../Spinner';
import Question from './Question';

import './Voting.less';


class Voting extends React.Component {
  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    const { loading, poll, questions } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (questions.length === 0) {
      return <NoItems noItemsText="No questions to display" />;
    }

    return (
      <Row className="voting-container">
        <Col xs={12} md={6} sm={8} mdOffset={3} smOffset={2}>
          <h1 className="md-text-center">{poll.title}</h1>

          {questions.map(question => <Question key={question._id} question={question} />)}
        </Col>
      </Row>
    );
  }
}


Voting.defaultProps = {
  poll: {},
};


Voting.propTypes = {
  pollId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onUnmount: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,

  poll: PropTypes.object,
};


Voting.contextTypes = {
  router: PropTypes.object.isRequired,
};


export default Voting;
