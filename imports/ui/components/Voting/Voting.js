import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';

import Spinner from '../Spinner';
import NoItems from '../NoItems';


class Voting extends React.Component {
  constructor(props) {
    super(props);

    this.renderQuestionsList = this.renderQuestionsList.bind(this);
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  renderQuestionsList(question) {
    return (
      <div key={question._id}>
        {question.title}
      </div>
    );
  }

  render() {
    const { loading, questions, poll } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (questions.length === 0) {
      return <NoItems noItemsText="No questions at the moment" />;
    }

    return (
      <Row>
        <Col xs={12} md={8} mdOffset={2}>
          <h1 className="md-text-center">{poll.title}</h1>

          {questions.map(this.renderQuestionsList)}
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


export default Voting;
