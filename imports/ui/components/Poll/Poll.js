import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';

import Spinner from '../Spinner';


class Poll extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    const { poll, loading, questions } = this.props;

    return (
      <Spinner loading={loading}>
        <Row>
          <Col xs={12} md={6} sm={8} mdOffset={3} smOffset={2}>
            <h1 className="md-centered-block">{poll.title}</h1>
          </Col>
        </Row>
      </Spinner>
    );
  }
}


Poll.defaultProps = {
  poll: {},
};


Poll.propTypes = {
  loading: PropTypes.bool.isRequired,
  onUnmount: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  poll: PropTypes.object,
};


export default Poll;
