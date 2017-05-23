import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import { Row } from 'react-flexbox-grid';

import { handleResult } from '../../../utils/client-utils';
import { Polls } from '../../../api/polls/polls';
import { updatePoll } from '../../../api/polls/methods';

import PollItem from '../PollItem';
import Spinner from '../Spinner';


class MyPolls extends React.Component {
  constructor(props) {
    super(props);

    this.onPublicityToggle = this.onPublicityToggle.bind(this);
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  onPublicityToggle(isPublic, pollId) {
    updatePoll.call({ _id: pollId, partToUpdate: { isPublic } }, handleResult());
  }

  render() {
    const { loading, polls } = this.props;

    return (
      <Spinner loading={loading}>
        <Row>
          {polls.map(poll => (
            <PollItem
              key={poll._id}
              poll={poll}
              onPublicityToggle={this.onPublicityToggle}
            />
          ))}
        </Row>
      </Spinner>
    );
  }
}


MyPolls.propTypes = {
  loading: PropTypes.bool.isRequired,
  polls: PropTypes.array.isRequired,
  onUnmount: PropTypes.func.isRequired,
};


export default createContainer(() => {
  const subsHandler = Meteor.subscribe('polls.currentUser');

  return {
    loading: !subsHandler.ready(),
    polls: Polls.find().fetch(),
    onUnmount: subsHandler.stop,
  };
}, MyPolls);
