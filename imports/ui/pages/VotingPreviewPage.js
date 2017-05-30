import React from 'react';
import PropTypes from 'prop-types';

import VotingPreviewContainer from '../components/VotingPreviewContainer';


const VotingPreviewPage = ({ params: { _id } }) => (
  <div>
    <h1 className="md-block-centered">Voting preview</h1>

    <VotingPreviewContainer pollId={_id} />
  </div>
);


VotingPreviewPage.propTypes = {
  params: PropTypes.object.isRequired,
};


export default VotingPreviewPage;
