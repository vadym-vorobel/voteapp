import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';

import { Row } from 'react-flexbox-grid';

import PollItem from '../PollItem';


const mockPolls = [
  {
    _id: '1',
    title: 'First poll',
    createdBy: Meteor.userId(),
    createdAt: new Date(),
    isPublic: false,
  },

  {
    _id: '2',
    title: 'Second poll',
    createdBy: Meteor.userId(),
    createdAt: new Date(),
    isPublic: true,
  },
];


const MyPolls = (props) => (
  <Row>
    {mockPolls.map(poll => (
      <PollItem
        key={poll._id}
        poll={poll}
      />
    ))}
  </Row>
);


MyPolls.propTypes = {};

export default MyPolls;
