import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-flexbox-grid/lib/components/Row';
import Col from 'react-flexbox-grid/lib/components/Col';

import { updatePoll } from '../../../api/polls/methods';
import { handleResult } from '../../../utils/client-utils';

import Spinner from '../Spinner';


class Voting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loading, poll, pollId, questions } = this.props;

    return (
      <Spinner loading={loading}>
        {poll && (
          <Row>
            <Col xs={12} md={6} sm={8} mdOffset={3} smOffset={2}>

            </Col>
          </Row>
        )}
      </Spinner>
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
