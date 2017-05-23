import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import { Row } from 'react-flexbox-grid';

import { Polls } from '../../../api/polls/polls';

import PollItem from '../PollItem';
import Spinner from '../Spinner';


const MyPolls = ({ loading, polls }) => (
  <Spinner loading={loading}>
    <Row>
      {polls.map(poll => (
        <PollItem
          key={poll._id}
          poll={poll}
        />
      ))}
    </Row>
  </Spinner>
);


MyPolls.propTypes = {
  loading: PropTypes.bool.isRequired,
  polls: PropTypes.array.isRequired,
};


export default createContainer(() => {
  const subsHandler = Meteor.subscribe('polls.currentUser');

  return {
    loading: !subsHandler.ready(),
    polls: Polls.find().fetch(),
  };
}, MyPolls);
