import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-flexbox-grid/lib/components/Row';


import { updatePoll } from '../../../api/polls/methods';
import { handleResult } from '../../../utils/client-utils';

import Spinner from '../Spinner';
import EditPollInfo from './EditPollInfo';


class EditPoll extends React.Component {
  constructor(props) {
    super(props);

    this.updatePoll = this.updatePoll.bind(this);
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
    const { loading, poll } = this.props;

    return (
      <Spinner loading={loading}>
        {poll && (
          <Row>
            <EditPollInfo poll={poll} onPollUpdate={this.updatePoll} />
          </Row>
        )}
      </Spinner>
    );
  }
}


EditPoll.propTypes = {
  pollId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onUnmount: PropTypes.func.isRequired,

  poll: PropTypes.object,
};


export default EditPoll;
