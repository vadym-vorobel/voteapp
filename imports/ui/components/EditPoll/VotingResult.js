import R from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';

import { List, ListItem } from 'react-md/lib/Lists';
import { TabsContainer, Tabs, Tab } from 'react-md/lib/Tabs';

import { Meteor } from 'meteor/meteor';

const getUserById = userId => Meteor.users.findOne({ _id: userId });
const getUsername = R.propOr('No name', 'username');
const getUsernameById = R.compose(getUsername, getUserById);

const getUserEmai = R.pathOr('No email', ['emails', 0, 'address']);
const getUserEmailById = R.compose(getUserEmai, getUserById);

const getVotedBy = (votedBy) => {
  if (votedBy.length === 0) {
    return <ListItem primaryText="No one vote for this answer" />;
  }

  return votedBy.map((userId, index) => (
    <ListItem
      key={`voted-by-${userId}`}
      primaryText={`#${index + 1} - ${getUsernameById(userId)} (${getUserEmailById(userId)})`}
    />
  ));
};


const VotingResult = ({ answers }) => {
  if (answers.length === 0) {
    return <h3>No answers yet</h3>;
  }

  return (
    <TabsContainer panelClassName="md-grid" colored>
      <Tabs tabId="simple-tab">
        {answers.map(({ _id, title, votedBy = [] }) => (

          <Tab key={`result-for-answer-${_id}`} label={title}>
            <List ordered>
              {getVotedBy(votedBy)}
            </List>
          </Tab>
        ))}
      </Tabs>
    </TabsContainer>
  );
};


VotingResult.propTypes = {
  answers: PropTypes.array.isRequired,
};


export default VotingResult;
