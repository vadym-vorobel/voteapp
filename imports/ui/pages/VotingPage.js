import React from 'react';
import PropTypes from 'prop-types';

import VotingContainer from '../components/Voting/VotingContainer';


const VotingPage = ({ params: { _id } }) => (
  <VotingContainer pollId={_id} />
);


VotingPage.propTypes = {
  params: PropTypes.object.isRequired,
};


export default VotingPage;
